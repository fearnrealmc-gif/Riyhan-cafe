'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/types';
import { Coffee, IceCreamCone, Leaf, Croissant, LayoutGrid } from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  all: <LayoutGrid size={15} />,
  hot_coffee: <Coffee size={15} />,
  cold_coffee: <IceCreamCone size={15} />,
  tea: <Leaf size={15} />,
  pastry: <Croissant size={15} />,
};

export default function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center sm:flex-wrap">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onCategoryChange(cat.key)}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap',
            'transition-all duration-200 cursor-pointer shrink-0',
            activeCategory === cat.key
              ? 'bg-olive text-offwhite shadow-md'
              : 'bg-white dark:bg-white/5 text-charcoal/70 dark:text-white/70 hover:bg-cream dark:hover:bg-white/10 border border-gray-100 dark:border-white/5 hover:border-gray-200'
          )}
        >
          {categoryIcons[cat.key]}
          {cat.label_ar}
        </button>
      ))}
    </div>
  );
}
