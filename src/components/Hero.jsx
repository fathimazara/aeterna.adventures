import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, Play, Pause, Eye, EyeOff } from 'lucide-react';

export const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2400&q=90',
    fallback: '/hero/bg-6.jpg'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=2400&q=90',
    fallback: '/hero/bg-2.jpg'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2400&q=90',
    fallback: '/hero/bg-1.jpg'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=2400&q=90',
    fallback: '/hero/bg-4.jpg'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=2400&q=90',
    fallback: '/hero/bg-3.jpg'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=2400&q=90',
    fallback: '/hero/bg-5.jpg'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPureClarityMode, setIsPureClarityMode] = useState(false);
  const [imageErrorMap, setImageErrorMap] = useState({});

  // Auto-advance slideshow every 5.5 seconds if playing
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleImageError = (slideId) => {
    setImageErrorMap((prev) => ({ ...prev, [slideId]: true }));
  };

  return (
    <section className="relative w-full min-h-[82vh] lg:min-h-[88vh] flex flex-col justify-between px-4 sm:px-6 lg:px-8 py-6 lg:py-10 overflow-hidden select-none">
      
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
                alt="Tourist Spot Background"
                onError={() => handleImageError(slide.id)}
                className={`w-full h-full object-cover object-center transition-transform duration-[10000ms] ease-out ${
                  isActive ? 'scale-110 translate-y-[-1.5%] translate-x-[-0.5%]' : 'scale-100'
                }`}
              />
              
              {/* Dynamic Gradient Overlays (Togglable via Pure Clarity Mode) */}
              {!isPureClarityMode && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14100E]/95 via-[#1E1E1E]/40 to-[#14100E]/60 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/50 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-[#0F0B09]/20 mix-blend-multiply" />
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Top Header Controls: Pure Clarity Toggle & Slideshow Play/Pause */}
      <div className="relative z-20 flex justify-end items-center max-w-7xl mx-auto w-full gap-3 pt-1">
        <div className="flex items-center gap-2">
          {/* Pure Clarity Mode Toggle */}
          <button
            onClick={() => setIsPureClarityMode(!isPureClarityMode)}
            title={isPureClarityMode ? "Restore overlay contrast" : "Toggle Full High-Clarity Photo View"}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all shadow-lg border backdrop-blur-md ${
              isPureClarityMode
                ? 'bg-[#E6AF2E] text-black border-[#E6AF2E] font-bold shadow-amber-500/20'
                : 'bg-black/40 text-white/90 border-white/20 hover:bg-black/60 hover:border-white/40'
            }`}
          >
            {isPureClarityMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-[#E6AF2E]" />}
            <span>{isPureClarityMode ? 'Contrast Mode' : 'HD Clarity View'}</span>
          </button>

          {/* Slideshow Play / Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Pause background slideshow" : "Play background slideshow"}
            className="p-2 rounded-full bg-black/40 text-white/90 border border-white/20 hover:bg-black/60 hover:border-white/40 backdrop-blur-md transition-all"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#E6AF2E]" />}
          </button>
        </div>
      </div>

      {/* Hero Central Content Banner */}
      <div className={`relative z-10 max-w-5xl mx-auto text-center my-auto py-8 lg:py-14 transition-opacity duration-500 ${
        isPureClarityMode ? 'opacity-30 hover:opacity-100' : 'opacity-100'
      }`}>
        
        {/* Curated Sub-badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel text-xs sm:text-sm font-medium text-white/95 mb-5 tracking-wide border border-white/20 shadow-xl backdrop-blur-md hover:border-[#E6AF2E]/50 transition-all animate-float">
          <img src="/logo.jpg" alt="Aeterna Logo" className="w-6 h-6 rounded-full object-cover border border-[#E6AF2E]" />
          <span>Curated Boutique Stays & Nomadic Expeditions</span>
          <Sparkles className="w-3.5 h-3.5 text-[#E6AF2E]" />
        </div>

        {/* Headline */}
        <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tight leading-none mb-4 drop-shadow-2xl">
          Travel
        </h1>

        {/* Universal Subheading */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/95 font-normal leading-relaxed drop-shadow-lg transition-all duration-500">
          Travel with intention. Discover retreats, active adventures, and boutique stays all in one place.
        </p>

      </div>

      {/* Bottom Controls Bar: Left/Right Arrows + Dot Slide Indicators + Progress Bar */}
      <div className="relative z-20 max-w-7xl mx-auto w-full pt-2">
        
        <div className="flex items-center justify-between gap-4 py-2">
          
          {/* Arrow Navigation (Left) */}
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md transition-all shadow-lg flex items-center justify-center"
            title="Previous Picture"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Clean Dot Indicators */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/40 border border-white/15 backdrop-blur-md">
            {HERO_SLIDES.map((slide, idx) => {
              const isSelected = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  title={`Slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    isSelected
                      ? 'w-8 bg-[#E6AF2E] shadow-sm shadow-amber-500/50'
                      : 'w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                />
              );
            })}
          </div>

          {/* Arrow Navigation (Right) */}
          <button
            onClick={handleNext}
            className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md transition-all shadow-lg flex items-center justify-center"
            title="Next Picture"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* Animated Slide Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-2 backdrop-blur-sm">
          <div
            key={currentSlide}
            className="h-full bg-gradient-to-r from-[#E6AF2E] to-amber-300 transition-all duration-[5500ms] ease-linear"
            style={{ width: isPlaying ? '100%' : '0%' }}
          />
        </div>

      </div>

    </section>
  );
}



