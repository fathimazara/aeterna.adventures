import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Plane, ArrowRight, Compass, Globe } from 'lucide-react';
import { WORLD_DESTINATIONS } from '../data/tripsData';

export default function WorldMap({ onSelectDestination }) {
  const [activeDest, setActiveDest] = useState(WORLD_DESTINATIONS[0]);

  const scrollToDest = (id) => {
    const el = document.getElementById(`dest-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="world-map-section" className="w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#090807] text-white border-t border-white/10 select-none scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-[#D4A373] tracking-widest uppercase mb-4">
            <Globe className="w-4 h-4 animate-spin-slow" />
            <span>Interactive Flight Network</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-none mb-4">
            Interactive World Map
          </h2>
          
          <p className="text-base sm:text-lg text-white/70 font-normal">
            Hover or tap any destination marker on the globe to explore flight routes and packages.
          </p>
        </div>

        {/* World Map Graphics Container (Desktop / Tablet View) */}
        <div className="relative w-full h-[450px] sm:h-[520px] rounded-3xl overflow-hidden bg-[#110E0C] border border-white/15 shadow-2xl p-6 hidden sm:block">
          
          {/* Stylized Dark World Map Background SVG */}
          <svg className="w-full h-full opacity-30 object-contain" viewBox="0 0 1000 500" fill="none">
            {/* World Landmass Silhouettes (Stylized outline paths) */}
            <path
              d="M 150 120 Q 220 80 300 130 T 250 280 T 160 220 Z M 280 300 Q 320 320 350 420 T 290 480 T 260 360 Z M 450 100 Q 520 80 580 120 T 600 220 T 480 200 Z M 520 240 Q 620 260 650 380 T 550 460 Z M 650 120 Q 800 100 880 180 T 780 300 Z M 800 350 Q 890 360 920 440 Z"
              fill="#D4A373"
              opacity="0.25"
            />
            
            {/* Flight Arc Paths connecting nodes */}
            <path d="M 720 260 C 680 230 630 230 630 230" stroke="#D4A373" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse" />
            <path d="M 630 230 C 550 180 480 160 480 160" stroke="#D4A373" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse" />
            <path d="M 480 160 C 490 170 510 170 510 170" stroke="#D4A373" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse" />
            <path d="M 720 260 C 780 280 820 320 820 320" stroke="#D4A373" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse" />
            <path d="M 480 160 C 350 150 260 190 260 190" stroke="#D4A373" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse" />
          </svg>

          {/* Interactive Destination Nodes */}
          {WORLD_DESTINATIONS.map((dest) => {
            const isSelected = activeDest.id === dest.id;
            return (
              <div
                key={dest.id}
                style={{
                  left: `${dest.mapCoords.x}%`,
                  top: `${dest.mapCoords.y}%`
                }}
                onClick={() => {
                  setActiveDest(dest);
                  scrollToDest(dest.id);
                }}
                onMouseEnter={() => setActiveDest(dest)}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
              >
                {/* Pulsing ring */}
                <span className={`absolute -inset-3 rounded-full transition-all ${
                  isSelected ? 'bg-[#D4A373]/40 animate-ping' : 'bg-white/10 group-hover:bg-[#D4A373]/20'
                }`} />

                {/* Marker Button */}
                <div className={`relative px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all duration-300 shadow-xl border ${
                  isSelected 
                    ? 'bg-[#D4A373] text-[#1E1E1E] border-[#D4A373] scale-110 font-bold' 
                    : 'bg-black/70 text-white border-white/20 group-hover:border-[#D4A373]'
                }`}>
                  <span>{dest.flag}</span>
                  <span className="text-xs font-heading font-extrabold">{dest.name}</span>
                </div>
              </div>
            );
          })}

          {/* Hover Tooltip Box (Floating bottom left card) */}
          <AnimatePresence mode="wait">
            {activeDest && (
              <motion.div
                key={activeDest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-6 left-6 z-30 max-w-sm bg-[#1E1E1E]/90 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-2xl"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-[#D4A373] flex items-center gap-1">
                    <span>{activeDest.flag}</span>
                    <span>{activeDest.country}</span>
                  </span>
                  <span className="text-xs font-bold text-white/80">From {activeDest.startingPrice}</span>
                </div>

                <h4 className="font-heading font-extrabold text-xl text-white mb-1">
                  {activeDest.name}
                </h4>

                <p className="text-xs text-white/70 line-clamp-2 mb-4 font-normal">
                  {activeDest.subtitle}
                </p>

                <button
                  onClick={() => scrollToDest(activeDest.id)}
                  className="w-full py-2 px-4 rounded-xl bg-[#D4A373] hover:bg-amber-400 text-[#1E1E1E] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Explore {activeDest.name} Packages</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Mobile Responsive List Fallback */}
        <div className="sm:hidden space-y-4">
          {WORLD_DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              onClick={() => scrollToDest(dest.id)}
              className="bg-[#181412] p-5 rounded-2xl border border-white/10 flex items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{dest.flag}</span>
                <div>
                  <h4 className="font-heading font-bold text-white text-lg leading-tight">
                    {dest.name}
                  </h4>
                  <p className="text-xs text-[#D4A373] font-medium">{dest.country} • From {dest.startingPrice}</p>
                </div>
              </div>

              <ArrowRight className="w-5 h-5 text-white/60" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
