'use client';

import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
}: ModalProps) {

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      
      <div
        className={cn(
          'relative w-full bg-offwhite dark:bg-[#131E10] rounded-t-2xl sm:rounded-2xl shadow-2xl border border-transparent dark:border-white/5',
          'animate-slide-up overflow-hidden',
          'max-h-[90vh] flex flex-col',
          maxWidth
        )}
      >
        
        {title && (
          <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-cream dark:border-white/5">
            <h2 className="text-lg font-semibold text-olive dark:text-white">{title}</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-cream dark:hover:bg-white/5 transition-colors text-warm-gray dark:text-white/60 hover:text-olive dark:hover:text-gold cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        )}

        
        <div className="overflow-y-auto flex-1 px-6 py-4">{children}</div>
      </div>
    </div>
  );
}
