import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Plane } from 'lucide-react';

export default function AnimatedAirplane({ activeDestinationId }) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20
  });

  // Calculate position along an S-curve across the viewport
  const planeX = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], ['5%', '85%', '15%', '80%', '20%', '90%']);
  const planeY = useTransform(smoothProgress, [0, 1], ['12vh', '88vh']);
  const planeRotate = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [45, 135, 45, 135, 45, 120]);

  if (shouldReduceMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      
      {/* Curved SVG Flight Path Background Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
        <defs>
          <linearGradient id="flightPathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A373" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#25D366" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <path
          d="M 50 100 C 900 400, 100 800, 850 1200 C 200 1600, 800 2000, 100 2400 C 900 2800, 200 3200, 850 3600"
          fill="none"
          stroke="url(#flightPathGrad)"
          strokeWidth="2.5"
          strokeDasharray="8 8"
        />
      </svg>

      {/* Animated Airplane */}
      <motion.div
        style={{
          left: planeX,
          top: planeY,
          rotate: planeRotate
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 text-[#D4A373] drop-shadow-[0_0_15px_rgba(212,163,115,0.9)]"
      >
        <div className="relative flex items-center justify-center">
          {/* Pulsing ring around plane */}
          <span className="absolute w-12 h-12 rounded-full bg-[#D4A373]/20 animate-ping" />
          
          {/* Main Plane Icon */}
          <div className="bg-[#1E1E1E]/80 backdrop-blur-md p-2.5 rounded-full border border-[#D4A373]/60 shadow-2xl">
            <Plane className="w-6 h-6 text-[#D4A373] transform -rotate-45" />
          </div>

          {/* Jet engine smoke trail particle effect */}
          <div className="absolute top-1/2 -left-6 -translate-y-1/2 flex items-center gap-1 opacity-70">
            <span className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="w-1 h-1 rounded-full bg-white/20" />
          </div>
        </div>
      </motion.div>

    </div>
  );
}
