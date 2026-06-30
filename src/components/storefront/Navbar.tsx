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
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/40 backdrop-blur-md border-b border-white/10" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Right Side: Logo and Brand Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo.jpg"
              alt="ريحان كافيه"
              className="w-9 h-9 rounded-full object-cover shadow-md border border-gold/20 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col text-right">
              <span className="text-offwhite font-semibold text-base leading-tight tracking-tight">
                ريحان كافيه
              </span>
              <span className="text-gold text-[10px] leading-tight tracking-[0.1em] uppercase font-light">
                RiEaN CAFE
              </span>
            </div>
          </Link>

          {/* Left Side: Desktop Links & Theme Toggle */}
          <div className="hidden sm:flex items-center gap-5">
            <Link
              href="/"
              className="text-sm text-offwhite/80 hover:text-gold transition-colors font-medium font-arabic"
            >
              القائمة
            </Link>

            {!authLoading && (
              user ? (
                <Link
                  href="/profile"
                  className="flex items-center gap-1.5 text-sm text-offwhite/80 hover:text-gold transition-colors font-medium font-arabic"
                >
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <User size={13} className="text-gold" />
                  </div>
                  {profile?.name || user?.user_metadata?.name || 'حسابي'}
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 text-sm text-offwhite/80 hover:text-gold transition-colors font-medium font-arabic"
                >
                  <LogIn size={14} className="text-gold" />
                  تسجيل الدخول
                </Link>
              )
            )}
            
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-white/5 transition-colors text-offwhite/80 hover:text-gold cursor-pointer"
              aria-label="تبديل المظهر"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/5 transition-colors text-offwhite/80 hover:text-gold cursor-pointer"
              aria-label="تبديل المظهر"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full hover:bg-white/5 transition-colors text-offwhite/80 hover:text-gold cursor-pointer"
              aria-label="تبديل القائمة"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile/Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-black/95 border-b border-white/15 animate-slide-down">
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-offwhite/80 hover:bg-white/5 hover:text-gold transition-colors font-arabic"
            >
              القائمة
            </Link>

            {!authLoading && (
              user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-offwhite/80 hover:bg-white/5 hover:text-gold transition-colors font-arabic"
                  >
                    <User size={15} className="text-gold" />
                    {profile?.name || user?.user_metadata?.name || 'حسابي'}
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg text-sm font-medium text-gold/80 hover:bg-white/5 hover:text-gold transition-colors font-arabic"
                    >
                      لوحة تحكم المسؤول
                    </Link>
                  )}
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-offwhite/80 hover:bg-white/5 hover:text-gold transition-colors font-arabic"
                >
                  <LogIn size={15} className="text-gold" />
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
