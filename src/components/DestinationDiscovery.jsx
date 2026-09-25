import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Heart, 
  SlidersHorizontal, 
  Bed, 
  Car, 
  Utensils, 
  Compass, 
  Sparkles,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { TRIPS } from '../data/tripsData';

export default function DestinationDiscovery({ 
  onSelectTrip, 
  wishlist, 
  onToggleWishlist,
  selectedCategoryFilter,
  setSelectedCategoryFilter
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedMonth, setSelectedMonth] = useState('All');

  // Filter trips based on state
  const filteredTrips = useMemo(() => {
    return TRIPS.filter((trip) => {
      // Category filter
      if (selectedCategoryFilter !== 'All' && trip.category !== selectedCategoryFilter) {
        return false;
      }
      // Search term
      if (
        searchTerm.trim() &&
        !trip.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !trip.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !trip.region.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      // Price limit
      if (trip.price > maxPrice) {
        return false;
      }
      // Month
      if (selectedMonth !== 'All' && !trip.dateRange.toLowerCase().includes(selectedMonth.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [selectedCategoryFilter, searchTerm, maxPrice, selectedMonth]);

  const renderInclusionIcon = (iconName) => {
    switch (iconName) {
      case 'Bed': return <Bed className="w-3.5 h-3.5" />;
      case 'Car': return <Car className="w-3.5 h-3.5" />;
      case 'Utensils': return <Utensils className="w-3.5 h-3.5" />;
      default: return <Compass className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section id="destinations-section" className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#F9F8F6]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Tag & Header Header Layout */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E1E1E]/5 border border-[#2B231F]/10 text-xs font-bold text-[#2B231F] tracking-wide mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
              <span>• Popular Destination 2026</span>
            </div>
            
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2B231F] tracking-tight">
              Pick the Place
            </h2>
          </div>

          <p className="max-w-md text-base text-[#6E6660] font-normal leading-relaxed">
            We have great options for everyone and cozy spots for your squad to enjoy together! Filter by category, budget or upcoming dates.
          </p>
        </div>


        {/* Secondary Filter Bar Container */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#2B231F]/10 shadow-lg mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
            
            {/* Search Input (3 cols) */}
            <div className="lg:col-span-3 relative">
              <label className="block text-xs font-bold uppercase text-[#6E6660] mb-1">
                Destination
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Find a spot..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl bg-[#F9F8F6] border border-[#2B231F]/10 focus:outline-none focus:ring-2 focus:ring-[#D4A373] text-[#2B231F] font-medium"
                />
                <Search className="w-4 h-4 text-[#6E6660] absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Category Selector (3 cols) */}
            <div className="lg:col-span-3">
              <label className="block text-xs font-bold uppercase text-[#6E6660] mb-1">
                Category
              </label>
              <div className="flex bg-[#F9F8F6] p-1 rounded-xl border border-[#2B231F]/10">
                {['All', 'Staycation', 'Travel Package'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoryFilter(cat)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      selectedCategoryFilter === cat
                        ? 'bg-[#1E1E1E] text-white shadow-sm'
                        : 'text-[#6E6660] hover:text-[#2B231F]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter (3 cols) */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold uppercase text-[#6E6660]">Price</label>
                <span className="text-xs font-extrabold text-[#2B231F]">Up to ${maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="400"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#1E1E1E] cursor-pointer h-1.5 bg-[#2B231F]/10 rounded-lg"
              />
            </div>

            {/* Date Selector & Discover CTA (3 cols) */}
            <div className="lg:col-span-3 flex items-center gap-2 pt-2 lg:pt-0">
              <div className="flex-1">
                <label className="block text-xs font-bold uppercase text-[#6E6660] mb-1">Date</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full py-2 px-3 text-xs rounded-xl bg-[#F9F8F6] border border-[#2B231F]/10 font-bold text-[#2B231F] focus:outline-none"
                >
                  <option value="All">Select date range</option>
                  <option value="August">August 2026</option>
                  <option value="September">September 2026</option>
                  <option value="October">October 2026</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setSearchTerm('');
                  setMaxPrice(5000);
                  setSelectedCategoryFilter('All');
                  setSelectedMonth('All');
                }}
                className="mt-5 bg-[#1E1E1E] text-white hover:bg-[#D4A373] hover:text-[#1E1E1E] px-4 py-2 rounded-full text-xs font-bold transition-all shadow-md shrink-0"
              >
                Discover
              </button>
            </div>

          </div>
        </div>


        {/* Grid Layout (3-Column Destination Cards) */}
        {filteredTrips.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-[#2B231F]/20">
            <SlidersHorizontal className="w-12 h-12 text-[#D4A373] mx-auto mb-3" />
            <h3 className="font-heading text-xl font-bold text-[#2B231F] mb-1">No matching destinations found</h3>
            <p className="text-sm text-[#6E6660] mb-4">Try adjusting your filters or price range to find available trips.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setMaxPrice(5000);
                setSelectedCategoryFilter('All');
                setSelectedMonth('All');
              }}
              className="bg-[#1E1E1E] text-white px-6 py-2.5 rounded-full text-xs font-bold"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTrips.map((trip) => {
              const isWishlisted = wishlist.includes(trip.id);

              return (
                <div
                  key={trip.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-[#2B231F]/10 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
                >
                  {/* Card Image Header */}
                  <div className="relative h-64 sm:h-72 overflow-hidden cursor-pointer" onClick={() => onSelectTrip(trip)}>
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

                    {/* Top Status Tags */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#2B231F] shadow-sm">
                          • {trip.slotsLeft} Slots Left
                        </span>
                        <span className="bg-[#1E1E1E]/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-sm">
                          {trip.type}
                        </span>
                      </div>

                      {/* Bookmark / Wishlist button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(trip.id);
                        }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                          isWishlisted
                            ? 'bg-[#D4A373] text-white'
                            : 'bg-white/80 hover:bg-white text-[#2B231F]'
                        }`}
                        title="Save to Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
                      </button>
                    </div>

                    {/* Bottom Image Details Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-heading font-bold text-xl drop-shadow-sm group-hover:text-[#D4A373] transition-colors">
                          {trip.title}
                        </h3>
                        <span className="text-lg font-extrabold text-white">
                          ${trip.price}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-white/80">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
                          <span>{trip.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#D4A373]" />
                          <span>{trip.dateRange}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content & Quick Inclusion Tags */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-[#6E6660] line-clamp-2 mb-4 leading-relaxed">
                        {trip.description}
                      </p>

                      {/* Inclusion Pills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {trip.inclusions.slice(0, 3).map((inc, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F9F8F6] border border-[#2B231F]/10 text-[11px] font-semibold text-[#2B231F]"
                          >
                            {renderInclusionIcon(inc.icon)}
                            <span>{inc.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#2B231F]/10">
                      <button
                        onClick={() => onSelectTrip(trip)}
                        className="flex items-center gap-1.5 text-xs font-extrabold text-[#2B231F] hover:text-[#D4A373] transition-colors"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>View Full Itinerary</span>
                      </button>

                      <button
                        onClick={() => onSelectTrip(trip)}
                        className="w-8 h-8 rounded-full bg-[#1E1E1E] text-white flex items-center justify-center group-hover:bg-[#D4A373] transition-colors"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
