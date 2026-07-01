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
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/90 sm:bg-black/40 backdrop-blur-md border-b border-white/10" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Right Side: Logo and Brand Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo_circular.png"
              alt="ريحان كافيه"
              className="w-9 h-9 rounded-full object-cover shadow-md border border-gold/20 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col text-right">
              <span className="text-offwhite font-semibold text-base leading-tight tracking-tight">
                ريحان كافيه
              </span>
              <span className="text-gold text-[10px] leading-tight tracking-[0.1em] uppercase font-light">
                Rayhan CAFE
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

    {/* Floating Social Media Buttons */}
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2.5 animate-fade-in" dir="rtl">
      {/* WhatsApp */}
      <a
        href="https://wa.me/963984858449"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#25D366] text-white shadow-md shadow-[#25D366]/10 hover:shadow-[#25D366]/35 hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="WhatsApp"
      >
        <span className="absolute right-12 sm:right-13 bg-charcoal/90 dark:bg-black/90 text-offwhite text-xs font-arabic py-1.5 px-3 rounded-lg opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap shadow-md border border-white/10">
          واتساب
        </span>
        <svg className="w-5.5 h-5.5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.906-6.99C16.246 1.864 13.758 1.83 11.13 1.83c-5.437 0-9.863 4.421-9.867 9.865-.001 1.77.464 3.5 1.346 5.037L1.618 21.93l5.029-1.32c1.513.825 3.103 1.258 4.707 1.258zm9.361-6.666c-.23-.115-1.36-.672-1.571-.749-.21-.077-.363-.115-.517.115-.154.23-.597.749-.732.904-.134.153-.268.172-.498.057-.23-.115-.97-.358-1.848-1.141-.683-.61-1.145-1.363-1.278-1.593-.134-.23-.014-.354.1-.469.103-.103.23-.268.344-.403.115-.134.153-.23.23-.383.077-.154.038-.287-.019-.403-.057-.115-.517-1.245-.709-1.7-.186-.448-.372-.387-.517-.394-.134-.006-.287-.007-.441-.007-.153 0-.403.057-.613.287-.21.23-.804.786-.804 1.916 0 1.13.822 2.222.937 2.376.115.154 1.618 2.47 3.92 3.467.548.237 1.036.378 1.39.49.55.175 1.05.15 1.446.09.44-.066 1.36-.557 1.552-1.094.191-.537.191-.996.134-1.094-.057-.095-.21-.153-.44-.268z" />
        </svg>
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/riha_ncafe?igsh=MXAzbXdlZzNmbG5jaQ=="
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-md shadow-[#ee2a7b]/10 hover:shadow-[#ee2a7b]/35 hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="Instagram"
      >
        <span className="absolute right-12 sm:right-13 bg-charcoal/90 dark:bg-black/90 text-offwhite text-xs font-arabic py-1.5 px-3 rounded-lg opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap shadow-md border border-white/10">
          إنستغرام
        </span>
        <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 1 0 12.324 6.162 6.162 0 0 1 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 1 0 2.881 1.44 1.44 0 0 1 0-2.881z" />
        </svg>
      </a>

      {/* Facebook */}
      <a
        href="https://www.facebook.com/share/1D4vGjXz7g/"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1877F2] text-white shadow-md shadow-[#1877F2]/10 hover:shadow-[#1877F2]/35 hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="Facebook"
      >
        <span className="absolute right-12 sm:right-13 bg-charcoal/90 dark:bg-black/90 text-offwhite text-xs font-arabic py-1.5 px-3 rounded-lg opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap shadow-md border border-white/10">
          فيسبوك
        </span>
        <svg className="w-5.5 h-5.5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>
    </div>
  </>
  );
}
