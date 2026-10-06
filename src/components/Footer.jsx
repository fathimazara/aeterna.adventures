import React, { useState } from 'react';
import { Compass, ArrowRight, Heart, CheckCircle2, Phone, Clock } from 'lucide-react';
import WhatsAppButton, { WhatsAppIcon } from './WhatsAppButton';
import { openWhatsAppConcierge } from '../utils/whatsappUtils';
import { WHATSAPP_CONFIG, formatPhoneNumber } from '../config/whatsappConfig';

export default function Footer({ onSelectCategory, onOpenResources, onOpenContact, onOpenWhatsAppBooking }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsAppChat = () => {
    openWhatsAppConcierge({
      inquiryType: 'Footer Inquiry',
      customText: 'Hello! I am planning my 2026 trip and would like to speak with a booking specialist.',
    });
  };

  return (
    <footer className="w-full bg-[#1E1E1E] text-[#F9F8F6] pt-16 pb-12 border-t border-[#2B231F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* WhatsApp Banner Strip */}
        <div className="mb-12 p-6 rounded-3xl bg-gradient-to-r from-[#25D366]/20 via-[#1E1E1E] to-[#D4A373]/20 border border-[#25D366]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-lg">
              <WhatsAppIcon className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white">
                Book Any Stay or Package via WhatsApp
              </h3>
              <p className="text-xs text-white/75 mt-0.5 flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span>{WHATSAPP_CONFIG.operatingHours}</span>
                <span>•</span>
                <span className="text-[#25D366] font-bold">{formatPhoneNumber(WHATSAPP_CONFIG.defaultNumber)}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-center">
            <WhatsAppButton
              onClick={handleWhatsAppChat}
              label="Chat on WhatsApp"
              size="md"
              variant="primary"
              badge="Instant"
            />
          </div>
        </div>

        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={scrollToTop}>
              <img 
                src="/logo.jpg" 
                alt="Aeterna Adventures Logo" 
                className="w-11 h-11 rounded-full object-cover border-2 border-[#D4A373]/60 shadow-md group-hover:scale-105 transition-transform duration-300"
              />
              <span className="font-heading font-bold text-2xl tracking-tight text-white">
                Aeterna<span className="text-[#D4A373]">.adventures</span>
              </span>
            </div>

            <p className="text-sm text-white/70 leading-relaxed pr-4">
              Travel with intention. Discover retreats, active adventures, and boutique staycations curated for good vibes and better people.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/aeterna.adventures?stkn=cG40NWFmMXczcDR6"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#D4A373] hover:text-[#1E1E1E] flex items-center justify-center transition-colors"
                title="Follow @aeterna.adventures on Instagram"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#D4A373] hover:text-[#1E1E1E] flex items-center justify-center transition-colors" title="YouTube" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#D4A373] hover:text-[#1E1E1E] flex items-center justify-center transition-colors" title="Twitter" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>


          {/* Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-base text-[#D4A373]">Explore</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <button onClick={() => { onSelectCategory('Staycation'); scrollToSection('destinations-section'); }} className="hover:text-white transition-colors">
                  Staycations
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('Travel Package'); scrollToSection('destinations-section'); }} className="hover:text-white transition-colors">
                  Travel Packages
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('destinations-section')} className="hover:text-white transition-colors">
                  Yurt Expeditions
                </button>
              </li>
              <li>
                <button onClick={handleWhatsAppChat} className="text-[#25D366] hover:text-white font-semibold transition-colors flex items-center gap-1">
                  <span>WhatsApp Booking</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Support (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-base text-[#D4A373]">Concierge</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="tel:+918547103872" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>+91 8547103872</span>
                </a>
              </li>
              <li>
                <a href="mailto:hawkeyezmarketing@gmail.com" className="hover:text-white transition-colors flex items-center gap-1.5 truncate" title="hawkeyezmarketing@gmail.com">
                  <span className="truncate">Email Team</span>
                </a>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition-colors">
                  Contact Form
                </button>
              </li>
              <li>
                <button onClick={handleWhatsAppChat} className="hover:text-white transition-colors">
                  WhatsApp Support
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Box (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-heading font-bold text-base text-[#D4A373]">Stay in the Loop</h4>
            <p className="text-xs text-white/70">
              Get notified when secret slots open for boutique glamping and retreat camps.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-2xl bg-[#D4A373]/20 border border-[#D4A373]/40 text-[#D4A373] text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscribed! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="relative flex items-center">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 rounded-full bg-white/10 border border-white/15 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 w-9 h-9 rounded-full bg-[#D4A373] text-[#1E1E1E] flex items-center justify-center font-bold hover:scale-105 transition-transform"
                  aria-label="Submit newsletter"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© {new Date().getFullYear()} Aeterna.adventures. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <button onClick={scrollToTop} className="hover:text-[#D4A373] transition-colors">
              Back to Top ↑
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
