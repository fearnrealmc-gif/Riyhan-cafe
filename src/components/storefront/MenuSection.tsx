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
          <div className="bg-gradient-to-br from-cream dark:from-olive/30 to-white dark:to-black/90 rounded-3xl border border-gold/20 p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-gold/[0.01] transition-all">
            <div className="flex-1 text-right space-y-4 order-2 md:order-1 w-full">
              <div className="flex items-center gap-3 justify-start">
                <span className="p-2 bg-gold/10 rounded-xl text-gold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 animate-pulse">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                  </svg>
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-charcoal dark:text-offwhite font-arabic">
                  {bannerSettings.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-charcoal/75 dark:text-offwhite/60 leading-relaxed max-w-md">
                {bannerSettings.description}
              </p>
              <a
                href={bannerSettings.button_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gold hover:bg-gold-light text-olive-dark font-bold text-xs rounded-full transition-all cursor-pointer shadow-md shadow-gold/10"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {bannerSettings.button_text}
              </a>
            </div>
            <div className="w-full md:w-64 h-40 rounded-2xl overflow-hidden relative border border-gold/15 order-1 md:order-2 shrink-0">
              <img
                src={bannerSettings.image_url || '/waffle.png'}
                alt="RiEaN atmosphere"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-gold font-serif text-xl font-bold tracking-widest bg-black/70 px-3 py-1 rounded-lg border border-gold/20">RiEaN</span>
              </div>
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
