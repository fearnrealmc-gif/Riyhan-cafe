

import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
    >
      
      <div className="absolute inset-0 bg-gradient-to-b from-olive via-olive-dark to-olive" />

      
      <div className="absolute top-20 -left-20 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            white 40px,
            white 41px
          )`,
        }}
      />

      
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto flex flex-col items-center">
        
        <div className="animate-fade-in mb-6">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-2 border-gold/30 shadow-2xl animate-pulse-slow"
          />
        </div>

        
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-offwhite mb-4 animate-slide-up tracking-tight"
          style={{ animationDelay: '0.1s' }}
        >
          ريحان
          <span className="text-gold"> كافيه</span>
        </h1>

        
        <p
          className="text-lg sm:text-xl text-gold/70 mb-6 animate-slide-up tracking-widest uppercase font-light"
          style={{ animationDelay: '0.2s' }}
        >
          Riyhan Cafe
        </p>

        
        <p
          className="text-base sm:text-lg text-offwhite/60 max-w-md mx-auto mb-10 animate-slide-up leading-relaxed font-light"
          style={{ animationDelay: '0.3s' }}
        >
          حيث تروي كل رشفة حكاية. مشروبات مُعَدّة يدويًا بعناية فائقة ومن أجود محاصيل البن المختص.
        </p>

        
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <a
            href="#menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-olive-dark font-semibold rounded-full hover:bg-gold-light transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-gold/20 text-sm tracking-wide"
          >
            استكشف قائمتنا
            <ArrowDown size={16} className="animate-bounce" />
          </a>
        </div>
      </div>

      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-offwhite to-transparent" />
    </section>
  );
}
