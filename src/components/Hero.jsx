import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, DollarSign, Activity, ChevronDown, ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    image: '/hero/bg-1.jpg',
    title: 'Misty Alpine Forests',
    sub: 'Pine Valleys & Misty Ridge Glades',
    location: 'Great Himalayan Ridges'
  },
  {
    id: 2,
    image: '/hero/bg-2.jpg',
    title: 'Alpine River Canyon',
    sub: 'Glacial Waters & Pine Highlands',
    location: 'Parvati River Valley'
  },
  {
    id: 3,
    image: '/hero/bg-3.jpg',
    title: 'Enchanted Forest Trails',
    sub: 'Off-grid Mountain Passes & Wilderness Hikes',
    location: 'Tian Shan Expedition Trail'
  },
  {
    id: 4,
    image: '/hero/bg-4.jpg',
    title: 'Sacred Waterfalls & Streams',
    sub: 'Cascading Mountain Waters & Eco Yurts',
    location: 'Sacred Valley Streams'
  }
];

export default function Hero({ onFilterSubmit }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const [activity, setActivity] = useState('Yoga / Surf / Cycling');
  const [location, setLocation] = useState('Kazakhstan');
  const [duration, setDuration] = useState('Anytime / 3 days');
  const [budget, setBudget] = useState(3500);

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handleExplore = (e) => {
    e.preventDefault();
    onFilterSubmit({
      activity: activity.split('/')[0].trim(),
      location: location === 'Any Location' ? '' : location,
      duration,
      budget
    });
    
    // Smooth scroll down to destinations section
    const destSection = document.getElementById('destinations-section');
    if (destSection) {
      destSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[88vh] lg:min-h-[92vh] flex flex-col justify-between px-4 sm:px-6 lg:px-8 py-8 lg:py-12 overflow-hidden select-none">
      
      {/* 1. Animated Background Image Slideshow Container */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#1E1E1E]">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover object-center transition-transform duration-[8000ms] ease-out ${
                  isActive ? 'scale-110 translate-y-[-1%]' : 'scale-100'
                }`}
              />
              
              {/* Rich visual gradient overlays for contrast & legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#14100E]/90 via-[#1E1E1E]/30 to-[#14100E]/50" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/40" />
            </div>
          );
        })}
      </div>

      {/* Top Bar / Slide Info Badge Overlay */}
      <div className="relative z-20 flex justify-between items-center max-w-7xl mx-auto w-full pt-2">
        
        {/* Active Location & Expedition Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel text-xs sm:text-sm font-medium text-white/95 tracking-wide border border-white/20 shadow-xl backdrop-blur-md">
          <MapPin className="w-4 h-4 text-[#D4A373] animate-pulse" />
          <span className="font-semibold text-[#D4A373]">{HERO_SLIDES[currentSlide].location}</span>
          <span className="text-white/40">•</span>
          <span className="text-white/80 hidden sm:inline">{HERO_SLIDES[currentSlide].title}</span>
        </div>

        {/* Slideshow Interactive Control Widget */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-white/20 shadow-xl backdrop-blur-md text-white text-xs sm:text-sm">
          {/* Active slide counter */}
          <span className="font-bold tracking-wider text-[#D4A373]">
            0{currentSlide + 1} <span className="text-white/40 font-normal">/ 0{HERO_SLIDES.length}</span>
          </span>

          <div className="h-3.5 w-[1px] bg-white/20" />

          {/* Slide dots */}
          <div className="flex items-center gap-1.5">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === currentSlide
                    ? 'w-6 bg-[#D4A373]'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="h-3.5 w-[1px] bg-white/20" />

          {/* Prev / Play-Pause / Next Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevSlide}
              className="p-1 rounded-full hover:bg-white/20 transition-colors text-white/90 hover:text-white"
              aria-label="Previous background photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 rounded-full hover:bg-white/20 transition-colors text-[#D4A373]"
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-[#D4A373]" />}
            </button>

            <button
              onClick={handleNextSlide}
              className="p-1 rounded-full hover:bg-white/20 transition-colors text-white/90 hover:text-white"
              aria-label="Next background photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Hero Central Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center mt-10 mb-12 lg:mt-16 lg:mb-20">
        
        {/* Sub-badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel text-xs sm:text-sm font-medium text-white/95 mb-6 tracking-wide border border-white/20 shadow-lg hover:border-[#D4A373]/50 transition-all animate-float">
          <img src="/logo.jpg" alt="Aeterna Logo" className="w-6 h-6 rounded-full object-cover border border-[#D4A373]" />
          <span>Curated Boutique Stays & Nomadic Expeditions</span>
          <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
        </div>

        {/* Display Headline */}
        <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tight leading-none mb-6 drop-shadow-2xl">
          Travel
        </h1>

        {/* Animated Subheading featuring active slide story */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/95 font-normal leading-relaxed drop-shadow-lg transition-all duration-500">
          Travel with intention. Discover retreats, active adventures, and boutique stays all in one place.
        </p>

        {/* Active background photo caption indicator */}
        <div className="mt-4 inline-block px-3 py-1 rounded-md bg-black/40 border border-white/10 backdrop-blur-sm text-xs font-medium text-white/80">
          <span className="text-[#D4A373] font-semibold">Featured View:</span> {HERO_SLIDES[currentSlide].sub}
        </div>
      </div>

      {/* Embedded Search Filter Bar - Bottom Overlay */}
      <div className="relative z-20 max-w-6xl mx-auto w-full mb-4">
        {/* Progress bar line above search bar showing slideshow timer */}
        {isPlaying && (
          <div className="w-full h-1 bg-white/20 rounded-full mb-2 overflow-hidden max-w-6xl mx-auto">
            <div key={currentSlide} className="h-full bg-[#D4A373] animate-progress-line" />
          </div>
        )}

        <form 
          onSubmit={handleExplore} 
          className="glass-panel rounded-3xl p-3 sm:p-4 border border-white/25 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-white/40"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-2 items-center">
            
            {/* Column 1: Activity / Goal */}
            <div className="relative group p-3 rounded-2xl hover:bg-white/10 transition-colors">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1">
                Activity / Goal
              </label>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#D4A373] shrink-0" />
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="w-full bg-transparent text-white font-semibold text-sm sm:text-base focus:outline-none cursor-pointer border-none p-0 appearance-none pr-6 font-sans"
                >
                  <option value="Yoga / Surf / Cycling" className="text-black">Yoga / Surf / Cycling</option>
                  <option value="Yoga Retreats" className="text-black">Yoga & Wellness</option>
                  <option value="Surf & Beach" className="text-black">Surf & Cliffside</option>
                  <option value="Glamping" className="text-black">Yurt & Glamping</option>
                  <option value="Trekking" className="text-black">Mountain Trekking</option>
                  <option value="Cultural" className="text-black">Cultural Heritage</option>
                </select>
                <ChevronDown className="w-4 h-4 text-white/60 absolute right-3 pointer-events-none" />
              </div>
            </div>

            {/* Column 2: Location */}
            <div className="relative group p-3 rounded-2xl hover:bg-white/10 transition-colors border-t sm:border-t-0 sm:border-l border-white/15">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1">
                Location
              </label>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4A373] shrink-0" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent text-white font-semibold text-sm sm:text-base focus:outline-none cursor-pointer border-none p-0 appearance-none pr-6"
                >
                  <option value="Kazakhstan" className="text-black">Kazakhstan</option>
                  <option value="Bali" className="text-black">Bali, Indonesia</option>
                  <option value="Sumba" className="text-black">Sumba Island</option>
                  <option value="Sumatra" className="text-black">Sumatra</option>
                  <option value="Peru" className="text-black">Peru</option>
                  <option value="Any Location" className="text-black">All Destinations</option>
                </select>
                <ChevronDown className="w-4 h-4 text-white/60 absolute right-3 pointer-events-none" />
              </div>
            </div>

            {/* Column 3: Date / Duration */}
            <div className="relative group p-3 rounded-2xl hover:bg-white/10 transition-colors border-t lg:border-t-0 lg:border-l border-white/15">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1">
                Date / Duration
              </label>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D4A373] shrink-0" />
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-transparent text-white font-semibold text-sm sm:text-base focus:outline-none cursor-pointer border-none p-0 appearance-none pr-6"
                >
                  <option value="Anytime / 3 days" className="text-black">Anytime / 3 days</option>
                  <option value="3-5 days" className="text-black">3 - 5 days</option>
                  <option value="1 week" className="text-black">7+ days expedition</option>
                  <option value="Weekend getaway" className="text-black">Weekend Getaway</option>
                </select>
                <ChevronDown className="w-4 h-4 text-white/60 absolute right-3 pointer-events-none" />
              </div>
            </div>

            {/* Column 4: Budget & Explore CTA */}
            <div className="flex items-center gap-3 border-t lg:border-t-0 lg:border-l border-white/15 p-2 sm:p-3">
              <div className="w-full">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white/70">Budget</span>
                  <span className="text-xs font-bold text-[#D4A373]">${budget.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#D4A373] shrink-0" />
                  <input
                    type="range"
                    min="200"
                    max="7000"
                    step="100"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full accent-[#D4A373] cursor-pointer h-1.5 bg-white/30 rounded-lg"
                  />
                </div>
              </div>

              {/* Action Button: High contrast pill labeled "Explore" */}
              <button
                type="submit"
                className="shrink-0 bg-white text-[#1E1E1E] hover:bg-[#D4A373] hover:text-white font-bold py-3.5 px-8 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2 font-heading"
              >
                <span>Explore</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
}
