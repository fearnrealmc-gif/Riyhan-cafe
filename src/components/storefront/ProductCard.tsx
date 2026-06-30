'use client';

import React from 'react';
import Link from 'next/link';
import { Coffee, Flame, Bean } from 'lucide-react';
import { formatPrice, cn } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const categoryColors: Record<string, string> = {
  hot_coffee: 'from-amber-100 to-orange-50',
  cold_coffee: 'from-sky-100 to-blue-50',
  tea: 'from-emerald-100 to-green-50',
  pastry: 'from-yellow-100 to-amber-50',
};

const categoryEmoji: Record<string, string> = {
  hot_coffee: '☕',
  cold_coffee: '🧊',
  tea: '🍵',
  pastry: '🥐',
};

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const isOutOfStock = !product.is_available;

  return (
    <Link
      href={isOutOfStock ? '#' : `/product/${product.id}`}
      className={cn(
        'group w-full text-right bg-white rounded-2xl overflow-hidden block',
        'border border-gray-100 hover:border-gold/30',
        'shadow-sm hover:shadow-lg hover:shadow-gold/5',
        'transition-all duration-300 cursor-pointer',
        'hover:-translate-y-1',
        'animate-slide-up',
        isOutOfStock && 'opacity-60 cursor-not-allowed hover:translate-y-0 hover:shadow-sm'
      )}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      
      <div className="relative h-32 sm:h-48 flex items-center justify-center bg-cream-light overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name_ar || product.name_en}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={cn(
              'w-full h-full flex items-center justify-center bg-gradient-to-br',
              categoryColors[product.category] || 'from-gray-100 to-gray-50'
            )}
          >
            <span className="text-5xl sm:text-6xl transition-transform duration-300 group-hover:scale-110">
              {categoryEmoji[product.category] || '☕'}
            </span>
          </div>
        )}

        
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="px-3 py-1 bg-charcoal text-white text-xs font-medium rounded-full">
              غير متوفر
            </span>
          </div>
        )}

        
        <span className="absolute top-3 right-3 px-2 py-0.5 bg-white/80 backdrop-blur-sm rounded-full text-[10px] font-medium text-olive uppercase tracking-wider">
          {product.category === 'hot_coffee' && 'قهوة ساخنة'}
          {product.category === 'cold_coffee' && 'قهوة باردة'}
          {product.category === 'tea' && 'شاي'}
          {product.category === 'pastry' && 'معجنات'}
          {product.category === 'juices' && 'عصائر'}
          {product.category === 'ice_cream' && 'آيس كريم'}
          {product.category === 'ice_coffee' && 'آيس كوفي'}
          {product.category === 'crepe' && 'كريب'}
          {product.category === 'waffle' && 'وافل'}
          {product.category === 'pancake' && 'بانكيك'}
          {product.category === 'hookah' && 'أركيلة'}
          {product.category === 'cocktails' && 'كوكتيلات'}
        </span>
      </div>

      
      <div className="p-3.5 sm:p-5">
        
        <div className="mb-2">
          <h3 className="text-base font-semibold text-charcoal dark:text-white group-hover:text-olive dark:group-hover:text-gold transition-colors leading-tight">
            {product.name_ar || product.name_en}
          </h3>
          {product.name_ar && (
            <p className="text-xs text-warm-gray dark:text-white/50 mt-0.5 font-light">
              {product.name_en}
            </p>
          )}
        </div>

        
        <p className="text-xs text-warm-gray dark:text-white/60 mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        
        <div className="flex flex-wrap items-center gap-2 mb-3 text-[10px] text-warm-gray dark:text-white/40">
          {product.calories && (
            <span className="inline-flex items-center gap-1">
              <Flame size={11} className="text-orange-400" />
              {product.calories} سعرة
            </span>
          )}
          {product.bean_type && (
            <span className="inline-flex items-center gap-1">
              <Bean size={11} className="text-amber-600" />
              {product.bean_type}
            </span>
          )}
          {product.ingredients && product.ingredients.length > 0 && (
            <span className="inline-flex items-center gap-1">
              <Coffee size={11} className="text-olive/50" />
              {product.ingredients.length} مكونات
            </span>
          )}
        </div>

        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gold">
            {formatPrice(product.base_price, product.currency || 'USD')}
          </span>
          <span className="text-[10px] text-warm-gray uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            اضغط للتخصيص ←
          </span>
        </div>
      </div>
    </Link>
  );
}
