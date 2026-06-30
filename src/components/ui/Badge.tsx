

import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'new' | 'preparing' | 'completed' | 'cancelled' | 'default';
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<string, string> = {
  new: 'bg-gold/15 text-gold-dark border border-gold/30',
  preparing: 'bg-olive/10 text-olive border border-olive/20',
  completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  cancelled: 'bg-red-50 text-red-600 border border-red-200',
  default: 'bg-gray-100 text-gray-600 border border-gray-200',
};

export default function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
