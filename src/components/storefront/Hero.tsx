'use client';

import React from 'react';
import { ArrowDown, MessageCircle, Menu as MenuIcon } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 ease-out scale-105"
        style={{
          backgroundImage: "url('/hero_bg.png')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />

      {/* Decorative Blur Orbs */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Stylized RiEaN CAFE Logo */}
        <div className="animate-fade-in mb-8 flex flex-col items-center">
          <span className="text-6xl sm:text-8xl font-serif tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark font-bold drop-shadow-md">
            RiEaN
          </span>
          <div className="flex items-center gap-3 mt-3 w-full justify-center">
            <div className="h-[1px] w-12 bg-gold/40" />
            <span className="text-xs sm:text-sm tracking-[0.4em] text-gold font-light uppercase">
              CAFE
            </span>
            <div className="h-[1px] w-12 bg-gold/40" />
          </div>
        </div>

        {/* Heading */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-offwhite mb-4 animate-slide-up tracking-tight font-arabic leading-tight"
          style={{ animationDelay: '0.1s' }}
        >
          نكهات متنوعة
          <br className="sm:hidden" />
          <span className="text-gold"> تجمعنا</span>
        </h1>

        {/* Categories / Specialties list */}
        <p
          className="text-xs sm:text-sm text-gold/80 mb-8 animate-slide-up font-arabic tracking-wide font-medium max-w-lg mx-auto leading-relaxed"
          style={{ animationDelay: '0.2s' }}
        >
          وافل • كريب • بانكيك • كوكتيلات • عصائر • سلطة فواكه • قهوة
        </p>

        {/* Buttons */}
        <div 
          className="flex flex-col sm:flex-row items-center gap-4 animate-slide-up" 
          style={{ animationDelay: '0.3s' }}
        >
          <a
            href="#menu"
            className="w-48 sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold text-olive-dark font-bold rounded-full hover:bg-gold-light transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-gold/20 text-sm font-arabic cursor-pointer"
          >
            <MenuIcon size={16} />
            استكشف القائمة
          </a>
          
          <a
            href="https://wa.me/963999999999" // WhatsApp
            target="_blank"
            rel="noopener noreferrer"
            className="w-48 sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-gold text-gold hover:bg-gold/10 font-bold rounded-full transition-all duration-300 text-sm font-arabic cursor-pointer"
          >
            <MessageCircle size={16} />
            تواصل معنا
          </a>
        </div>

        {/* Mouse Scroll Down Indicator */}
        <div 
          className="absolute bottom-[-10vh] sm:bottom-[-6vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce opacity-50"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="w-5 h-8 rounded-full border-2 border-offwhite/50 flex justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-offwhite/50" />
          </div>
          <ArrowDown size={14} className="text-offwhite/50" />
        </div>

      </div>

      {/* Bottom fade to content */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
