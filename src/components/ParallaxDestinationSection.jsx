import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Compass, ArrowRight } from 'lucide-react';
import DestinationCard from './DestinationCard';

export default function ParallaxDestinationSection({ destination, onSelectPackage, onBookNow }) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Layered 3D Parallax Speeds
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const titleY = useTransform(scrollYProgress, [0, 1], ['40px', '-40px']);
  const cardsY = useTransform(scrollYProgress, [0, 1], ['60px', '-20px']);

  return (
    <section
      id={`dest-${destination.id}`}
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 px-4 sm:px-6 lg:px-8 overflow-hidden select-none bg-[#0D0B09] border-t border-white/10"
    >

      {/* 1. Background Image with Slow 3D Parallax Movement */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0 origin-center"
      >
        <img
          src={destination.bgImage}
          alt={destination.name}
          className="w-full h-[120%] object-cover object-center filter brightness-[0.85] contrast-[1.05]"
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0B09]/95 via-[#0D0B09]/60 to-[#0D0B09]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0B09]/80 via-transparent to-[#0D0B09]/80" />
      </motion.div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* 2. Destination Title & Header (Medium Parallax Speed) */}
        <motion.div 
          style={{ y: titleY }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-4 shadow-lg">
            <span className="text-base">{destination.flag}</span>
            <span>{destination.country}</span>
          </div>

          {/* Destination Name */}
          <h2 className="font-heading text-5xl sm:text-7xl md:text-8xl font-extrabold text-white tracking-tight leading-none mb-4 drop-shadow-2xl">
            {destination.name}
          </h2>

          {/* Subtitle Quote */}
          <p className="font-accent italic text-2xl sm:text-3xl text-[#D4A373] font-normal mb-4 drop-shadow-md">
            "{destination.subtitle}"
          </p>

          {/* Detailed Paragraph */}
          <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed max-w-2xl mx-auto">
            {destination.description}
          </p>
        </motion.div>

        {/* 3. Foreground Package Cards Grid (Fast Parallax Speed) */}
        <motion.div style={{ y: cardsY }} className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destination.packages.map((pkg, idx) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
              >
                <DestinationCard pkg={pkg} onSelect={onSelectPackage} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Bar for Destination */}
        <div className="text-center">
          <button
            onClick={() => onBookNow(destination)}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#D4A373] hover:bg-amber-400 text-[#1E1E1E] font-bold text-sm shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer font-heading"
          >
            <span>Book {destination.country} Journey</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </section>
  );
}
