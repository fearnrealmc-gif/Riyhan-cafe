'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Eye,
  EyeOff,
  Search,
  Coffee,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { supabase } from '@/lib/supabase/client';
import { formatPrice, cn } from '@/lib/utils';
import type { Product } from '@/types';

const CATEGORY_OPTIONS = [
  { value: 'hot_coffee', label: 'مشروبات ساخنة' },
  { value: 'cold_coffee', label: 'مشروبات باردة' },
  { value: 'juices', label: 'عصائر' },
  { value: 'ice_cream', label: 'آيس كريم' },
  { value: 'ice_coffee', label: 'آيس كوفي' },
  { value: 'crepe', label: 'كريب' },
  { value: 'waffle', label: 'وافل' },
  { value: 'pancake', label: 'بانكيك' },
  { value: 'hookah', label: 'أركيلة' },
  { value: 'cocktails', label: 'كوكتيلات' },
  { value: 'fruit_salads', label: 'سلطات فواكه' },
];

interface ProductFormData {
  name_en: string;
  description: string;
  category: string;
  base_price: string;
  calories: string;
}

const emptyForm: ProductFormData = {
  name_en: '',
  description: '',
  category: 'hot_coffee',
  base_price: '',
  calories: '',
};

const compressImage = (file: File, maxWidth = 800, maxHeight = 800, quality = 0.75): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Canvas to Blob conversion failed'));
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export default function AdminMenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [mediumPrice, setMediumPrice] = useState('0');
  const [largePrice, setLargePrice] = useState('0');
  const [productCurrency, setProductCurrency] = useState<'USD' | 'SYP'>('USD');
  const [addons, setAddons] = useState<{ name: string; price: number }[]>([]);
  const [newAddonName, setNewAddonName] = useState('');
  const [newAddonPrice, setNewAddonPrice] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('category')
      .order('name_en');

    if (!error && data) {
      setProducts(data as Product[]);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter(
    (p) =>
      p.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.name_ar && p.name_ar.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData(emptyForm);
    setImageFile(null);
    setImagePreview('');
    setMediumPrice('0');
    setLargePrice('0');
    setProductCurrency('USD');
    setAddons([]);
    setNewAddonName('');
    setNewAddonPrice('');
    setModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name_en: product.name_en,
      description: product.description || '',
      category: product.category,
      base_price: product.base_price.toString(),
      calories: product.calories?.toString() || '',
    });
    setImageFile(null);
    setImagePreview(product.image_url || '');
    setProductCurrency((product.currency as 'USD' | 'SYP') || 'USD');

    const mediumSizeObj = product.sizes?.find((s) => s.name === 'Medium');
    const largeSizeObj = product.sizes?.find((s) => s.name === 'Large');
    const base = product.base_price;

    const medPriceVal = base + (mediumSizeObj?.price_modifier || 0);
    const lgPriceVal = base + (largeSizeObj?.price_modifier || 0);

    setMediumPrice(medPriceVal.toString());
    setLargePrice(lgPriceVal.toString());
    setAddons(product.addons || []);
    setNewAddonName('');
    setNewAddonPrice('');
    setModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('حجم الصورة كبير جداً! الحد الأقصى هو 5 ميجابايت.');
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!formData.name_en || !formData.base_price) return;
    setIsSaving(true);

    let imageUrl = editingProduct?.image_url || null;

    if (imageFile) {
      try {

        const compressedBlob = await compressImage(imageFile);
        const fileExt = 'jpg';
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, compressedBlob, {
            contentType: 'image/jpeg',
            cacheControl: '3600',
            upsert: true
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          alert('خطأ في رفع الصورة: يرجى التأكد من إنشاء Bucket باسم product-images وجعله Public في Supabase.');
          setIsSaving(false);
          return;
        }

        const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
        imageUrl = data.publicUrl;
      } catch (err) {
        console.error('Compression/Upload error:', err);
      }
    } else if (imagePreview === '') {
      imageUrl = null;
    }

    const basePriceNum = parseFloat(formData.base_price) || 0;
    const medPriceNum = parseFloat(mediumPrice) || basePriceNum;
    const lgPriceNum = parseFloat(largePrice) || basePriceNum;

    const sizesPayload = [
      { name: 'Small', price_modifier: 0 },
      { name: 'Medium', price_modifier: Math.max(0, medPriceNum - basePriceNum) },
      { name: 'Large', price_modifier: Math.max(0, lgPriceNum - basePriceNum) },
    ];

    const payload = {
      name_en: formData.name_en,
      name_ar: null as string | null,
      description: formData.description || null,
      category: formData.category,
      base_price: basePriceNum,
      calories: formData.calories ? parseInt(formData.calories) : null,
      image_url: imageUrl,
      sizes: sizesPayload,
      addons: addons,
      currency: productCurrency,
      updated_at: new Date().toISOString(),
    };

    let dbError = null;
    if (editingProduct) {
      const { error } = await supabase.from('products').update(payload).eq('id', editingProduct.id);
      dbError = error;
    } else {
      const { error } = await supabase.from('products').insert(payload);
      dbError = error;
    }

    if (dbError) {
      console.error('Error saving product details:', {
        message: dbError.message,
        code: dbError.code,
        details: dbError.details,
        hint: dbError.hint
      });
      alert(`حدث خطأ أثناء حفظ المنتج:\nالرسالة: ${dbError.message}\nالكود: ${dbError.code}\nالتفاصيل: ${dbError.details || 'لا يوجد'}\nالتلميح: ${dbError.hint || 'لا يوجد'}`);
      setIsSaving(false);
      return;
    }

    setIsSaving(false);
    setModalOpen(false);
    fetchProducts();
  };

  const toggleAvailability = async (product: Product) => {
    await supabase
      .from('products')
      .update({ is_available: !product.is_available, updated_at: new Date().toISOString() })
      .eq('id', product.id);
    fetchProducts();
  };

  const handleDelete = async (productId: string) => {
    await supabase.from('products').delete().eq('id', productId);
    setDeleteConfirm(null);
    fetchProducts();
  };

  return (
    <div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-offwhite">إدارة المنيو</h1>
          <p className="text-sm text-offwhite/40 mt-0.5">
            {products.length} منتج في قائمتك
          </p>
        </div>
        <Button variant="primary" size="md" onClick={openAddModal}>
          <Plus size={16} />
          إضافة منتج جديد
        </Button>
      </div>

      
      <div className="relative mb-6">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-offwhite/30"
        />
        <input
          type="text"
          placeholder="بحث في المنيو..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-80 pl-9 pr-4 py-2.5 rounded-xl border border-white/10 bg-olive-light/50 text-offwhite placeholder:text-offwhite/30 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/30 transition-all"
        />
      </div>

      
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 rounded-xl border border-dashed border-white/10">
          <Coffee size={32} className="text-offwhite/20 mx-auto mb-3" />
          <p className="text-offwhite/40 text-sm">لا توجد منتجات</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/5">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-olive-light/30 border-b border-white/5">
                <th className="text-right px-4 py-3 text-offwhite/50 font-medium">المنتج</th>
                <th className="text-right px-4 py-3 text-offwhite/50 font-medium hidden sm:table-cell">الفئة</th>
                <th className="text-right px-4 py-3 text-offwhite/50 font-medium">السعر</th>
                <th className="text-center px-4 py-3 text-offwhite/50 font-medium">الحالة</th>
                <th className="text-left px-4 py-3 text-offwhite/50 font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-offwhite font-medium">{product.name_en}</p>
                      {product.name_ar && (
                        <p className="text-offwhite/30 text-xs mt-0.5" style={{ fontFamily: 'var(--font-arabic)' }}>
                          {product.name_ar}
                        </p>
                      )}
                    </div>
                  </td>

                  
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-offwhite/40 text-xs">
                      {CATEGORY_OPTIONS.find(c => c.value === product.category)?.label || product.category}
                    </span>
                  </td>

                  
                  <td className="px-4 py-3 text-right">
                    <span className="text-gold font-semibold">
                      {formatPrice(product.base_price, product.currency || 'USD')}
                    </span>
                  </td>

                  
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleAvailability(product)}
                      className={cn(
                        'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium transition-all cursor-pointer',
                        product.is_available
                          ? 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25'
                          : 'bg-red-500/15 text-red-400 hover:bg-red-500/25'
                      )}
                    >
                      {product.is_available ? (
                        <>
                          <Eye size={10} /> متوفر
                        </>
                      ) : (
                        <>
                          <EyeOff size={10} /> مخفي
                        </>
                      )}
                    </button>
                  </td>

                  
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-1.5 rounded-lg hover:bg-white/5 text-offwhite/40 hover:text-gold transition-all cursor-pointer"
                        aria-label="Edit product"
                      >
                        <Pencil size={14} />
                      </button>
                      {deleteConfirm === product.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-[10px] font-medium hover:bg-red-500/30 cursor-pointer"
                          >
                            تأكيد
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="p-1 rounded hover:bg-white/5 text-offwhite/30 cursor-pointer"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(product.id)}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-offwhite/40 hover:text-red-400 transition-all cursor-pointer"
                          aria-label="Delete product"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <Input
            label="اسم العنصر *"
            placeholder="مثال: كابتشينو"
            value={formData.name_en}
            onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
          />

          
          <div>
            <label className="block text-sm font-medium text-olive mb-1.5">صورة المنتج (أقصى حجم 5 ميجابايت)</label>
            <div className="flex items-center gap-4">
              {imagePreview ? (
                <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 shrink-0">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview('');
                    }}
                    className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center text-warm-gray text-xs shrink-0">
                  لا توجد صورة
                </div>
              )}
              <label className="flex-1">
                <span className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-charcoal hover:bg-gray-50 text-sm font-medium transition-colors cursor-pointer w-full text-center">
                  اختر صورة
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-olive mb-1.5">
              الوصف
            </label>
            <textarea
              placeholder="وصف مختصر للمنتج..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-charcoal placeholder:text-warm-gray text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-olive mb-1.5">الفئة *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          
          <div>
            <label className="block text-sm font-medium text-olive mb-1.5">عملة السعر</label>
            <div className="flex bg-cream rounded-xl p-1 w-full max-w-xs border border-gray-100">
              <button
                type="button"
                onClick={() => setProductCurrency('USD')}
                className={cn(
                  'flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center',
                  productCurrency === 'USD'
                    ? 'bg-white text-olive shadow-sm'
                    : 'text-warm-gray hover:text-charcoal'
                )}
              >
                دولار ($)
              </button>
              <button
                type="button"
                onClick={() => setProductCurrency('SYP')}
                className={cn(
                  'flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center',
                  productCurrency === 'SYP'
                    ? 'bg-white text-olive shadow-sm'
                    : 'text-warm-gray hover:text-charcoal'
                )}
              >
                سوري (ل.س)
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl space-y-3 border border-gray-100">
            <h4 className="text-xs font-bold text-olive uppercase tracking-wider">أسعار الأحجام</h4>
            <div className="grid grid-cols-3 gap-2">
              <Input
                label="صغير *"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.base_price}
                onChange={(e) => setFormData({ ...formData, base_price: e.target.value })}
              />
              <Input
                label="وسط"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={mediumPrice}
                onChange={(e) => setMediumPrice(e.target.value)}
              />
              <Input
                label="كبير"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={largePrice}
                onChange={(e) => setLargePrice(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Input
              label="السعرات الحرارية (اختياري)"
              type="number"
              min="0"
              placeholder="120"
              value={formData.calories}
              onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
            />
          </div>

          
          <div className="bg-gray-50 p-4 rounded-xl space-y-3 border border-gray-100">
            <h4 className="text-xs font-bold text-olive uppercase tracking-wider">إدارة الإضافات</h4>
            
            
            {addons.length > 0 ? (
              <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                {addons.map((addon, index) => (
                  <div key={index} className="flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-gray-100 text-xs">
                    <span className="text-charcoal font-medium">{addon.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gold font-bold" dir="ltr">+{formatPrice(addon.price)}</span>
                      <button
                        type="button"
                        onClick={() => setAddons(prev => prev.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-700 p-0.5 cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-warm-gray text-center py-1">لا توجد إضافات مضافة لهذا المنتج.</p>
            )}

            
            <div className="flex gap-2 items-end pt-2 border-t border-gray-200/50">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="اسم الإضافة"
                  value={newAddonName}
                  onChange={(e) => setNewAddonName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-charcoal text-xs focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold"
                />
              </div>
              <div className="w-20">
                <input
                  type="number"
                  step="0.01;0.5"
                  min="0"
                  placeholder="السعر"
                  value={newAddonPrice}
                  onChange={(e) => setNewAddonPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-charcoal text-xs focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!newAddonName.trim()) return;
                  setAddons(prev => [...prev, { name: newAddonName.trim(), price: parseFloat(newAddonPrice) || 0 }]);
                  setNewAddonName('');
                  setNewAddonPrice('');
                }}
                className="px-3 py-2 bg-gold hover:bg-gold-light text-olive-dark text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0"
              >
                إضافة
              </button>
            </div>
          </div>

          
          <div className="flex items-center gap-3 pt-2">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setModalOpen(false)}
              className="flex-1"
            >
              إلغاء
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleSave}
              isLoading={isSaving}
              className="flex-1"
              disabled={!formData.name_en || !formData.base_price}
            >
              <Save size={16} />
              {editingProduct ? 'تحديث' : 'إنشاء'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
