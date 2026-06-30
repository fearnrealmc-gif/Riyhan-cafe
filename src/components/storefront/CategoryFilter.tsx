'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/types';
import {
  Coffee,
  IceCream,
  GlassWater,
  Grid,
  Disc,
  Wind,
  Wine,
  LayoutGrid,
} from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  all: <LayoutGrid size={22} />,
  hot_coffee: <Coffee size={22} />,
  cold_coffee: <GlassWater size={22} />,
  juices: <GlassWater size={22} />,
  ice_cream: <IceCream size={22} />,
  ice_coffee: <GlassWater size={22} />,
  crepe: <Disc size={22} />,
  waffle: <Grid size={22} />,
  pancake: <Disc size={22} />,
  hookah: <Wind size={22} />,
  cocktails: <Wine size={22} />,
};

export default function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Title */}
      <div className="flex items-center gap-2 mb-8 justify-center">
        <span className="text-gold/80 text-sm">🍃</span>
        <h2 className="text-xl font-bold text-gold font-arabic tracking-wide">تصفح الأصناف</h2>
        <span className="text-gold/80 text-sm">🍃</span>
      </div>

      {/* Categories Row */}
      <div className="flex items-center gap-6 overflow-x-auto pb-4 scrollbar-hide w-full justify-start md:justify-center px-4">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => onCategoryChange(cat.key)}
              className="flex flex-col items-center gap-2.5 group cursor-pointer shrink-0"
            >
              <div
                className={cn(
                  'w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 border',
                  isActive
                    ? 'border-gold bg-gold/15 scale-105 shadow-lg shadow-gold/10'
                    : 'border-white/10 bg-white/5 hover:border-gold/50 hover:bg-white/10'
                )}
              >
                <span
                  className={cn(
                    'transition-colors duration-300',
                    isActive ? 'text-gold' : 'text-offwhite/60 group-hover:text-gold'
                  )}
                >
                  {categoryIcons[cat.key] || <Coffee size={22} />}
                </span>
              </div>
              <span
                className={cn(
                  'text-xs font-medium font-arabic transition-colors duration-300',
                  isActive ? 'text-gold font-semibold' : 'text-offwhite/60 group-hover:text-gold'
                )}
              >
                {cat.label_ar}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
