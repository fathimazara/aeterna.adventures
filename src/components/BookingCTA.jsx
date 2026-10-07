import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Calendar, MessageSquare, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function BookingCTA({ onStartPlanning, onOpenContact }) {
  return (
    <section id="booking-cta-section" className="relative w-full py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#090807] text-white border-t border-white/10 select-none overflow-hidden scroll-mt-16">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#D4A373]/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        
        {/* Animated Flight Landing Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 rounded-full bg-[#D4A373]/15 border border-[#D4A373]/40 text-[#D4A373] flex items-center justify-center mx-auto mb-6 shadow-xl"
        >
          <Plane className="w-8 h-8 transform rotate-45 animate-pulse" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6"
        >
          Where will you go next?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-normal leading-relaxed mb-10"
        >
          From Kerala backwaters to Dubai dunes, Eiffel Tower views, Swiss alpine chalets, and NYC skylines — let us craft your dream journey.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          {/* Start Planning Your Trip */}
          <button
            onClick={onStartPlanning}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-[#25D366] hover:bg-[#1ebe5c] text-white font-extrabold text-base shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer font-heading"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Start Planning Your Trip</span>
          </button>

          {/* Contact Concierge */}
          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-base border border-white/25 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer font-heading shadow-xl"
          >
            <Calendar className="w-5 h-5 text-[#D4A373]" />
            <span>Schedule Travel Call</span>
          </button>
        </motion.div>

        {/* Guarantees */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/60 font-semibold">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#25D366]" /> 100% Customized Itineraries
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#D4A373]" /> Best Price Guarantee
          </span>
          <span className="flex items-center gap-1.5">
            <Plane className="w-4 h-4 text-blue-400" /> 24/7 Concierge Support
          </span>
        </div>

      </div>

    </section>
  );
}
