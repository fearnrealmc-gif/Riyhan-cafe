

import { createServerSupabaseClient } from '@/lib/supabase/server';
import Navbar from '@/components/storefront/Navbar';
import Hero from '@/components/storefront/Hero';
import MenuSection from '@/components/storefront/MenuSection';
import type { Product } from '@/types';

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
    <>
      <Navbar />

      <main className="flex-1">
        
        <Hero />

        
        <section id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold text-olive mb-2">
              قائمتنا
            </h2>
            <p className="text-sm text-warm-gray max-w-md mx-auto">
              مشروبات مُعدّة بعناية ومعجنات طازجة تُخبز يومياً بكل حب.
            </p>
          </div>

          <MenuSection products={products} />
        </section>

        
        <footer className="border-t border-cream py-8 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-olive flex items-center justify-center">
                <span className="text-gold font-bold text-xs">R</span>
              </div>
              <span className="text-sm font-semibold text-olive">ريحان كافيه</span>
              <span className="text-xs text-warm-gray">
                Riyhan Cafe
              </span>
            </div>
            <p className="text-xs text-warm-gray" dir="ltr">
              © {new Date().getFullYear()} Riyhan Cafe. All rights reserved.
            </p>
            <p className="text-[11px] text-warm-gray/70 mt-2" dir="ltr">
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
    </>
  );
}
