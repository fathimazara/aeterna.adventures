import React from 'react';
import { X, BookOpen, Sun, Compass, ShieldCheck, Download, ExternalLink } from 'lucide-react';

export default function ResourcesDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  const resources = [
    {
      title: 'Glamping & Yurt Packing Essentials 2026',
      category: 'Packing Guide',
      readTime: '4 min read',
      icon: Sun,
      desc: 'Everything you need to pack for high-altitude desert nights and yurt stays in Central Asia and Sumba.'
    },
    {
      title: 'First-Time Traveler Etiquette in East Bali',
      category: 'Local Culture',
      readTime: '6 min read',
      icon: Compass,
      desc: 'Understanding temple customs, village greetings in Penglipuran, and supporting local eco-initiatives.'
    },
    {
      title: 'Altitude & Weather Guide for Kazakh Mountains',
      category: 'Safety & Weather',
      readTime: '5 min read',
      icon: ShieldCheck,
      desc: 'Seasonal breakdown of temperatures in Kolsai & Kaindy lakes plus layer recommendations.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-[#1E1E1E] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#D4A373]" />
            <h3 className="font-heading font-extrabold text-xl">Travel Resources</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          <p className="text-xs text-[#6E6660]">
            Curated guides, packing checklists, and local cultural handbooks written by Aeterna tour leaders.
          </p>

          <div className="space-y-4">
            {resources.map((item, i) => {
              const IconComp = item.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-2xl border border-[#2B231F]/10 bg-[#F9F8F6] hover:bg-white hover:border-[#D4A373] transition-all group cursor-pointer shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#D4A373] uppercase tracking-wider">{item.category}</span>
                    <span className="text-[11px] text-[#6E6660]">{item.readTime}</span>
                  </div>

                  <h4 className="font-heading font-bold text-base text-[#2B231F] group-hover:text-[#D4A373] transition-colors mb-2">
                    {item.title}
                  </h4>

                  <p className="text-xs text-[#6E6660] leading-relaxed mb-3">
                    {item.desc}
                  </p>

                  <div className="flex items-center gap-1 text-xs font-bold text-[#2B231F] group-hover:underline">
                    <span>Download PDF Guide</span>
                    <Download className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-[#F9F8F6] border-t border-[#2B231F]/10 text-center">
          <p className="text-xs text-[#6E6660] mb-2">Need customized trip advice?</p>
          <a
            href="https://wa.me/15550000000"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full bg-[#1E1E1E] text-white hover:bg-[#D4A373] hover:text-[#1E1E1E] text-xs font-bold transition-all shadow-md"
          >
            <span>Chat with Trip Concierge</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
}
