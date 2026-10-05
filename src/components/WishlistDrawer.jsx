import React from 'react';
import { X, Heart, Trash2, ArrowRight } from 'lucide-react';
import { TRIPS } from '../data/tripsData';

export default function WishlistDrawer({ isOpen, onClose, wishlist, onRemoveWishlist, onSelectTrip }) {
  if (!isOpen) return null;

  const savedTrips = TRIPS.filter((t) => wishlist.includes(t.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-[#1E1E1E] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#D4A373] fill-[#D4A373]" />
            <h3 className="font-heading font-extrabold text-xl">Saved Destinations ({savedTrips.length})</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {savedTrips.length === 0 ? (
            <div className="text-center py-16 text-[#6E6660] space-y-3">
              <Heart className="w-12 h-12 text-[#2B231F]/20 mx-auto" />
              <p className="text-sm font-semibold">Your saved list is empty.</p>
              <p className="text-xs">Click the heart icon on any destination card to bookmark your dream trip!</p>
            </div>
          ) : (
            savedTrips.map((trip) => (
              <div
                key={trip.id}
                className="flex items-center gap-4 p-3.5 rounded-2xl border border-[#2B231F]/10 bg-[#F9F8F6] hover:bg-white transition-all group"
              >
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-20 h-20 rounded-xl object-cover"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#D4A373] uppercase">{trip.category}</span>
                  <h4 className="font-heading font-bold text-sm text-[#2B231F] truncate group-hover:text-[#D4A373] transition-colors">
                    {trip.title}
                  </h4>
                  <p className="text-xs text-[#6E6660] font-medium">₹{trip.price.toLocaleString('en-IN')} INR</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectTrip(trip);
                    }}
                    className="p-2 rounded-full bg-[#1E1E1E] text-white hover:bg-[#D4A373] hover:text-[#1E1E1E] transition-colors"
                    title="View Trip"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onRemoveWishlist(trip.id)}
                    className="p-2 rounded-full text-[#6E6660] hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedTrips.length > 0 && (
          <div className="p-6 bg-[#F9F8F6] border-t border-[#2B231F]/10">
            <button
              onClick={() => {
                onClose();
                const destSec = document.getElementById('destinations-section');
                if (destSec) destSec.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3 px-4 rounded-full bg-[#1E1E1E] text-white hover:bg-[#D4A373] hover:text-[#1E1E1E] text-xs font-bold transition-all shadow-md"
            >
              Explore More Places
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
