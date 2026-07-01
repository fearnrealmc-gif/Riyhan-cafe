'use client';

import React, { useState, useEffect, useMemo, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Flame, Check } from 'lucide-react';
import Navbar from '@/components/storefront/Navbar';
import Button from '@/components/ui/Button';
import { supabase } from '@/lib/supabase/client';
import { formatPrice, cn } from '@/lib/utils';
import type { Product, ProductSize, SelectedAddon } from '@/types';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const sizeLabels: Record<string, string> = {
  Small: 'صغير',
  Medium: 'وسط',
  Large: 'كبير',
};

export default function ProductDetailPage({ params }: ProductPageProps) {
  const router = useRouter();
  const { id } = use(params);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<SelectedAddon[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        setProduct(data as Product);
        setSelectedSize(data.sizes?.[0] || null);
      } else {
        router.replace('/');
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id, router]);

  const unitPrice = useMemo(() => {
    if (!product || !selectedSize) return 0;
    const base = product.base_price + (selectedSize.price_modifier || 0);
    const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    return base + addonsTotal;
  }, [product, selectedSize, selectedAddons]);

  const totalPrice = useMemo(() => {
    return unitPrice;
  }, [unitPrice]);

  const whatsappUrl = useMemo(() => {
    if (!product) return '#';
    
    const messageParts = [
      `*طلب جديد من ريحان كافيه* ☕`,
      `--------------------`,
      `*المنتج:* ${product.name_ar || product.name_en}`,
    ];

    if (selectedSize) {
      const sizeName = sizeLabels[selectedSize.name] || selectedSize.name;
      messageParts.push(`*الحجم:* ${sizeName}`);
    }

    if (selectedAddons.length > 0) {
      const addonsStr = selectedAddons.map((a) => `- ${a.name}`).join('\n');
      messageParts.push(`*الإضافات:*\n${addonsStr}`);
    }

    messageParts.push(`--------------------`);
    messageParts.push(`*السعر الإجمالي:* ${formatPrice(totalPrice, product.currency || 'USD')}`);

    const formattedMessage = messageParts.join('\n');
    return `https://wa.me/963984858449?text=${encodeURIComponent(formattedMessage)}`;
  }, [product, selectedSize, selectedAddons, totalPrice]);

  const toggleAddon = (addon: SelectedAddon) => {
    setSelectedAddons((prev) =>
      prev.find((a) => a.name === addon.name)
        ? prev.filter((a) => a.name !== addon.name)
        : [...prev, addon]
    );
  };

  // Removed handleAddToCart function

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-offwhite">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </>
    );
  }

  if (!product) return null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-offwhite dark:bg-olive-dark text-charcoal dark:text-white" dir="rtl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-warm-gray dark:text-white/60 hover:text-olive dark:hover:text-gold transition-colors mb-8"
          >
            العودة للقائمة الرئيسية
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="relative aspect-square md:aspect-auto md:h-[500px] w-full rounded-3xl overflow-hidden border border-cream shadow-lg bg-cream-light">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name_ar || product.name_en}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-50">
                  <span className="text-8xl">☕</span>
                </div>
              )}
              {product.calories && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl flex items-center gap-1.5 text-xs font-semibold text-orange-600 shadow-sm border border-orange-100">
                  <Flame size={14} className="text-orange-500 animate-pulse" />
                  <span>{product.calories} سعرة حرارية</span>
                </div>
              )}
            </div>

            <div className="flex flex-col h-full">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-olive mb-2">
                  {product.name_ar || product.name_en}
                </h1>
                {product.name_ar && (
                  <p className="text-sm text-warm-gray mb-4 font-light" dir="ltr">
                    {product.name_en}
                  </p>
                )}
                <p className="text-base text-charcoal/80 leading-relaxed">
                  {product.description || 'لا يوجد وصف متاح لهذا المنتج حالياً.'}
                </p>
              </div>

              <hr className="border-cream mb-6" />

              <div className="space-y-6 flex-1">
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-olive mb-3">الحجم</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {product.sizes.map((size) => (
                        <button
                          key={size.name}
                          onClick={() => setSelectedSize(size)}
                          className={cn(
                            'py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer text-center',
                            'border-2',
                            selectedSize?.name === size.name
                              ? 'border-gold bg-gold/10 text-gold-dark dark:text-gold shadow-sm'
                              : 'border-gray-100 bg-white text-charcoal/70 hover:border-gray-200'
                          )}
                        >
                          <span className="block font-semibold">{sizeLabels[size.name] || size.name}</span>
                          {size.price_modifier > 0 && (
                            <span className="block text-[11px] text-gold mt-0.5 font-medium" dir="ltr">
                              +{formatPrice(size.price_modifier, product.currency || 'USD')}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.addons && product.addons.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-olive mb-3">الإضافات</h3>
                    <div className="space-y-2">
                      {product.addons.map((addon) => {
                        const isSelected = selectedAddons.some((a) => a.name === addon.name);
                        return (
                          <button
                            key={addon.name}
                            onClick={() => toggleAddon(addon)}
                            className={cn(
                              'w-full flex items-center justify-between p-3.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer',
                              'border border-gray-100 bg-white hover:border-gray-200',
                              isSelected && 'border-gold/50 bg-gold/5'
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={cn(
                                  'w-5 h-5 rounded-md border flex items-center justify-center transition-all',
                                  isSelected ? 'bg-gold border-gold text-olive-dark' : 'border-gray-300'
                                )}
                              >
                                {isSelected && <Check size={12} strokeWidth={3} />}
                              </div>
                              <span className="text-charcoal">{addon.name}</span>
                            </div>
                            <span className="text-gold font-semibold" dir="ltr">
                              +{formatPrice(addon.price, product.currency || 'USD')}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-cream">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex flex-col">
                    <span className="text-xs text-warm-gray">السعر المحدد</span>
                    <span className="text-3xl font-bold text-gold" dir="ltr">
                      {formatPrice(totalPrice, product.currency || 'USD')}
                    </span>
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-2xl text-base font-bold py-4 bg-[#25D366] text-white hover:bg-[#20ba5a] active:bg-[#1da851] transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg shadow-[#25D366]/10 hover:shadow-[#25D366]/20 mb-3"
                >
                  <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.906-6.99C16.246 1.864 13.758 1.83 11.13 1.83c-5.437 0-9.863 4.421-9.867 9.865-.001 1.77.464 3.5 1.346 5.037L1.618 21.93l5.029-1.32c1.513.825 3.103 1.258 4.707 1.258zm9.361-6.666c-.23-.115-1.36-.672-1.571-.749-.21-.077-.363-.115-.517.115-.154.23-.597.749-.732.904-.134.153-.268.172-.498.057-.23-.115-.97-.358-1.848-1.141-.683-.61-1.145-1.363-1.278-1.593-.134-.23-.014-.354.1-.469.103-.103.23-.268.344-.403.115-.134.153-.23.23-.383.077-.154.038-.287-.019-.403-.057-.115-.517-1.245-.709-1.7-.186-.448-.372-.387-.517-.394-.134-.006-.287-.007-.441-.007-.153 0-.403.057-.613.287-.21.23-.804.786-.804 1.916 0 1.13.822 2.222.937 2.376.115.154 1.618 2.47 3.92 3.467.548.237 1.036.378 1.39.49.55.175 1.05.15 1.446.09.44-.066 1.36-.557 1.552-1.094.191-.537.191-.996.134-1.094-.057-.095-.21-.153-.44-.268z" />
                  </svg>
                  اطلب الآن عبر واتساب
                </a>

                <Link href="/">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full rounded-2xl gap-2 text-base font-bold py-4 cursor-pointer text-olive dark:text-gold dark:border-gold hover:dark:bg-gold/10"
                  >
                    العودة للقائمة الرئيسية
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
