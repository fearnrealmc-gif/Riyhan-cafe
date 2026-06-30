'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, LogIn, UserPlus, Coffee, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Navbar from '@/components/storefront/Navbar';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { user, signIn, signUp, isLoading: authLoading } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace('/profile');
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (mode === 'login') {
      const { error: err } = await signIn(email, password);
      if (err) {
        setError(getArabicError(err));
      } else {
        router.push('/profile');
      }
    } else {
      if (password.length < 6) {
        setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل.');
        setIsLoading(false);
        return;
      }
      const { error: err } = await signUp(email, password, name);
      if (err) {
        setError(getArabicError(err));
      } else {
        setSuccess('تم إنشاء حسابك بنجاح! يمكنك تسجيل الدخول الآن.');
        setMode('login');
        setPassword('');
      }
    }

    setIsLoading(false);
  };

  function getArabicError(msg: string): string {
    if (msg.includes('Invalid login credentials')) return 'البريد الإلكتروني أو كلمة المرور غير صحيحة.';
    if (msg.includes('User already registered')) return 'هذا البريد الإلكتروني مسجل بالفعل.';
    if (msg.includes('Email not confirmed')) return 'يرجى تأكيد بريدك الإلكتروني أولاً.';
    if (msg.includes('Password should be')) return 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.';
    return msg;
  }

  if (authLoading) {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-20 pb-12 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20 pb-12">
        <div className="max-w-md mx-auto px-4 py-12">
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-warm-gray hover:text-olive transition-colors mb-8"
          >
            <ArrowLeft size={16} className="rotate-180" />
            العودة للقائمة
          </Link>

          
          <div className="text-center mb-8 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-olive flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Coffee size={28} className="text-gold" />
            </div>
            <h1 className="text-2xl font-bold text-olive">
              {mode === 'login' ? 'مرحباً بعودتك' : 'إنشاء حساب جديد'}
            </h1>
            <p className="text-sm text-warm-gray mt-1">
              {mode === 'login'
                ? 'سجّل دخولك لتتبع طلباتك وتجربة مميزة'
                : 'أنشئ حسابك واستمتع بتجربة ريحان كافيه'}
            </p>
          </div>

          
          <div className="flex bg-cream rounded-xl p-1 mb-6">
            <button
              onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-olive shadow-sm'
                  : 'text-warm-gray hover:text-charcoal'
              }`}
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => { setMode('signup'); setError(''); setSuccess(''); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-white text-olive shadow-sm'
                  : 'text-warm-gray hover:text-charcoal'
              }`}
            >
              حساب جديد
            </button>
          </div>

          
          <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up">
            {mode === 'signup' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-olive mb-1.5">
                  الاسم
                </label>
                <div className="relative">
                  <User size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: أحمد"
                    className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-gray-200 bg-white text-charcoal placeholder:text-warm-gray text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-olive mb-1.5">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                  dir="ltr"
                  className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-gray-200 bg-white text-charcoal placeholder:text-warm-gray text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-left"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-olive mb-1.5">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  dir="ltr"
                  className="w-full pr-10 pl-10 py-2.5 rounded-xl border border-gray-200 bg-white text-charcoal placeholder:text-warm-gray text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-left"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray hover:text-olive cursor-pointer"
                  aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm animate-fade-in">
                {error}
              </div>
            )}

            
            {success && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm animate-fade-in">
                {success}
              </div>
            )}

            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full rounded-xl gap-2"
              isLoading={isLoading}
            >
              {mode === 'login' ? (
                <>
                  <LogIn size={18} /> تسجيل الدخول
                </>
              ) : (
                <>
                  <UserPlus size={18} /> إنشاء الحساب
                </>
              )}
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}
