import { createServerSupabaseClient } from '@/lib/supabase/server';
import Navbar from '@/components/storefront/Navbar';
import Hero from '@/components/storefront/Hero';
import MenuSection from '@/components/storefront/MenuSection';
import type { Product } from '@/types';
import { MessageCircle, Compass } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {

  let products: Product[] = [];

  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('category', { ascending: true })
      .order('name_en', { ascending: true });

    if (!error && data) {
      products = data as Product[];
    }
  } catch {

  }

  return (
    <div className="min-h-screen flex flex-col bg-offwhite dark:bg-black text-charcoal dark:text-offwhite transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        
        <Hero />

        {/* Menu Section */}
        <section id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <MenuSection products={products} />
        </section>

        {/* Feature / Promo Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-br from-cream dark:from-olive/30 to-white dark:to-black/90 rounded-3xl border border-gold/20 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-gold/[0.01] transition-all">
            <div className="flex-1 text-right space-y-4 order-2 md:order-1">
              <div className="flex items-center gap-3 justify-start">
                <span className="p-2 bg-gold/10 rounded-xl text-gold">
                  <Compass size={22} className="animate-pulse" />
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-charcoal dark:text-offwhite font-arabic">أجواء مميزة وجلسات فريدة</h3>
              </div>
              <p className="text-xs sm:text-sm text-charcoal/75 dark:text-offwhite/60 leading-relaxed max-w-md">
                نرحب بكم دائماً لقضاء أوقات هادئة وتذوق أشهى المشروبات والمعجنات الطازجة في ريحان كافيه.
              </p>
              <a
                href="https://wa.me/963999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gold hover:bg-gold-light text-olive-dark font-bold text-xs rounded-full transition-all cursor-pointer shadow-md shadow-gold/10"
              >
                <MessageCircle size={14} />
                احجز طاولتك الآن
              </a>
            </div>
            <div className="w-full md:w-80 h-48 rounded-2xl overflow-hidden relative border border-gold/15 order-1 md:order-2">
              <img
                src="/waffle.png"
                alt="RiEaN atmosphere"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-gold font-serif text-2xl font-bold tracking-widest bg-black/70 px-4 py-1.5 rounded-xl border border-gold/20">RiEaN</span>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section ("من أجوائنا") */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="flex items-center gap-2 mb-10 justify-center">
            <span className="text-gold/80 text-sm">🍃</span>
            <h2 className="text-xl sm:text-2xl font-bold text-gold font-arabic tracking-wide">من أجوائنا</h2>
            <span className="text-gold/80 text-sm">🍃</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: '/cocktails.png', title: 'كوكتيلات منعشة' },
              { src: '/waffle.png', title: 'وافل طازج ولذيذ' },
              { src: '/crepe.png', title: 'كريب فرنسي مميز' },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="group relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg bg-white dark:bg-white/5"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-offwhite font-bold text-base sm:text-lg font-arabic">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-white/10 py-10 mt-8 bg-cream dark:bg-black transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center border border-gold/30">
                <span className="text-gold font-bold text-sm font-serif">R</span>
              </div>
              <span className="text-sm font-bold text-charcoal dark:text-offwhite">ريحان كافيه</span>
              <span className="text-xs text-gold font-serif">
                RiEaN CAFE
              </span>
            </div>
            <p className="text-xs text-warm-gray" dir="ltr">
              © {new Date().getFullYear()} RiEaN CAFE. All rights reserved.
            </p>
            <p className="text-[10px] text-warm-gray/50 mt-2" dir="ltr">
              Proudly built by{' '}
              <a
                href="https://taskonlabs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent font-bold transition-opacity hover:opacity-80 inline-block"
              >
                Taskon Lab
              </a>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
