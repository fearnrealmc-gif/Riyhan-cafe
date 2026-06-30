'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-olive mb-1.5"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full px-4 py-2.5 rounded-lg border bg-white text-charcoal',
          'placeholder:text-warm-gray text-sm',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold',
          error
            ? 'border-red-400 focus:ring-red-300/50 focus:border-red-400'
            : 'border-gray-200 hover:border-gray-300',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
