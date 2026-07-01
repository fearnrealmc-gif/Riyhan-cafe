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
        
        {/* Circular Logo Emblem (without background) */}
        <div className="animate-fade-in mb-8">
          <img
            src="https://ik.imagekit.io/b4fz27u6x/1.png"
            alt="Rayhan CAFE"
            className="w-52 h-52 sm:w-64 sm:h-64 rounded-full object-cover drop-shadow-2xl filter brightness-105 hover:scale-105 transition-transform duration-500"
          />
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
          className="flex flex-row items-center justify-center gap-2.5 w-full max-w-[340px] sm:max-w-none px-4 sm:px-0 animate-slide-up" 
          style={{ animationDelay: '0.3s' }}
        >
          <a
            href="#menu"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-gold text-olive-dark font-bold rounded-full hover:bg-gold-light transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-gold/20 text-xs sm:text-sm font-arabic cursor-pointer whitespace-nowrap"
          >
            <MenuIcon size={14} className="sm:w-4 sm:h-4" />
            استكشف القائمة
          </a>
          
          <a
            href="https://wa.me/963999999999" // WhatsApp
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-3 border-2 border-gold text-gold hover:bg-gold/10 font-bold rounded-full transition-all duration-300 text-xs sm:text-sm font-arabic cursor-pointer whitespace-nowrap"
          >
            <MessageCircle size={14} className="sm:w-4 sm:h-4" />
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
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-offwhite dark:from-black to-transparent" />
    </section>
  );
}
