import React, { useState } from 'react';
import {
  X,
  MapPin,
  Calendar,
  Star,
  Users,
  CheckCircle,
  Bed,
  Car,
  Utensils,
  Compass,
  ArrowRight,
  ShieldCheck,
  Phone,
  Sparkles,
} from 'lucide-react';
import WhatsAppButton, { WhatsAppIcon } from './WhatsAppButton';
import { getWhatsAppNumber, formatPhoneNumber } from '../config/whatsappConfig';

export default function DetailModal({ trip, onClose, onBookNow, onBookWhatsApp }) {
  const [activeImage, setActiveImage] = useState(trip?.image || '');
  const [selectedPackageTier, setSelectedPackageTier] = useState(trip?.category || '');

  if (!trip) return null;

  const propertyWhatsAppNumber = formatPhoneNumber(getWhatsAppNumber(trip));

  const handleWhatsAppBooking = (customPackageName) => {
    onClose();
    if (onBookWhatsApp) {
      onBookWhatsApp(trip, {
        packageName: customPackageName || selectedPackageTier || trip.category,
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#2B231F]/15 max-h-[92vh] flex flex-col my-auto">
        
        {/* Modal Header Hero Image Bar */}
        <div className="relative h-72 sm:h-84 w-full shrink-0">
          <img
            src={activeImage}
            alt={trip.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top WhatsApp verified pill */}
          <div className="absolute top-4 left-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#25D366]/40 text-[#25D366] text-xs font-extrabold shadow-lg">
              <WhatsAppIcon className="w-4 h-4" />
              <span>Resort WhatsApp: {propertyWhatsAppNumber}</span>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#D4A373] text-[#1E1E1E] px-3 py-1 rounded-full text-xs font-extrabold">
                  {trip.category}
                </span>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
                  • {trip.slotsLeft} Spots Left
                </span>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
                  ★ {trip.rating || '4.95'} ({trip.reviewsCount || 120} reviews)
                </span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold drop-shadow-md">
                {trip.title}
              </h2>

              <p className="text-sm text-white/85 flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-[#D4A373]" />
                <span>{trip.location}</span>
                <span className="mx-1">•</span>
                <Calendar className="w-4 h-4 text-[#D4A373]" />
                <span>{trip.dateRange}</span>
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs uppercase text-white/70 block font-semibold">Price per traveler</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-[#D4A373]">
                ₹{trip.price.toLocaleString('en-IN')}
              </span>
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
                className={`w-16 h-12 rounded-lg object-cover cursor-pointer border-2 transition-all shrink-0 ${
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
            <h3 className="font-heading font-bold text-xl text-[#2B231F] mb-2">Trip & Property Overview</h3>
            <p className="text-base text-[#6E6660] leading-relaxed">
              {trip.description}
            </p>
          </div>

          {/* Room / Package Inclusions & Direct Package WhatsApp CTA */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading font-bold text-xl text-[#2B231F]">
                Included in Room & Package
              </h3>
              <span className="text-xs font-bold text-[#25D366] flex items-center gap-1">
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>Bookable via WhatsApp</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {trip.inclusions.map((inc, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F9F8F6] border border-[#2B231F]/10 hover:border-[#D4A373] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#D4A373] shrink-0" />
                    <span className="text-sm font-semibold text-[#2B231F]">{inc.text}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppBooking(inc.text)}
                    className="text-[11px] font-bold text-[#25D366] group-hover:underline px-2 py-1 rounded-md bg-[#25D366]/10 hover:bg-[#25D366] hover:text-white transition-all shrink-0"
                    title={`Book ${inc.text} package via WhatsApp`}
                  >
                    Book This
                  </button>
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
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl border border-[#2B231F]/10 bg-white shadow-xs">
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

          {/* WhatsApp Direct Guarantee Banner */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950 via-[#1E1E1E] to-[#1E1E1E] text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-emerald-800/40 shadow-md">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] shrink-0">
                <WhatsAppIcon className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm sm:text-base text-white">
                  Direct Resort WhatsApp Booking
                </h4>
                <p className="text-xs text-white/70 mt-0.5">
                  Pre-filled dates, transparent pricing, and direct team confirmation.
                </p>
              </div>
            </div>

            <WhatsAppButton
              onClick={() => handleWhatsAppBooking()}
              label="Book via WhatsApp"
              size="sm"
              variant="primary"
              className="shrink-0"
            />
          </div>

          {/* Trust note */}
          <div className="p-4 rounded-2xl bg-[#D4A373]/15 border border-[#D4A373]/30 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#2B231F] shrink-0" />
            <p className="text-xs text-[#2B231F] font-medium">
              Flexible 100% cancellation refund up to 14 days before departure. Intimate boutique groups capped for maximum comfort.
            </p>
          </div>

        </div>

        {/* Modal Footer Sticky CTA */}
        <div className="p-5 sm:p-6 bg-[#F9F8F6] border-t border-[#2B231F]/10 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div>
            <span className="text-xs text-[#6E6660] block font-medium">Total starting price</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#2B231F]">
              ₹{trip.price.toLocaleString('en-IN')}
              <span className="text-xs font-normal text-[#6E6660] ml-1">/ seat</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Primary Option 1: Book via WhatsApp */}
            <WhatsAppButton
              onClick={() => handleWhatsAppBooking()}
              label="Book via WhatsApp"
              size="md"
              variant="primary"
              className="flex-1 sm:flex-none shadow-lg"
              badge="Instant"
            />

            {/* Option 2: Standard Checkout Modal */}
            <button
              onClick={() => {
                onClose();
                onBookNow(trip);
              }}
              className="flex-1 sm:flex-none bg-[#1E1E1E] text-white hover:bg-[#D4A373] hover:text-[#1E1E1E] font-bold py-3 px-6 rounded-full transition-all flex items-center justify-center gap-2 shadow-md text-sm font-heading"
            >
              <span>Standard Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
