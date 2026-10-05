import React, { useState } from 'react';
import { Compass, Star, ChevronLeft, ChevronRight, ArrowUpRight, ShieldCheck, Users } from 'lucide-react';
import { VALUE_GALLERY_CARDS } from '../data/tripsData';

export default function SocialProofAndValue({ onBookSeatClick }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? VALUE_GALLERY_CARDS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === VALUE_GALLERY_CARDS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="our-value-section" className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#F9F8F6]">
      
      {/* 1. Centered Trust Badges & Social Proof Bar */}
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-12 py-4 px-6 rounded-full bg-white/70 border border-[#2B231F]/10 shadow-sm backdrop-blur-sm mb-20">
        
        {/* Melali Partner Badge */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#D4A373]/20 flex items-center justify-center text-[#D4A373]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="font-semibold text-sm text-[#2B231F]">We are Melali</span>
        </div>

        <div className="h-4 w-[1px] bg-[#2B231F]/15 hidden sm:block" />

        {/* Rating Badge */}
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-[#D4A373] fill-[#D4A373]" />
          <span className="font-bold text-sm text-[#2B231F]">5K+ People Satisfied</span>
        </div>

        <div className="h-4 w-[1px] bg-[#2B231F]/15 hidden sm:block" />

        {/* User Avatars Stack */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="Traveler avatar"
              className="w-8 h-8 rounded-full border-2 border-white object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
              alt="Traveler avatar"
              className="w-8 h-8 rounded-full border-2 border-white object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80"
              alt="Traveler avatar"
              className="w-8 h-8 rounded-full border-2 border-white object-cover"
            />
            <div className="w-8 h-8 rounded-full border-2 border-white bg-[#1E1E1E] text-white font-bold text-xs flex items-center justify-center">
              +3
            </div>
          </div>
        </div>

      </div>


      {/* 2. Core Value Statement Header */}
      <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-24">
        <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#2B231F] leading-tight">
          Aeterna.adventures means <br className="hidden sm:block" />
          <span className="relative inline-block font-accent italic font-normal text-5xl sm:text-6xl md:text-7xl text-[#2B231F] ml-2">
            Going Places
            {/* Soft subtle accent circle or blur behind */}
            <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#D4A373]/50 rounded-full" />
          </span>
        </h2>

        {/* Accent logo emblem & dotted vector connection below headline */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="w-16 sm:w-24 h-[1px] border-b border-dashed border-[#2B231F]/30" />
          <img 
            src="/logo.jpg" 
            alt="Aeterna Emblem" 
            className="w-10 h-10 rounded-full object-cover border-2 border-[#D4A373] shadow-lg animate-float"
          />
          <div className="w-16 sm:w-24 h-[1px] border-b border-dashed border-[#2B231F]/30" />
        </div>
      </div>


      {/* 3. Value Proposition Layout (2-Column Asymmetric) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6 pr-0 lg:pr-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E1E1E]/5 border border-[#2B231F]/10 text-xs font-bold text-[#2B231F] tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2B231F]" />
            <span>• 01 Our Value</span>
          </div>

          <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2B231F] leading-tight">
            Not Your Boring Travel Agent
          </h3>

          <p className="text-base sm:text-lg text-[#6E6660] font-normal leading-relaxed">
            We plan chill, curated trips with good vibes and better people. No rigid tour buses or rushed schedules—just authentic boutique stays, off-grid glamping, and memorable local stories.
          </p>

          <div className="pt-2">
            <button
              onClick={onBookSeatClick}
              className="inline-flex items-center gap-3 bg-[#1E1E1E] text-white hover:bg-[#D4A373] hover:text-[#1E1E1E] font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg group font-heading"
            >
              <span>Book a Seat</span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Stacked Image Cards Gallery (7 cols) */}
        <div className="lg:col-span-7 relative">
          <div className="relative min-h-[420px] sm:min-h-[460px] flex items-center justify-center">
            
            {/* Render 3 Stacked Cards with dynamic visual depth */}
            {VALUE_GALLERY_CARDS.map((card, idx) => {
              // calculate offset relative to active index
              const offset = (idx - activeIndex + VALUE_GALLERY_CARDS.length) % VALUE_GALLERY_CARDS.length;
              
              let zIndex = 30 - offset * 10;
              let scale = 1 - offset * 0.08;
              let translateX = offset * 45; // slight cascade horizontally
              let opacity = 1 - offset * 0.25;

              return (
                <div
                  key={card.id}
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    zIndex,
                    transform: `translateX(${translateX}px) scale(${scale})`,
                    opacity
                  }}
                  className="absolute left-0 right-12 sm:right-24 top-0 transition-all duration-500 ease-out cursor-pointer group"
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Bottom gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Top status tag */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#2B231F]">
                      {card.tag}
                    </div>

                    {/* Bottom card info overlay */}
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h4 className="font-heading font-bold text-xl sm:text-2xl drop-shadow-md">
                        {card.title}
                      </h4>
                      <p className="text-sm text-white/80 font-medium">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>

          {/* Carousel Controls: ← Prev / Next → */}
          <div className="flex items-center justify-end gap-3 mt-6 pr-6">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 px-4 py-2 rounded-full bg-white border border-[#2B231F]/15 text-[#2B231F] font-semibold text-xs sm:text-sm hover:bg-[#1E1E1E] hover:text-white transition-all shadow-sm"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-4 py-2 rounded-full bg-white border border-[#2B231F]/15 text-[#2B231F] font-semibold text-xs sm:text-sm hover:bg-[#1E1E1E] hover:text-white transition-all shadow-sm"
              aria-label="Next card"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}
