'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/types';
import { LayoutGrid, Coffee } from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  all: <LayoutGrid size={22} />,
  
  hot_coffee: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6.5 h-6.5">
      <path d="M5 8h10a1 1 0 0 1 1 1v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9a1 1 0 0 1 1-1Z" />
      <path d="M16 11h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1" />
      <path d="M2 21h18" />
      <path d="M6 5c0.3-0.8 0.3-1.5 0-2.2" />
      <path d="M10 5c0.3-0.8 0.3-1.5 0-2.2" />
      <path d="M14 5c0.3-0.8 0.3-1.5 0-2.2" />
    </svg>
  ),
  
  cold_coffee: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6.5 h-6.5">
      <path d="M6 8 L 8 21 A 1 1 0 0 0 9 22 L 15 22 A 1 1 0 0 0 16 21 L 18 8 Z" />
      <ellipse cx="12" cy="8" rx="6" ry="1.2" />
      <path d="M12 8 L 15 2" />
      <rect x="9.5" y="12" width="2" height="2" rx="0.5" transform="rotate(15 9.5 12)" fill="currentColor" opacity="0.2" />
      <rect x="12.5" y="14" width="2" height="2" rx="0.5" transform="rotate(-10 12.5 14)" fill="currentColor" opacity="0.2" />
    </svg>
  ),
  
  juices: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6.5 h-6.5">
      <path d="M6 3 L 8 20 A 1 1 0 0 0 9 21 L 15 21 A 1 1 0 0 0 16 20 L 18 3 Z" />
      <line x1="11" y1="17" x2="15" y2="1.5" />
      <circle cx="6" cy="4.5" r="2.5" fill="currentColor" opacity="0.2" />
      <circle cx="6" cy="4.5" r="2.5" />
      <line x1="6" y1="2" x2="6" y2="7" />
      <line x1="3.5" y1="4.5" x2="8.5" y2="4.5" />
    </svg>
  ),
  
  ice_cream: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6.5 h-6.5">
      <path d="M7 12 L 12 22 L 17 12 Z" />
      <path d="M6 12 A 3.5 3.5 0 0 1 12 8.5 A 3.5 3.5 0 0 1 18 12 Z" fill="currentColor" opacity="0.2" />
      <circle cx="12" cy="8.5" r="4" />
      <circle cx="12" cy="3.5" r="1" fill="currentColor" />
      <path d="M12 2.5 C 12 1.5, 14 1.5, 14 1.5" />
    </svg>
  ),
  
  ice_coffee: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6.5 h-6.5">
      <path d="M6 8 L 8 21 A 1 1 0 0 0 9 22 L 15 22 A 1 1 0 0 0 16 21 L 18 8 Z" />
      <ellipse cx="12" cy="8" rx="6" ry="1.2" />
      <path d="M12 8 L 15 2" />
      <path d="M8 12c1.5 0.5 3.5 0.5 5 0s2.5-0.5 3 0" opacity="0.3" />
    </svg>
  ),
  
  crepe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6.5 h-6.5">
      <path d="M12 2 L 21 16 A 2 2 0 0 1 19.5 19 L 4.5 19 A 2 2 0 0 1 3 16 Z" fill="currentColor" opacity="0.2" />
      <path d="M12 2 L 21 16 A 2 2 0 0 1 19.5 19 L 4.5 19 A 2 2 0 0 1 3 16 Z" />
      <path d="M6 11 C 9 12, 13 10, 17 12" strokeWidth="1.2" />
      <path d="M4 15 C 8 16.5, 12 15, 19 15.5" strokeWidth="1.2" />
      <path d="M8 7 C 10 8, 12 7.2, 15 8" strokeWidth="1.2" />
    </svg>
  ),
  
  waffle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6.5 h-6.5">
      <rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" opacity="0.1" />
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <line x1="7.5" y1="3" x2="7.5" y2="21" />
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="16.5" y1="3" x2="16.5" y2="21" />
      <line x1="3" y1="7.5" x2="21" y2="7.5" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="16.5" x2="21" y2="16.5" />
    </svg>
  ),
  
  pancake: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6.5 h-6.5">
      <ellipse cx="12" cy="6.5" rx="7" ry="2.2" fill="currentColor" opacity="0.2" />
      <ellipse cx="12" cy="6.5" rx="7" ry="2.2" />
      <path d="M11 4.5 h2 v1.2 h-2 z" fill="currentColor" />
      <path d="M5 7 v2 c0 1.2 3.1 2.2 7 2.2 s7-1 7-2.2 V7" />
      <path d="M5 10 v2 c0 1.2 3.1 2.2 7 2.2 s7-1 7-2.2 v-2" />
      <path d="M5 13 v2.5 c0 1.2 3.1 2.2 7 2.2 s7-1 7-2.2 V13" />
      <path d="M12 7.5 c0 1.5, 0.8 2.5, 0.8 3.8 s-0.8 1.2-0.8 1.2" strokeWidth="1.2" />
    </svg>
  ),
  
  hookah: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6.5 h-6.5">
      <path d="M8 21 C 8 16.5, 9.5 15.5, 9.5 12 L 9.5 8 L 14.5 8 L 14.5 12 C 14.5 15.5, 16 16.5, 16 21 Z" fill="currentColor" opacity="0.2" />
      <path d="M8 21 C 8 16.5, 9.5 15.5, 9.5 12 L 9.5 8 L 14.5 8 L 14.5 12 C 14.5 15.5, 16 16.5, 16 21 Z" />
      <ellipse cx="12" cy="21" rx="4" ry="1.2" />
      <line x1="12" y1="8" x2="12" y2="3.5" />
      <path d="M9.5 3.5 L 14.5 3.5 L 13.5 5.5 L 10.5 5.5 Z" />
      <path d="M13.5 14.5 L 18.5 17 C 20 17.8, 20.5 19.5, 20 21" />
      <ellipse cx="12" cy="7" rx="2.5" ry="0.6" />
    </svg>
  ),
  
  cocktails: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6.5 h-6.5">
      <path d="M3 3 L 12 12.5 L 21 3 Z" fill="currentColor" opacity="0.2" />
      <path d="M3 3 L 12 12.5 L 21 3 Z" />
      <line x1="12" y1="12.5" x2="12" y2="20" />
      <line x1="8" y1="20" x2="16" y2="20" />
      <circle cx="10" cy="6.5" r="1.2" fill="currentColor" />
      <line x1="12.5" y1="4" x2="8.5" y2="8.5" />
    </svg>
  ),
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
