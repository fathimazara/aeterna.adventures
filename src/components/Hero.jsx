import React, { useState, useEffect } from 'react';

export const HERO_SLIDES = [
  {
    id: 1,
    // Kerala tea plantations - Munnar
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=2560&q=95',
    fallback: '/hero/bg-2.jpg'
  },
  {
    id: 2,
    // Kerala backwaters / Alleppey
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=2560&q=95',
    fallback: '/hero/bg-3.jpg'
  },
  {
    id: 3,
    // Ladakh mountains - dramatic landscape
    image: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=2560&q=95',
    fallback: '/hero/bg-4.jpg'
  },
  {
    id: 4,
    // Vattavada / Kerala organic valley
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2560&q=95',
    fallback: '/hero/bg-6.jpg'
  },
  {
    id: 5,
    // Bali - Uluwatu clifftop/ocean
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2560&q=95',
    fallback: '/hero/bg-1.jpg'
  },
  {
    id: 6,
    // Himalaya / Kasol mountains
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2560&q=95',
    fallback: '/hero/bg-5.jpg'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageErrorMap, setImageErrorMap] = useState({});

  // Auto-advance slideshow every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handleImageError = (slideId) => {
    setImageErrorMap((prev) => ({ ...prev, [slideId]: true }));
  };

  return (
    <section className="relative w-full min-h-[82vh] lg:min-h-[92vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-6 lg:py-10 overflow-hidden select-none">

      {/* 1. Animated Background Tourist Spot Image Slideshow Container */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#12100E]">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          const hasError = imageErrorMap[slide.id];
          const imgSrc = hasError ? slide.fallback : slide.image;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* High Clarity Animated Image with Ken Burns Zoom & Pan Effect */}
              <img
                src={imgSrc}
                alt="Travel Destination Background"
                onError={() => handleImageError(slide.id)}
                className={`w-full h-full object-cover object-center transition-transform duration-[10000ms] ease-out ${
                  isActive ? 'scale-110 translate-y-[-1.5%] translate-x-[-0.5%]' : 'scale-100'
                }`}
              />

              {/* Dynamic Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#14100E]/95 via-[#1E1E1E]/40 to-[#14100E]/60 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/50 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-[#0F0B09]/20 mix-blend-multiply" />
            </div>
          );
        })}
      </div>

      {/* Hero Central Content Banner */}
      <div className="relative z-10 max-w-5xl mx-auto text-center my-auto py-8 lg:py-14">

        {/* Brand Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-semibold uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] animate-pulse" />
          <span>Kerala's Premier Travel &amp; Resort Experts</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-extrabold text-white tracking-tight leading-none mb-5 drop-shadow-2xl">
          Aeterna
          <span className="text-[#D4A373]">.</span>
          <br className="sm:hidden" />
          <span className="font-accent italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white/90">adventures</span>
        </h1>

        {/* Universal Subheading */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/90 font-normal leading-relaxed drop-shadow-lg mb-8">
          Discover the best of <strong className="text-[#D4A373]">Kerala</strong> and beyond — curated tour packages, boutique staycations, and unforgettable travel experiences for every kind of traveler.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {/* WhatsApp CTA - Primary */}
          <a
            href="https://wa.me/918547103872?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20travel%20packages%20and%20resorts."
            target="_blank"
            rel="noopener noreferrer"
            id="hero-whatsapp-cta"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5c] text-white font-bold text-sm shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12.001 2C6.478 2 2.001 6.477 2.001 12c0 1.879.511 3.636 1.4 5.142L2.007 22l4.986-1.373A9.954 9.954 0 0 0 12.001 22C17.524 22 22 17.523 22 12S17.524 2 12.001 2zm0 18.077a8.052 8.052 0 0 1-4.539-1.392l-.325-.194-2.546.713.722-2.531-.212-.348A8.03 8.03 0 0 1 3.71 12c0-4.578 3.713-8.291 8.291-8.291 4.578 0 8.291 3.713 8.291 8.291 0 4.578-3.713 8.077-8.291 8.077zm4.82-6.047c-.257-.128-1.507-.742-1.74-.828-.234-.085-.404-.128-.574.128-.17.257-.661.828-.81.998-.149.17-.299.192-.556.064-.257-.128-1.085-.4-2.067-1.276-.764-.683-1.28-1.527-1.43-1.784-.149-.257-.016-.396.112-.524.114-.114.257-.299.385-.449.128-.149.171-.257.257-.427.085-.17.042-.32-.021-.449-.064-.128-.574-1.384-.785-1.895-.207-.498-.418-.43-.574-.438l-.49-.008c-.17 0-.447.064-.681.32-.234.257-.893.873-.893 2.129 0 1.256.914 2.47 1.042 2.641.128.17 1.795 2.74 4.35 3.842.608.263 1.082.42 1.452.537.61.194 1.165.166 1.603.1.489-.072 1.507-.616 1.72-1.213.214-.596.214-1.107.15-1.213-.064-.107-.234-.17-.49-.299z" />
            </svg>
            <span>Book via WhatsApp</span>
          </a>

          {/* Explore Packages - Secondary */}
          <button
            onClick={() => {
              const el = document.getElementById('destinations-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            id="hero-explore-btn"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-bold text-sm border border-white/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>Explore Packages</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-10 text-white/70 text-xs">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[#D4A373]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <strong className="text-white">4.97</strong> avg rating
          </span>
          <span className="w-1 h-1 rounded-full bg-white/30 hidden sm:block" />
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[#D4A373]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <strong className="text-white">500+</strong> happy travelers
          </span>
          <span className="w-1 h-1 rounded-full bg-white/30 hidden sm:block" />
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[#D4A373]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <strong className="text-white">Kerala &amp; India</strong> specialists
          </span>
        </div>
      </div>

      {/* Slide Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-500 rounded-full ${
              currentSlide === idx
                ? 'w-8 h-2 bg-[#D4A373]'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

    </section>
  );
}
