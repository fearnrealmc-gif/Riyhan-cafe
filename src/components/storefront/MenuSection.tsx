'use client';

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import CategoryFilter from '@/components/storefront/CategoryFilter';
import ProductCard from '@/components/storefront/ProductCard';
import type { Product } from '@/types';

interface MenuSectionProps {
  products: Product[];
  bannerSettings: {
    title: string;
    description: string;
    button_text: string;
    button_link: string;
    image_url: string;
  } | null;
}

export default function MenuSection({ products, bannerSettings }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch =
        p.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.name_ar && p.name_ar.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <>
      {/* Search Input */}
      <div className="max-w-md mx-auto mb-8 relative px-4 sm:px-0">
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث عن مشروبك أو وجبتك المفضلة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-12 py-3.5 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-charcoal dark:text-offwhite placeholder:text-warm-gray text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all text-right"
            dir="rtl"
          />
          <Search
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray"
          />
        </div>
      </div>

      {/* Categories Filter */}
      <div className="mb-10">
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* Dynamic Promo Banner (Below Category Circles) */}
      {bannerSettings && (
        <div className="mb-12 max-w-4xl mx-auto w-full px-4 sm:px-0 animate-fade-in">
          <div className="bg-gradient-to-br from-cream dark:from-olive/30 to-white dark:to-black/90 rounded-3xl border border-gold/20 p-4 sm:p-6 flex flex-row items-center justify-between gap-4 shadow-xl shadow-gold/[0.01] transition-all">
            
            {/* Text Content (Right side in RTL) */}
            <div className="flex-1 text-right space-y-2 sm:space-y-4 order-1">
              <div className="flex items-center gap-2 justify-start">
                <span className="p-1.5 bg-gold/10 rounded-lg text-gold shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5.5 h-5.5 sm:w-7 sm:h-7 text-gold"
                  >
                    {/* Wheels */}
                    <circle cx="6" cy="18" r="2.5" />
                    <circle cx="18" cy="18" r="2.5" />
                    {/* Scooter frame */}
                    <path d="M6 15.5h6.5l2-5h-4" />
                    <path d="M14.5 10.5L13.2 6.6c-.2-.6-.8-1-1.4-1H8.5" />
                    {/* Handlebar */}
                    <path d="M9 5h3.5l1.5 4h1.5" />
                    {/* Connect wheels and frame */}
                    <path d="M6 15.5V11.5" />
                    <path d="M18 15.5v-2" />
                    {/* Delivery Box */}
                    <rect x="14" y="6.5" width="5.5" height="7" rx="1.5" />
                    {/* Speed lines */}
                    <path d="M2 9h2M1 12h2.5M1.5 15h1.5" />
                  </svg>
                </span>
                <h3 className="text-xs sm:text-lg lg:text-xl font-bold text-charcoal dark:text-offwhite font-arabic leading-tight">
                  {bannerSettings.title}
                </h3>
              </div>
              <p className="text-[10px] sm:text-xs lg:text-sm text-charcoal/75 dark:text-offwhite/60 leading-relaxed max-w-md">
                {bannerSettings.description}
              </p>
              <a
                href={bannerSettings.button_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-6 sm:py-2.5 bg-gold hover:bg-gold-light text-olive-dark font-bold text-[10px] sm:text-xs rounded-full transition-all cursor-pointer shadow-md shadow-gold/10 whitespace-nowrap"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                >
                  {/* Wheels */}
                  <circle cx="6" cy="18" r="2" />
                  <circle cx="18" cy="18" r="2" />
                  {/* Frame */}
                  <path d="M6 16h6.5l1.5-4h-3" />
                  {/* Box */}
                  <rect x="13.5" y="8" width="5" height="6" rx="1" />
                  {/* Handlebar */}
                  <path d="M8.5 7h2.5l1 3" />
                </svg>
                {bannerSettings.button_text}
              </a>
            </div>

            {/* Image (Left side in RTL) */}
            <div className="w-24 h-24 sm:w-36 sm:h-36 md:w-64 md:h-40 rounded-2xl overflow-hidden relative border border-gold/15 order-2 shrink-0">
              <img
                src={bannerSettings.image_url || '/waffle.png'}
                alt="Rayhan atmosphere"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

          </div>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-warm-gray text-sm">لا توجد منتجات متوفرة في هذه الفئة حالياً.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>
      )}
    </>
  );
}
