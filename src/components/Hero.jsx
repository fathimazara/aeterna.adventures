import React, { useState, useEffect } from 'react';
import { MapPin, Sparkles, ChevronLeft, ChevronRight, Play, Pause, Eye, EyeOff, Compass, ArrowRight } from 'lucide-react';

export const HERO_SLIDES = [
  {
    id: 'vattavada-kerala',
    title: 'Vattavada Misty Valleys',
    sub: 'Organic Terraced Farms & Eucalyptus Ridge Glades',
    location: 'Vattavada, Idukki, Kerala',
    region: 'Kerala, India',
    tag: 'Offbeat Nature',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2400&q=90',
    fallback: '/hero/bg-6.jpg',
    tripId: 'vattavada-kerala'
  },
  {
    id: 'munnar-kerala',
    title: 'Munnar Emerald Tea Estates',
    sub: 'Rolling Plantation Hills & Misty Peak Glades',
    location: 'Munnar, Western Ghats, Kerala',
    region: 'Kerala, India',
    tag: 'Tea Plantations',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=2400&q=90',
    fallback: '/hero/bg-2.jpg',
    tripId: 'munnar-kerala'
  },
  {
    id: 'kasol-himachal',
    title: 'Kasol & Parvati River Valley',
    sub: 'Roaring Glacial Streams & Pine Forest Canopy',
    location: 'Kasol, Himachal Pradesh',
    region: 'Himachal, India',
    tag: 'Alpine Wilderness',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2400&q=90',
    fallback: '/hero/bg-1.jpg',
    tripId: 'kasol-himachal'
  },
  {
    id: 'spiti-himachal',
    title: 'Spiti Valley Cold Desert',
    sub: 'High-Altitude Monasteries & Stark Mountain Ridges',
    location: 'Spiti Valley, Himachal Pradesh',
    region: 'Himachal, India',
    tag: 'Himalayan Expedition',
    image: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=2400&q=90',
    fallback: '/hero/bg-4.jpg',
    tripId: 'spiti-himachal'
  },
  {
    id: 'alleppey-kerala',
    title: 'Alleppey Palm Waterways',
    sub: 'Emerald Lagoon Backwaters & Sunset Houseboats',
    location: 'Alappuzha, Kerala',
    region: 'Kerala, India',
    tag: 'Serene Waters',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=2400&q=90',
    fallback: '/hero/bg-3.jpg',
    tripId: 'alleppey-kerala'
  },
  {
    id: 'ladakh-pangong',
    title: 'Pangong High Alpine Lake',
    sub: 'Changing Turquoise Waters & Stark Snow Peaks',
    location: 'Leh Ladakh, Jammu & Kashmir',
    region: 'Ladakh, India',
    tag: 'Sacred Lake',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=2400&q=90',
    fallback: '/hero/bg-5.jpg',
    tripId: 'ladakh-pangong'
  }
];

export default function Hero({ onSelectTrip }) {
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

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full min-h-[82vh] lg:min-h-[88vh] flex flex-col justify-between px-4 sm:px-6 lg:px-8 py-6 lg:py-10 overflow-hidden select-none">
      
      {/* 1. Animated Background Image Slideshow Container */}
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
                alt={slide.title}
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

      {/* Top Header Controls / Slide Info & High Clarity Toggle */}
      <div className="relative z-20 flex flex-wrap justify-between items-center max-w-7xl mx-auto w-full gap-3 pt-1">
        
        {/* Active Location & Destination Tag Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel text-xs sm:text-sm font-medium text-white tracking-wide border border-white/20 shadow-2xl backdrop-blur-md transition-all duration-300">
          <MapPin className="w-4 h-4 text-[#E6AF2E] animate-bounce" />
          <span className="font-bold text-[#E6AF2E]">{activeSlide.location}</span>
          <span className="text-white/40">•</span>
          <span className="text-white/90 font-medium hidden sm:inline">{activeSlide.region}</span>
          <span className="px-2 py-0.5 rounded-full bg-[#E6AF2E]/20 text-[#E6AF2E] text-[10px] uppercase font-bold tracking-wider border border-[#E6AF2E]/30 ml-1">
            {activeSlide.tag}
          </span>
        </div>

        {/* Action Toolbar: Pure Clarity Toggle & Slideshow Play/Pause */}
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
          <span>Boutique Indian Nature Expeditions & Misty Hill Escapes</span>
          <Sparkles className="w-3.5 h-3.5 text-[#E6AF2E]" />
        </div>

        {/* Headline */}
        <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tight leading-none mb-4 drop-shadow-2xl">
          Travel
        </h1>

        {/* Dynamic Destination Subheading featuring current slide */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/95 font-normal leading-relaxed drop-shadow-lg transition-all duration-500 mb-6">
          Travel with intention. Explore the serene beauty of <span className="text-[#E6AF2E] font-semibold">{activeSlide.title}</span>, pristine tea gardens, and offbeat Himalayan trails.
        </p>

        {/* Featured View Details Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-xl bg-black/50 border border-white/15 backdrop-blur-md text-xs sm:text-sm text-white/90 shadow-2xl">
          <span className="text-[#E6AF2E] font-bold flex items-center gap-1.5">
            <Compass className="w-4 h-4" /> Featured Scene:
          </span>
          <span className="font-medium text-white">{activeSlide.sub}</span>
          
          {onSelectTrip && (
            <button
              onClick={() => onSelectTrip(activeSlide.tripId || activeSlide.id)}
              className="ml-2 px-3 py-1 rounded-lg bg-[#E6AF2E] text-black font-bold text-xs hover:bg-amber-400 transition-colors flex items-center gap-1 shadow-md"
            >
              <span>Explore Destination</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Controls Bar: Left/Right Arrows + Destination Selector Pills + Progress Bar */}
      <div className="relative z-20 max-w-7xl mx-auto w-full pt-2">
        
        {/* Destination Quick Selector Pills (Vattavada, Munnar, Kasol, Spiti, Alleppey, Ladakh) */}
        <div className="flex items-center justify-center sm:justify-between gap-2 overflow-x-auto py-2 scrollbar-none">
          
          {/* Arrow Navigation (Left) */}
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md transition-all shadow-lg hidden sm:flex items-center justify-center"
            title="Previous Picture"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Quick Filter Selector Chips */}
          <div className="flex items-center gap-2 overflow-x-auto px-2 py-1 scrollbar-none">
            {HERO_SLIDES.map((slide, idx) => {
              const isSelected = idx === currentSlide;
              const shortName = slide.title.split(' ')[0]; // E.g., Vattavada, Munnar, Kasol
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 border whitespace-nowrap shadow-md backdrop-blur-md ${
                    isSelected
                      ? 'bg-[#E6AF2E] text-black border-[#E6AF2E] scale-105 shadow-amber-500/20'
                      : 'bg-black/40 text-white/80 border-white/20 hover:bg-black/60 hover:text-white'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-black animate-ping' : 'bg-white/50'}`} />
                  <span>{shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Arrow Navigation (Right) */}
          <button
            onClick={handleNext}
            className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md transition-all shadow-lg hidden sm:flex items-center justify-center"
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


