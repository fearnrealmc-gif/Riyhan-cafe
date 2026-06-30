'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  User,
  Mail,
  Save,
  LogOut,
  ArrowLeft,
  Shield,
  Coffee,
} from 'lucide-react';
import Navbar from '@/components/storefront/Navbar';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase/client';

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, isLoading: authLoading, isAdmin, signOut, refreshProfile } = useAuth();
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  // Removed orders state and fetchOrders effect

  const handleUpdateName = async () => {
    if (!user || !name.trim()) return;
    setIsSaving(true);
    setSaveSuccess(false);

    const { error: dbError } = await supabase
      .from('profiles')
      .update({ name: name.trim(), updated_at: new Date().toISOString() })
      .eq('id', user.id);

    const { error: authError } = await supabase.auth.updateUser({
      data: { name: name.trim() }
    });

    if (!dbError && !authError) {
      setSaveSuccess(true);
      await refreshProfile();
      setTimeout(() => setSaveSuccess(false), 3000);
    }
    setIsSaving(false);
  };

  const handleLogout = async () => {
    await signOut();
    router.replace('/');
  };

  if (authLoading || !user) {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-20 pb-12 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </main>
      </>
    );
  }

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (profile?.name) {
      setName(profile.name);
    } else if (user?.user_metadata?.name) {
      setName(user.user_metadata.name);
    }
  }, [profile, user]);

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20 pb-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          
          <div className="flex items-center gap-3 mb-8">
            <Link
              href="/"
              className="p-2 rounded-full hover:bg-cream transition-colors"
              aria-label="العودة"
            >
              <ArrowLeft size={20} className="text-olive rotate-180" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-olive">الملف الشخصي</h1>
              <p className="text-xs text-warm-gray">إدارة حسابك ومتابعة طلباتك</p>
            </div>
          </div>

          
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm animate-slide-up">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-olive flex items-center justify-center shrink-0">
                <User size={24} className="text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-charcoal truncate">
                  {profile?.name || user?.user_metadata?.name || 'عميل ريحان'}
                </h2>
                <p className="text-xs text-warm-gray truncate" dir="ltr">{user.email}</p>
                {isAdmin && (
                  <div className="flex items-center gap-1 mt-1">
                    <Shield size={12} className="text-gold" />
                    <span className="text-[10px] text-gold font-medium">مسؤول النظام</span>
                  </div>
                )}
              </div>
            </div>

            
            <div className="space-y-4">
              <div>
                <label htmlFor="profile-name" className="block text-sm font-medium text-olive mb-1.5">
                  الاسم
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <User size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray" />
                    <input
                      id="profile-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-gray-200 bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                    />
                  </div>
                  <Button
                    variant={saveSuccess ? 'secondary' : 'primary'}
                    size="md"
                    onClick={handleUpdateName}
                    isLoading={isSaving}
                    className="rounded-xl shrink-0"
                  >
                    <Save size={16} />
                    {saveSuccess ? 'تم الحفظ!' : 'حفظ'}
                  </Button>
                </div>
              </div>

              
              <div>
                <label className="block text-sm font-medium text-olive mb-1.5">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray" />
                  <input
                    type="email"
                    value={user.email || ''}
                    disabled
                    dir="ltr"
                    className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-charcoal/50 text-sm cursor-not-allowed text-left"
                  />
                </div>
              </div>
            </div>
          </div>

          
          {isAdmin && (
            <Link
              href="/admin"
              className="flex items-center justify-between bg-olive text-offwhite rounded-2xl p-5 mb-6 shadow-sm hover:bg-olive-light transition-colors animate-slide-up group"
              style={{ animationDelay: '0.05s' }}
            >
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-gold" />
                <div>
                  <p className="text-sm font-semibold">لوحة تحكم المسؤول</p>
                  <p className="text-[10px] text-offwhite/50">إدارة المنيو</p>
                </div>
              </div>
              <ArrowLeft size={16} className="text-offwhite/40 group-hover:text-gold transition-colors rotate-180" />
            </Link>
          )}

          
          {/* Removed Order History Section */}

          
          <div className="mt-8 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-red-200 text-red-500 hover:bg-red-50 transition-all text-sm font-medium cursor-pointer"
            >
              <LogOut size={16} />
              تسجيل الخروج
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
