import React, { useState } from 'react';
import { MessageSquare, Calendar, HelpCircle, X, ChevronRight, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppButton';
import { openWhatsAppConcierge } from '../utils/whatsappUtils';
import { WHATSAPP_CONFIG, formatPhoneNumber } from '../config/whatsappConfig';

/**
 * FloatingWhatsApp Component
 *
 * Provides a responsive, accessible floating concierge widget on bottom-right of every screen.
 * Offers 1-click WhatsApp concierge chat or fast jump to resort booking.
 *
 * @param {Object} props
 * @param {Function} props.onOpenWhatsAppBooking - Opens booking modal with trip selection
 * @param {Function} props.onOpenContact - Opens contact modal
 */
export default function FloatingWhatsApp({ onOpenWhatsAppBooking, onOpenContact }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);

  const handleDirectChat = () => {
    openWhatsAppConcierge({
      inquiryType: 'Instant Booking & Trip Help',
      customText: 'Hi! I am browsing the Aeterna website and have a question about booking a resort.',
    });
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Interactive Popup Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-3xl shadow-2xl border border-[#2B231F]/15 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-[#1E1E1E] text-white p-4 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close concierge popup"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md">
                  <WhatsAppIcon className="w-6 h-6" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#1E1E1E]" />
              </div>

              <div>
                <h4 className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
                  <span>Aeterna Concierge</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
                </h4>
                <p className="text-[11px] text-white/70">
                  {WHATSAPP_CONFIG.operatingHours}
                </p>
              </div>
            </div>
          </div>

          {/* Body Options */}
          <div className="p-4 space-y-2.5 bg-[#F9F8F6]">
            <p className="text-xs text-[#6E6660] leading-relaxed">
              Hello! 👋 Need help booking a stay or customizing your itinerary?
            </p>

            {/* Option 1: Direct WhatsApp Chat */}
            <button
              onClick={handleDirectChat}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs transition-all shadow-sm group"
            >
              <div className="flex items-center gap-2.5 text-left">
                <WhatsAppIcon className="w-4.5 h-4.5 shrink-0" />
                <div>
                  <span className="block font-heading">Chat on WhatsApp</span>
                  <span className="text-[10px] text-white/90 font-normal">
                    {formatPhoneNumber(WHATSAPP_CONFIG.defaultNumber)}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Option 2: Explore & Book Resort */}
            <button
              onClick={() => {
                setIsOpen(false);
                const destSec = document.getElementById('destinations-section');
                if (destSec) destSec.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-[#1E1E1E] text-[#2B231F] hover:text-white border border-[#2B231F]/10 font-bold text-xs transition-all shadow-xs group"
            >
              <div className="flex items-center gap-2.5 text-left">
                <Calendar className="w-4 h-4 text-[#D4A373] group-hover:text-white shrink-0" />
                <div>
                  <span className="block font-heading">Book Resort via WhatsApp</span>
                  <span className="text-[10px] text-[#6E6660] group-hover:text-white/80 font-normal">
                    Select property & dates
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Option 3: General Contact Form */}
            <button
              onClick={() => {
                setIsOpen(false);
                if (onOpenContact) onOpenContact();
              }}
              className="w-full flex items-center justify-between p-2.5 text-center text-xs text-[#6E6660] hover:text-[#2B231F] font-semibold"
            >
              <span className="w-full text-center">Prefer email inquiry? Contact Form →</span>
            </button>
          </div>

        </div>
      )}

      {/* Greeting Bubble when closed */}
      {!isOpen && showBubble && (
        <div className="mb-2 relative bg-[#1E1E1E] text-white px-3.5 py-2 rounded-2xl shadow-xl text-xs font-semibold border border-white/10 flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
          <span>Book via WhatsApp in 1-tap!</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowBubble(false);
            }}
            className="text-white/50 hover:text-white ml-1 p-0.5"
            aria-label="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setShowBubble(false);
        }}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl hover:shadow-[#25D366]/40 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        aria-label="Open WhatsApp Booking Concierge"
        title="Chat & Book on WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7" />
      </button>

    </div>
  );
}
