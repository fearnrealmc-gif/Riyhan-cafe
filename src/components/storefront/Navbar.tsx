'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, LogIn, Sun, Moon, MessageCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const { user, profile, isAdmin, isLoading: authLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 flex-row-reverse" dir="ltr">
          
          {/* Left Side (in LTR, which is Left in RTL): Theme Toggle & Hamburger Menu */}
          <div className="flex-1 flex justify-start items-center gap-1 sm:gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/5 text-offwhite/80 hover:text-gold transition-colors cursor-pointer"
              aria-label="تبديل المظهر"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full hover:bg-white/5 text-offwhite/80 hover:text-gold transition-colors cursor-pointer"
              aria-label="تبديل القائمة"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Center: Logo and Brand Name */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <img
                src="/logo.jpg"
                alt="ريحان كافيه"
                className="w-8 h-8 rounded-full object-cover border border-gold/30 shadow-md group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col items-center">
                <span className="text-offwhite font-bold text-sm sm:text-base leading-tight tracking-tight">
                  ريحان كافيه
                </span>
                <span className="text-gold text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-light leading-none">
                  RiEaN CAFE
                </span>
              </div>
            </Link>
          </div>

          {/* Right Side (in LTR, which is Right in RTL): Contact Us Button */}
          <div className="flex-1 flex justify-end">
            <a
              href="https://wa.me/963999999999" // Placeholder WhatsApp
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 hover:bg-gold/20 transition-all duration-300 text-xs font-semibold text-gold shadow-sm shadow-gold/5 cursor-pointer"
              dir="rtl"
            >
              <MessageCircle size={14} className="text-gold animate-pulse" />
              <span className="hidden sm:inline">تواصل معنا</span>
              <span className="sm:hidden">اتصال</span>
            </a>
          </div>

        </div>
      </div>

      {/* Mobile/Drawer Menu */}
      {mobileMenuOpen && (
        <div className="bg-black/95 border-b border-white/15 animate-slide-down" dir="rtl">
          <div className="px-4 py-4 space-y-2 max-w-7xl mx-auto">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-offwhite/80 hover:bg-white/5 hover:text-gold transition-colors"
            >
              القائمة الرئيسية
            </Link>

            {!authLoading && (
              user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-offwhite/80 hover:bg-white/5 hover:text-gold transition-colors"
                  >
                    <User size={15} className="text-gold" />
                    {profile?.name || user?.user_metadata?.name || 'حسابي'}
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gold/80 hover:bg-white/5 hover:text-gold transition-colors"
                    >
                      لوحة تحكم المسؤول
                    </Link>
                  )}
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-offwhite/80 hover:bg-white/5 hover:text-gold transition-colors"
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
