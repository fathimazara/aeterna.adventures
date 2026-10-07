import React, { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Compass, ArrowDown, Globe, Calendar } from 'lucide-react';

const HERO_SLIDES = [
  {
    src: '/hero/hd-valley.jpg',
    alt: 'Parvati Valley Panorama'
  },
  {
    src: '/hero/hd-misty.jpg',
    alt: 'Misty Himalayan Village'
  },
  {
    src: '/hero/hd-trail.jpg',
    alt: 'Himalayan Trekking Trail'
  },
  {
    src: '/hero/hd-stream.jpg',
    alt: 'Mountain Stream Kheerganga'
  }
];

export default function TravelHero({ onExploreClick, onBookClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();

  // Scroll Parallax transformations
  const yBg = useTransform(scrollY, [0, 800], [0, 250]);
  const scaleBg = useTransform(scrollY, [0, 800], [1.15, 1.0]);
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0.2]);
  const textY = useTransform(scrollY, [0, 600], [0, 100]);

  // Auto-advance slideshow every 6 seconds
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Floating atmospheric cloud animation variants
  const cloudVariants = {
    animate1: {
      x: [0, 40, 0],
      y: [0, -15, 0],
      transition: { duration: 18, repeat: Infinity, ease: 'easeInOut' }
    },
    animate2: {
      x: [0, -50, 0],
      y: [0, 20, 0],
      transition: { duration: 22, repeat: Infinity, ease: 'easeInOut' }
    }
  };

  return (
    <section id="hero-section" className="relative w-full h-screen flex items-center justify-center overflow-hidden select-none bg-[#090807]">
      
      {/* 1. Full Viewport Parallax Background Slideshow */}
      <motion.div 
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 z-0 origin-center"
      >
        {/* Crossfade Slideshow Images */}
        <AnimatePresence mode="sync">
          <motion.img
            key={currentSlide}
            src={HERO_SLIDES[currentSlide].src}
            alt={HERO_SLIDES[currentSlide].alt}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.5, ease: 'easeInOut' }, scale: { duration: 6, ease: 'easeOut' } }}
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[1.04] contrast-[1.08] saturate-[1.1]"
          />
        </AnimatePresence>

        {/* Dark Cinematic Gradient Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090807] via-[#090807]/40 to-[#090807]/70 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090807]/70 via-transparent to-[#090807]/70 z-10" />
        <div className="absolute inset-0 bg-black/15 mix-blend-multiply z-10" />
      </motion.div>

      {/* 2. Floating Atmospheric Clouds / Soft Particles */}
      <div className="absolute inset-0 z-[11] pointer-events-none overflow-hidden opacity-35">
        {/* Cloud 1 */}
        <motion.div 
          variants={cloudVariants}
          animate="animate1"
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-white/10 blur-3xl"
        />
        {/* Cloud 2 */}
        <motion.div 
          variants={cloudVariants}
          animate="animate2"
          className="absolute bottom-1/3 -right-20 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-3xl"
        />
      </div>

      {/* 3. Hero Content Container */}
      <motion.div 
        style={{ opacity: opacityHero, y: textY }}
        className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto"
      >
        {/* Top Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-extrabold uppercase tracking-widest mb-6 shadow-xl"
        >
          <Globe className="w-4 h-4 text-[#D4A373]" />
          <span>Curated Indian Expeditions 🇮🇳</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-extrabold text-white tracking-tight leading-none mb-6 drop-shadow-2xl"
        >
          EXPLORE <br className="hidden sm:block" />
          <span className="font-accent italic font-normal text-6xl sm:text-8xl md:text-9xl text-[#D4A373] drop-shadow-md">
            India
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-white/90 font-normal leading-relaxed drop-shadow-lg mb-10"
        >
          Discover breathtaking experiences and unforgettable adventures across India.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Explore Destinations */}
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#D4A373] hover:bg-amber-400 text-[#1E1E1E] font-bold text-base shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-amber-500/20 active:scale-95 cursor-pointer font-heading"
          >
            <Compass className="w-5 h-5" />
            <span>Explore Destinations</span>
          </button>

          {/* Book Your Journey */}
          <button
            onClick={onBookClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-base border border-white/30 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer font-heading shadow-xl"
          >
            <Calendar className="w-5 h-5 text-[#25D366]" />
            <span>Book Your Journey</span>
          </button>
        </motion.div>

      </motion.div>



      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer"
        onClick={onExploreClick}
      >
        <span className="text-[11px] font-bold uppercase tracking-widest">Scroll To Begin Journey</span>
        <ArrowDown className="w-5 h-5 text-[#D4A373]" />
      </motion.div>

    </section>
  );
}
