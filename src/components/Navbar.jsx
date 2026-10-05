import React, { useState } from 'react';
import { Compass, Search, Heart, Menu, X, Sparkles, BookOpen, Mail } from 'lucide-react';

export default function Navbar({ 
  onSelectCategory, 
  onOpenQuiz, 
  onOpenResources, 
  onOpenContact, 
  wishlistCount,
  onOpenWishlist,
  activeCategory
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const destSection = document.getElementById('destinations-section');
      if (destSection) {
        destSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#F9F8F6]/85 border-b border-[#2B231F]/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Top-Left Brand Logo */}
        <a 
          href="#" 
          className="flex items-center gap-3 group focus:outline-none"
        >
          <img 
            src="/logo.jpg" 
            alt="Aeterna Adventures Logo" 
            className="w-11 h-11 rounded-full object-cover border-2 border-[#D4A373]/60 shadow-md group-hover:scale-105 group-hover:border-[#D4A373] transition-all duration-300"
          />
          <span className="font-heading font-bold text-xl sm:text-2xl tracking-tight text-[#2B231F]">
            Aeterna<span className="text-[#D4A373]">.adventures</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          
          {/* Search Bar Input */}
          <div className="relative mr-2">
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search destinations (e.g. Bali, Yurts)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-8 py-2 w-64 text-sm rounded-full bg-white border border-[#2B231F]/20 text-[#2B231F] focus:outline-none focus:ring-2 focus:ring-[#D4A373] shadow-inner"
                  autoFocus
                />
                <Search className="w-4 h-4 text-[#6E6660] absolute left-3 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-2 text-[#6E6660] hover:text-[#2B231F] p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#2B231F] hover:bg-black/5 rounded-full transition-colors"
                title="Search destinations"
              >
                <Search className="w-4.5 h-4.5 text-[#2B231F]" />
                <span className="hidden xl:inline">Search</span>
              </button>
            )}
          </div>

          {/* Category Links */}
          <button
            onClick={() => {
              onSelectCategory('Staycation');
              scrollToSection('destinations-section');
            }}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeCategory === 'Staycation'
                ? 'bg-[#1E1E1E] text-white shadow-md'
                : 'text-[#2B231F] hover:bg-[#2B231F]/5'
            }`}
          >
            Staycation
          </button>

          <button
            onClick={() => {
              onSelectCategory('Travel Package');
              scrollToSection('destinations-section');
            }}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeCategory === 'Travel Package'
                ? 'bg-[#1E1E1E] text-white shadow-md'
                : 'text-[#2B231F] hover:bg-[#2B231F]/5'
            }`}
          >
            Travel Package
          </button>

          {/* Quiz CTA */}
          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-[#2B231F] hover:bg-[#D4A373]/20 border border-[#D4A373]/40 transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#D4A373]" />
            <span>Quiz</span>
          </button>

          {/* Resources */}
          <button
            onClick={onOpenResources}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-[#6E6660] hover:text-[#2B231F] hover:bg-[#2B231F]/5 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>Resources</span>
          </button>

          {/* Contact Us */}
          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium text-[#6E6660] hover:text-[#2B231F] hover:bg-[#2B231F]/5 transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Us</span>
          </button>

          {/* About Us */}
          <button
            onClick={() => scrollToSection('our-value-section')}
            className="px-3 py-2 rounded-full text-sm font-medium text-[#6E6660] hover:text-[#2B231F] transition-all"
          >
            About Us
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2.5 rounded-full bg-white border border-[#2B231F]/10 hover:border-[#D4A373] text-[#2B231F] transition-all shadow-sm group"
            title="Saved Wishlist"
          >
            <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-[#D4A373] text-[#D4A373]' : 'text-[#2B231F] group-hover:text-[#D4A373]'}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1E1E1E] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#F9F8F6]">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full bg-[#1E1E1E] text-white hover:bg-black transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#2B231F]/10 px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="relative">
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#F9F8F6] border border-[#2B231F]/15 text-sm"
            />
            <Search className="w-4 h-4 text-[#6E6660] absolute left-3.5 top-3.5" />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => {
                onSelectCategory('Staycation');
                scrollToSection('destinations-section');
              }}
              className="w-full py-2.5 px-4 rounded-xl text-center text-sm font-semibold bg-[#F9F8F6] border border-[#2B231F]/10 text-[#2B231F]"
            >
              Staycation
            </button>
            <button
              onClick={() => {
                onSelectCategory('Travel Package');
                scrollToSection('destinations-section');
              }}
              className="w-full py-2.5 px-4 rounded-xl text-center text-sm font-semibold bg-[#F9F8F6] border border-[#2B231F]/10 text-[#2B231F]"
            >
              Travel Package
            </button>
          </div>

          <div className="flex flex-col space-y-2 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuiz();
              }}
              className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm font-medium hover:bg-[#F9F8F6]"
            >
              <Sparkles className="w-5 h-5 text-[#D4A373]" />
              <span>Take Travel Matcher Quiz</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResources();
              }}
              className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm font-medium hover:bg-[#F9F8F6]"
            >
              <BookOpen className="w-5 h-5 text-[#6E6660]" />
              <span>Travel Resources & Guides</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm font-medium hover:bg-[#F9F8F6]"
            >
              <Mail className="w-5 h-5 text-[#6E6660]" />
              <span>Contact Us</span>
            </button>
            <button
              onClick={() => scrollToSection('our-value-section')}
              className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm font-medium hover:bg-[#F9F8F6]"
            >
              <Compass className="w-5 h-5 text-[#6E6660]" />
              <span>About Aeterna</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
