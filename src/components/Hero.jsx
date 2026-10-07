import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Sparkles } from 'lucide-react';

export const HERO_SLIDES = [
  {
    id: 1,
    title: 'Misty Eco Cottage & Valley Retreat',
    location: 'Vattavada, Kerala',
    image: '/hero/custom-bg-1.jpg',
    fallback: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2560&q=95'
  },
  {
    id: 2,
    title: 'Parvati River & Alpine Pine Forest',
    location: 'Kasol, Himachal Pradesh',
    image: '/hero/custom-bg-2.jpg',
    fallback: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2560&q=95'
  },
  {
    id: 3,
    title: 'Emerald Plantation & Mountain Trail',
    location: 'Munnar & Western Ghats',
    image: '/hero/custom-bg-3.jpg',
    fallback: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=2560&q=95'
  },
  {
    id: 4,
    title: 'Mountain Stream & Wild Cascade Valley',
    location: 'Wayanad, Kerala',
    image: '/hero/custom-bg-4.jpg',
    fallback: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=2560&q=95'
  },
  {
    id: 5,
    title: 'Serene Palm Backwaters Sunset',
    location: 'Alleppey & Kumarakom, Kerala',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=2560&q=95',
    fallback: '/hero/bg-3.jpg'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageErrorMap, setImageErrorMap] = useState({});
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slideshow every 6.5s
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleImageError = (slideId) => {
    setImageErrorMap((prev) => ({ ...prev, [slideId]: true }));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const activeSlideData = HERO_SLIDES[currentSlide];

  return (
    <section 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-12 overflow-hidden select-none bg-[#090807]"
    >

      {/* Invisible Image Preloader for instant smooth slide switching & zero latency performance */}
      <div className="hidden">
        {HERO_SLIDES.map((slide) => (
          <img key={slide.id} src={slide.image} alt="preload" />
        ))}
      </div>

      {/* 1. Ultra HD GPU-Accelerated Background Slideshow Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          const hasError = imageErrorMap[slide.id];
          const imgSrc = hasError ? slide.fallback : slide.image;

          return (
            <div
              key={slide.id}
              style={{
                willChange: 'opacity, transform',
                transform: 'translateZ(0)'
              }}
              className={`absolute inset-0 transition-opacity duration-1200 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Ultra HD 4K Sharp Image with GPU Ken Burns Smooth Pan/Zoom Effect */}
              <img
                src={imgSrc}
                alt={slide.title}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchpriority={isActive ? 'high' : 'low'}
                onError={() => handleImageError(slide.id)}
                style={{
                  filter: 'contrast(1.05) brightness(1.03) saturate(1.10)',
                  willChange: 'transform'
                }}
                className={`w-full h-full object-cover object-center transition-transform duration-[8500ms] cubic-bezier(0.25, 1, 0.5, 1) ${
                  isActive ? 'scale-110 translate-y-[-1%]' : 'scale-100'
                }`}
              />

              {/* Balanced Classic Vignette Overlay for Crisp White Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09]/90 via-[#0C0A09]/35 to-[#0C0A09]/55 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0C0A09]/65 via-transparent to-[#0C0A09]/55 transition-opacity duration-700" />
            </div>
          );
        })}
      </div>

      {/* Floating Active Location Badge (Top Right) */}
      <div className="absolute top-6 right-6 z-20 hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white/95 text-xs font-semibold shadow-lg">
        <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
        <span>{activeSlideData.location}</span>
      </div>

      {/* Hero Central Content Banner */}
      <div className="relative z-10 max-w-5xl mx-auto text-center my-auto py-8 lg:py-14">

        {/* Brand Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/95 text-xs font-bold uppercase tracking-widest mb-6 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
          <span>Kerala's Premier Travel &amp; Resort Experts</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-extrabold text-white tracking-tight leading-none mb-5 drop-shadow-2xl">
          Aeterna
          <span className="text-[#D4A373]">.</span>
          <br className="sm:hidden" />
          <span className="font-accent italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white/95 ml-2">adventures</span>
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/90 font-normal leading-relaxed drop-shadow-lg mb-8">
          Discover the best of <strong className="text-[#D4A373] font-bold">Kerala</strong> and beyond — curated tour packages, boutique staycations, and unforgettable travel experiences for every traveler.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/918547103872?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20travel%20packages%20and%20resorts."
            target="_blank"
            rel="noopener noreferrer"
            id="hero-whatsapp-cta"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5c] text-white font-bold text-sm shadow-2xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12.001 2C6.478 2 2.001 6.477 2.001 12c0 1.879.511 3.636 1.4 5.142L2.007 22l4.986-1.373A9.954 9.954 0 0 0 12.001 22C17.524 22 22 17.523 22 12S17.524 2 12.001 2zm0 18.077a8.052 8.052 0 0 1-4.539-1.392l-.325-.194-2.546.713.722-2.531-.212-.348A8.03 8.03 0 0 1 3.71 12c0-4.578 3.713-8.291 8.291-8.291 4.578 0 8.291 3.713 8.291 8.291 0 4.578-3.713 8.077-8.291 8.077zm4.82-6.047c-.257-.128-1.507-.742-1.74-.828-.234-.085-.404-.128-.574.128-.17.257-.661.828-.81.998-.149.17-.299.192-.556.064-.257-.128-1.085-.4-2.067-1.276-.764-.683-1.28-1.527-1.43-1.784-.149-.257-.016-.396.112-.524.114-.114.257-.299.385-.449.128-.149.171-.257.257-.427.085-.17.042-.32-.021-.449-.064-.128-.574-1.384-.785-1.895-.207-.498-.418-.43-.574-.438l-.49-.008c-.17 0-.447.064-.681.32-.234.257-.893.873-.893 2.129 0 1.256.914 2.47 1.042 2.641.128.17 1.795 2.74 4.35 3.842.608.263 1.082.42 1.452.537.61.194 1.165.166 1.603.1.489-.072 1.507-.616 1.72-1.213.214-.596.214-1.107.15-1.213-.064-.107-.234-.17-.49-.299z" />
            </svg>
            <span>Book via WhatsApp</span>
          </a>

          {/* Explore Packages Button */}
          <button
            onClick={() => {
              const el = document.getElementById('destinations-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-sm border border-white/25 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Explore Packages</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

      </div>

      {/* Manual Slide Chevron Controls (Left / Right) */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/35 hover:bg-black/65 text-white/80 hover:text-white backdrop-blur-md border border-white/20 transition-all opacity-80 hover:opacity-100 hidden sm:flex items-center justify-center cursor-pointer shadow-lg"
        aria-label="Previous Background Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/35 hover:bg-black/65 text-white/80 hover:text-white backdrop-blur-md border border-white/20 transition-all opacity-80 hover:opacity-100 hidden sm:flex items-center justify-center cursor-pointer shadow-lg"
        aria-label="Next Background Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

    </section>
  );
}
