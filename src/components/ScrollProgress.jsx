import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { WORLD_DESTINATIONS } from '../data/tripsData';

export default function ScrollProgress({ activeDestinationId }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      
      {/* Top Thin Progress Line */}
      <motion.div
        style={{ scaleX }}
        className="h-1 bg-gradient-to-r from-[#D4A373] via-amber-400 to-[#25D366] origin-left shadow-[0_0_10px_rgba(212,163,115,0.8)]"
      />

      {/* Destination Checkpoints Pill Bar (Hidden on tiny mobile screens, sleek on tablet/desktop) */}
      <div className="hidden md:flex items-center justify-center gap-1 sm:gap-3 py-2 px-4 bg-black/40 backdrop-blur-md border-b border-white/10 pointer-events-auto max-w-4xl mx-auto rounded-b-2xl shadow-xl">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4A373] mr-1">
          JOURNEY:
        </span>

        {WORLD_DESTINATIONS.map((dest, idx) => {
          const isActive = activeDestinationId === dest.id;
          return (
            <React.Fragment key={dest.id}>
              <button
                onClick={() => scrollToSection(`dest-${dest.id}`)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#D4A373] text-[#1E1E1E] font-bold shadow-md scale-105'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{dest.flag}</span>
                <span className="capitalize">{dest.id}</span>
              </button>
              {idx < WORLD_DESTINATIONS.length - 1 && (
                <span className="text-white/30 text-[10px]">→</span>
              )}
            </React.Fragment>
          );
        })}
      </div>

    </div>
  );
}
