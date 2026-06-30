'use client';

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import CategoryFilter from '@/components/storefront/CategoryFilter';
import ProductCard from '@/components/storefront/ProductCard';
import type { Product } from '@/types';

interface MenuSectionProps {
  products: Product[];
}

export default function MenuSection({ products }: MenuSectionProps) {
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
      <div className="max-w-md mx-auto mb-8 relative px-4 sm:px-0">
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث عن مشروبك أو وجبتك المفضلة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-12 py-3.5 rounded-2xl border border-cream bg-white text-charcoal placeholder:text-warm-gray text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all text-right"
            dir="rtl"
          />
          <Search
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray"
          />
        </div>
      </div>

      <div className="mb-8">
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

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
