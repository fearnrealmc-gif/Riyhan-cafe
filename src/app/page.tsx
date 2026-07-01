import { createServerSupabaseClient } from '@/lib/supabase/server';
import Navbar from '@/components/storefront/Navbar';
import Hero from '@/components/storefront/Hero';
import MenuSection from '@/components/storefront/MenuSection';
import type { Product } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  let products: Product[] = [];
  let bannerSettings = {
    title: "خدمة توصيل سريعة",
    description: "نصلك أينما كنت",
    button_text: "اطلب الآن",
    button_link: "https://wa.me/963984858449",
    image_url: "/delivery_bag.png"
  };

  try {
    const supabase = createServerSupabaseClient();
    
    // Fetch products
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('*')
      .order('category', { ascending: true })
      .order('name_en', { ascending: true });

    if (!productsError && productsData) {
      products = productsData as Product[];
    }

    // Fetch banner settings
    const { data: settingsData, error: settingsError } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'promo_banner')
      .single();

    if (!settingsError && settingsData?.value) {
      bannerSettings = settingsData.value as typeof bannerSettings;
    }
  } catch (err) {
    console.error("Failed to fetch homepage data:", err);
  }

  return (
    <div className="min-h-screen flex flex-col bg-offwhite dark:bg-black text-charcoal dark:text-offwhite transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        
        <Hero />

        {/* Menu Section (includes Categories, Promo Banner, and Products) */}
        <section id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <MenuSection products={products} bannerSettings={bannerSettings} />
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
                Rayhan CAFE
              </span>
            </div>
            {/* Address */}
            <div className="flex items-center justify-center gap-1.5 mb-4 text-xs text-charcoal/80 dark:text-offwhite/85 font-arabic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-gold shrink-0">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>إدلب - كفرسجنة — غرب الدوار بـ 200 متر</span>
            </div>
            <p className="text-xs text-warm-gray" dir="ltr">
              © {new Date().getFullYear()} Rayhan CAFE. All rights reserved.
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
