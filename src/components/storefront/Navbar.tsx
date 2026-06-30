'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, LogIn, Sun, Moon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const { user, profile, isAdmin, isLoading: authLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo.jpg"
              alt="ريحان كافيه"
              className="w-9 h-9 rounded-full object-cover shadow-md border border-gold/20"
            />
            <div className="flex flex-col">
              <span className="text-olive dark:text-white font-semibold text-base leading-tight tracking-tight">
                ريحان كافيه
              </span>
              <span className="text-warm-gray dark:text-white/40 text-[10px] leading-tight">
                Riyhan Cafe
              </span>
            </div>
          </Link>

          
          <div className="hidden sm:flex items-center gap-5">
            <Link
              href="/"
              className="text-sm text-charcoal/70 dark:text-white/70 hover:text-olive dark:hover:text-gold transition-colors font-medium"
            >
              القائمة
            </Link>

            
            {!authLoading && (
              user ? (
                <Link
                  href="/profile"
                  className="flex items-center gap-1.5 text-sm text-charcoal/70 dark:text-white/70 hover:text-olive dark:hover:text-gold transition-colors font-medium"
                >
                  <div className="w-6 h-6 rounded-full bg-olive/10 dark:bg-white/10 flex items-center justify-center">
                    <User size={13} className="text-olive dark:text-gold" />
                  </div>
                  {profile?.name || user?.user_metadata?.name || 'حسابي'}
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 text-sm text-charcoal/70 dark:text-white/70 hover:text-olive dark:hover:text-gold transition-colors font-medium"
                >
                  <LogIn size={14} className="dark:text-white" />
                  تسجيل الدخول
                </Link>
              )
            )}

            
            {/* Removed Cart Link */}
            
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-cream dark:hover:bg-white/5 transition-colors text-olive dark:text-white hover:text-gold cursor-pointer"
              aria-label="تبديل المظهر"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          
          <div className="flex sm:hidden items-center gap-2">
            {/* Removed Cart Link */}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-cream dark:hover:bg-white/5 transition-colors text-olive dark:text-white cursor-pointer"
              aria-label="تبديل المظهر"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full hover:bg-cream dark:hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="تبديل القائمة"
            >
              {mobileMenuOpen ? <X size={20} className="text-olive dark:text-white" /> : <Menu size={20} className="text-olive dark:text-white" />}
            </button>
          </div>
        </div>
      </div>

      
      {mobileMenuOpen && (
        <div className="sm:hidden bg-offwhite dark:bg-olive-dark border-t border-cream dark:border-white/5 animate-slide-down">
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-charcoal dark:text-white hover:bg-cream dark:hover:bg-white/5 transition-colors"
            >
              القائمة
            </Link>

            {!authLoading && (
              user ? (
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-charcoal dark:text-white hover:bg-cream dark:hover:bg-white/5 transition-colors"
                >
                  <User size={15} className="dark:text-gold" />
                  {profile?.name || user?.user_metadata?.name || 'حسابي'}
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-charcoal dark:text-white hover:bg-cream dark:hover:bg-white/5 transition-colors"
                >
                  <LogIn size={15} className="dark:text-gold" />
                  تسجيل الدخول
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
