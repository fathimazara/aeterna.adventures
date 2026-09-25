import React, { useState } from 'react';
import { X, MapPin, Calendar, Star, Users, CheckCircle, Bed, Car, Utensils, Compass, ArrowRight, ShieldCheck } from 'lucide-react';

export default function DetailModal({ trip, onClose, onBookNow }) {
  const [activeImage, setActiveImage] = useState(trip?.image || '');

  if (!trip) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/65 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#2B231F]/10 max-h-[90vh] flex flex-col my-auto">
        
        {/* Modal Header Bar */}
        <div className="relative h-72 sm:h-80 w-full shrink-0">
          <img
            src={activeImage}
            alt={trip.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#D4A373] text-[#1E1E1E] px-3 py-1 rounded-full text-xs font-bold">
                  {trip.category}
                </span>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
                  • {trip.slotsLeft} Spots Left
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold drop-shadow-md">
                {trip.title}
              </h2>
              <p className="text-sm text-white/80 flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-[#D4A373]" />
                <span>{trip.location}</span>
                <span className="mx-1">•</span>
                <Calendar className="w-4 h-4 text-[#D4A373]" />
                <span>{trip.dateRange}</span>
              </p>
            </div>

            <div className="text-right sm:text-right">
              <span className="text-xs uppercase text-white/70 block">Price per seat</span>
              <span className="text-3xl font-extrabold text-[#D4A373]">${trip.price}</span>
            </div>
          </div>
        </div>

        {/* Gallery Thumbnails if multiple */}
        {trip.images && trip.images.length > 1 && (
          <div className="flex items-center gap-2 px-6 py-3 bg-[#F9F8F6] border-b border-[#2B231F]/10 overflow-x-auto">
            {trip.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="Gallery thumbnail"
                onClick={() => setActiveImage(img)}
                className={`w-16 h-12 rounded-lg object-cover cursor-pointer border-2 transition-all ${
                  activeImage === img ? 'border-[#D4A373] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        )}

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* Overview Section */}
          <div>
            <h3 className="font-heading font-bold text-xl text-[#2B231F] mb-2">Trip Overview</h3>
            <p className="text-base text-[#6E6660] leading-relaxed">
              {trip.description}
            </p>
          </div>

          {/* Inclusions & Highlights Grid */}
          <div>
            <h3 className="font-heading font-bold text-xl text-[#2B231F] mb-3">Included in Package</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {trip.inclusions.map((inc, i) => (
                <div key={i} className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F9F8F6] border border-[#2B231F]/10">
                  <CheckCircle className="w-5 h-5 text-[#D4A373] shrink-0" />
                  <span className="text-sm font-semibold text-[#2B231F]">{inc.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary Timeline */}
          {trip.itinerary && (
            <div>
              <h3 className="font-heading font-bold text-xl text-[#2B231F] mb-4">Curated Itinerary</h3>
              <div className="space-y-4">
                {trip.itinerary.map((step, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl border border-[#2B231F]/10 bg-white">
                    <span className="shrink-0 px-3 py-1 rounded-full bg-[#1E1E1E] text-white font-bold text-xs self-start">
                      {step.day}
                    </span>
                    <div>
                      <h4 className="font-bold text-base text-[#2B231F]">{step.title}</h4>
                      <p className="text-sm text-[#6E6660] mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trust note */}
          <div className="p-4 rounded-2xl bg-[#D4A373]/15 border border-[#D4A373]/30 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#2B231F] shrink-0" />
            <p className="text-xs text-[#2B231F] font-medium">
              Flexible 100% cancellation refund up to 14 days before departure. Small intimate group capped at max 8 travelers.
            </p>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 bg-[#F9F8F6] border-t border-[#2B231F]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-[#6E6660]">Total per person</span>
            <div className="text-2xl font-extrabold text-[#2B231F]">${trip.price} USD</div>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookNow(trip);
            }}
            className="w-full sm:w-auto bg-[#1E1E1E] text-white hover:bg-[#D4A373] hover:text-[#1E1E1E] font-bold py-3.5 px-8 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg font-heading"
          >
            <span>Book a Seat</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
