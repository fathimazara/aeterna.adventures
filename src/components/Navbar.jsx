import React, { useState, useEffect } from 'react';
import { Compass, Search, Heart, Menu, X, BookOpen, Mail, Globe, Calendar } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

export default function Navbar({ 
  onSelectCategory, 
  onOpenResources, 
  onOpenContact, 
  onOpenWhatsAppBooking,
  wishlistCount,
  onOpenWishlist
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-500 select-none ${
      isScrolled 
        ? 'bg-[#090807]/85 backdrop-blur-md border-b border-white/10 shadow-2xl py-3' 
        : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a 
          href="#" 
          className="flex items-center gap-3 group focus:outline-none"
        >
          <img 
            src="/logo.jpg" 
            alt="Aeterna Adventures Logo" 
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#D4A373] shadow-md group-hover:scale-105 transition-transform duration-300"
          />
          <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-white">
            Aeterna<span className="text-[#D4A373]">.adventures</span>
          </span>
        </a>

        {/* Desktop Links with Animated Underline Effect */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {[
            { label: 'Home', id: 'hero-section' },
            { label: 'Destinations', id: 'dest-india' },
            { label: 'World Map', id: 'world-map-section' },
            { label: 'Packages', id: 'destinations-section' },
            { label: 'Reviews', id: 'real-reviews-section' },
            { label: 'About', id: 'our-value-section' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.id)}
              className="relative py-1 text-sm font-semibold text-white/90 hover:text-white transition-colors group cursor-pointer"
            >
              <span>{item.label}</span>
              {/* Animated Underline */}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4A373] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}

          <button
            onClick={onOpenContact}
            className="relative py-1 text-sm font-semibold text-white/90 hover:text-white transition-colors group cursor-pointer"
          >
            <span>Contact</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4A373] transition-all duration-300 group-hover:w-full" />
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          
          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all shadow-md cursor-pointer group"
            title="Saved Wishlist"
          >
            <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-[#D4A373] text-[#D4A373]' : 'text-white group-hover:text-[#D4A373]'}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D4A373] text-[#1E1E1E] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#090807]">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Prominent "Book Now" CTA Button */}
          <button
            onClick={() => onOpenWhatsAppBooking(null)}
            className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5c] text-white font-extrabold text-sm shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer font-heading"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Now</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090807]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4 shadow-2xl text-white">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenWhatsAppBooking(null);
            }}
            className="w-full py-3 px-4 rounded-full bg-[#25D366] text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Now (Instant Concierge)</span>
          </button>

          <div className="flex flex-col space-y-3 pt-2">
            {[
              { label: 'Home', id: 'hero-section' },
              { label: 'World Destinations', id: 'dest-india' },
              { label: 'Interactive World Map', id: 'world-map-section' },
              { label: 'Tour Packages', id: 'destinations-section' },
              { label: 'Customer Reviews', id: 'real-reviews-section' },
              { label: 'About Aeterna', id: 'our-value-section' },
            ].map((m) => (
              <button
                key={m.label}
                onClick={() => scrollToSection(m.id)}
                className="text-left py-2 text-base font-medium text-white/90 hover:text-[#D4A373] border-b border-white/5"
              >
                {m.label}
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="text-left py-2 text-base font-medium text-white/90 hover:text-[#D4A373]"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
