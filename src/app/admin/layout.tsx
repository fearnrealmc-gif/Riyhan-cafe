'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname, notFound } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  UtensilsCrossed,
  LogOut,
  Coffee,
  ChevronRight,
  ChevronLeft,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { href: '/admin/menu', label: 'إدارة المنيو', icon: UtensilsCrossed },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, profile, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {

      router.replace('/login');
      return;
    }

    if (profile && !isAdmin) {

      setAccessDenied(true);
    }
  }, [authLoading, user, profile, isAdmin, router]);

  const handleLogout = async () => {
    await signOut();
    router.replace('/');
  };

  if (accessDenied) {
    notFound();
    return null;
  }

  if (authLoading || !user || !profile || !isAdmin) {
    return (
      <div className="min-h-screen bg-olive flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-olive-dark flex" dir="rtl">
      
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      
      <aside
        className={cn(
          'fixed lg:static inset-y-0 right-0 z-50 w-64 bg-olive flex flex-col',
          'transform transition-transform duration-300 ease-out',
          'lg:transform-none',
          sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        )}
      >
        
        <div className="px-6 py-5 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="ريحان كافيه"
              className="w-9 h-9 rounded-full object-cover border border-white/10 shadow-md"
            />
            <div>
              <p className="text-sm font-semibold text-offwhite">ريحان كافيه</p>
              <p className="text-[10px] text-offwhite/40">لوحة تحكم المسؤول</p>
            </div>
          </Link>
        </div>

        
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium',
                  'transition-all duration-200',
                  isActive
                    ? 'bg-gold/15 text-gold'
                    : 'text-offwhite/60 hover:bg-white/5 hover:text-offwhite'
                )}
              >
                <item.icon size={18} />
                {item.label}
                {isActive && <ChevronLeft size={14} className="mr-auto" />}
              </Link>
            );
          })}
        </nav>

        
        <div className="px-3 py-4 border-t border-white/5">
          
          <div className="px-3 py-2 mb-2">
            <p className="text-xs text-offwhite/70 truncate">{profile?.name || 'مسؤول'}</p>
            <p className="text-[10px] text-offwhite/30 truncate" dir="ltr">{user?.email}</p>
          </div>

          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-offwhite/40 hover:text-offwhite/60 hover:bg-white/5 transition-all"
          >
            <Coffee size={16} />
            عرض المتجر
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-400/5 transition-all mt-1 cursor-pointer"
          >
            <LogOut size={16} />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      
      <div className="flex-1 flex flex-col min-h-screen">
        
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-olive border-b border-white/5">
          <span className="text-sm font-semibold text-offwhite">لوحة تحكم ريحان كافيه</span>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl hover:bg-white/10 text-gold hover:text-gold-light active:bg-white/20 transition-all cursor-pointer flex items-center justify-center border border-white/10 bg-white/5"
            aria-label="فتح القائمة"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </header>

        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
