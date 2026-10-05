import React, { useState } from 'react';
import {
  X, Calendar, Users, MapPin, CheckCircle2,
  AlertCircle, ArrowRight, Phone, MessageSquare,
} from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';
import { openWhatsApp, validateBooking } from '../utils/whatsappUtils';

// WhatsApp SVG icon (inline, no dep)
function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

// Today's date string in YYYY-MM-DD for min attribute
function todayStr() {
  return new Date().toISOString().split('T')[0];
}

// Minimum check-out date (day after check-in)
function minCheckOut(checkIn) {
  if (!checkIn) return todayStr();
  const d = new Date(checkIn);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

// Calculate nights between two date strings
function calcNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const diff = new Date(checkOut) - new Date(checkIn);
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
}

/**
 * WhatsAppBookingModal
 *
 * Props:
 *  - trip: trip object from tripsData.js
 *  - onClose: function
 *  - onOpenContact: optional function — opens ContactModal as fallback
 */
export default function WhatsAppBookingModal({ trip, onClose, onOpenContact }) {
  const [step, setStep] = useState(1); // 1 = fill, 2 = review, 3 = success
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [packageName, setPackageName] = useState(trip?.category || '');
  const [fieldError, setFieldError] = useState('');
  const [waError, setWaError] = useState('');

  if (!trip) return null;

  const nights = calcNights(checkIn, checkOut);
  const totalPrice = trip.price * guests;

  /* ── Step 1 → 2: validate before showing review ── */
  const handleProceedToReview = () => {
    setFieldError('');
    const result = validateBooking({ checkIn, checkOut, guests });
    if (!result.valid) {
      setFieldError(result.error);
      return;
    }
    setStep(2);
  };

  /* ── Step 2 → WhatsApp ── */
  const handleSendWhatsApp = () => {
    setWaError('');
    const result = openWhatsApp({ trip, checkIn, checkOut, guests, packageName });
    if (result.success === false) {
      setWaError(result.error);
      return;
    }
    setStep(3);
  };

  /* ── Fallback contact handler ── */
  const handleContactFallback = () => {
    onClose();
    if (onOpenContact) onOpenContact();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="WhatsApp Booking"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#2B231F]/10 my-auto">

        {/* ── Header ── */}
        <div className="bg-[#1E1E1E] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-[#25D366] text-xs font-bold uppercase tracking-wider mb-2">
            <WhatsAppIcon className="w-4 h-4" />
            <span>Book via WhatsApp</span>
          </div>

          <h3 className="font-heading font-extrabold text-xl text-white leading-snug pr-8">
            {trip.title}
          </h3>
          <p className="text-xs text-white/60 mt-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
            {trip.location}
          </p>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-1">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    step >= s
                      ? 'bg-[#25D366] text-white'
                      : 'bg-white/15 text-white/40'
                  }`}
                >
                  {step > s ? <CheckCircle2 className="w-3.5 h-3.5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`h-0.5 w-8 rounded-full transition-all ${step > s ? 'bg-[#25D366]' : 'bg-white/15'}`} />
                )}
              </div>
            ))}
            <span className="ml-1 text-[10px] text-white/50 font-medium">
              {step === 1 ? 'Trip Details' : step === 2 ? 'Review & Send' : 'Sent!'}
            </span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            STEP 1 — Booking Details Form
        ══════════════════════════════════════════════ */}
        {step === 1 && (
          <div className="p-6 space-y-5">

            {/* Package selector */}
            <div>
              <label className="block text-xs font-bold text-[#2B231F] mb-1.5">
                Package / Room Type
              </label>
              <select
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#2B231F]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] bg-white"
              >
                <option value={trip.category}>{trip.category}</option>
                {trip.inclusions?.map((inc, i) => (
                  <option key={i} value={inc.text}>{inc.text}</option>
                ))}
              </select>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#2B231F] mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#D4A373]" />
                  Check-in *
                </label>
                <input
                  type="date"
                  min={todayStr()}
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    if (checkOut && checkOut <= e.target.value) setCheckOut('');
                    setFieldError('');
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#2B231F]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2B231F] mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#D4A373]" />
                  Check-out *
                </label>
                <input
                  type="date"
                  min={minCheckOut(checkIn)}
                  value={checkOut}
                  onChange={(e) => { setCheckOut(e.target.value); setFieldError(''); }}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#2B231F]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                />
              </div>
            </div>

            {/* Nights summary */}
            {nights > 0 && (
              <div className="flex items-center gap-2 text-xs text-[#6E6660] bg-[#F9F8F6] px-3 py-2 rounded-xl border border-[#2B231F]/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
                <span>{nights} night{nights > 1 ? 's' : ''}</span>
              </div>
            )}

            {/* Guests */}
            <div>
              <label className="block text-xs font-bold text-[#2B231F] mb-1.5 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#D4A373]" />
                Number of Guests *
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-9 h-9 rounded-full bg-[#F9F8F6] border border-[#2B231F]/20 font-bold text-[#2B231F] flex items-center justify-center hover:bg-[#2B231F] hover:text-white transition-colors"
                >
                  −
                </button>
                <span className="text-xl font-extrabold text-[#2B231F] w-6 text-center">
                  {guests}
                </span>
                <button
                  type="button"
                  onClick={() => setGuests(Math.min(trip.slotsLeft ?? 20, guests + 1))}
                  className="w-9 h-9 rounded-full bg-[#F9F8F6] border border-[#2B231F]/20 font-bold text-[#2B231F] flex items-center justify-center hover:bg-[#2B231F] hover:text-white transition-colors"
                >
                  +
                </button>
                <span className="text-xs text-[#6E6660]">
                  {trip.slotsLeft ? `(max ${trip.slotsLeft} seats)` : ''}
                </span>
              </div>
            </div>

            {/* Price preview */}
            {guests > 0 && (
              <div className="p-4 rounded-2xl bg-[#F9F8F6] border border-[#2B231F]/10 flex items-center justify-between">
                <div className="text-xs text-[#6E6660]">
                  ₹{trip.price.toLocaleString('en-IN')} × {guests} guest{guests > 1 ? 's' : ''}
                  {nights > 0 ? ` × ${nights} night${nights > 1 ? 's' : ''}` : ''}
                </div>
                <div className="text-xl font-extrabold text-[#D4A373]">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </div>
              </div>
            )}

            {/* Field error */}
            {fieldError && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{fieldError}</span>
              </div>
            )}

            <button
              type="button"
              onClick={handleProceedToReview}
              className="w-full bg-[#1E1E1E] text-white hover:bg-[#D4A373] hover:text-[#1E1E1E] font-bold py-3.5 px-6 rounded-full transition-all flex items-center justify-center gap-2 font-heading"
            >
              <span>Review Booking</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            STEP 2 — Review & Send
        ══════════════════════════════════════════════ */}
        {step === 2 && (
          <div className="p-6 space-y-5">
            <p className="text-sm text-[#6E6660]">
              Review your booking details below. When you click <strong>"Send via WhatsApp"</strong>, we will open WhatsApp with this information pre-filled — ready to send.
            </p>

            {/* Booking summary card */}
            <div className="rounded-2xl border border-[#2B231F]/10 overflow-hidden">
              <div className="bg-[#F9F8F6] px-4 py-2.5 text-xs font-bold uppercase text-[#6E6660] tracking-wide">
                Booking Summary
              </div>
              <div className="divide-y divide-[#2B231F]/8">
                {[
                  { emoji: '🏨', label: 'Resort', value: trip.title },
                  { emoji: '📍', label: 'Location', value: trip.location },
                  { emoji: '🛏️', label: 'Package', value: packageName },
                  {
                    emoji: '📅',
                    label: 'Check-in',
                    value: new Date(checkIn).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
                  },
                  {
                    emoji: '📅',
                    label: 'Check-out',
                    value: new Date(checkOut).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
                  },
                  { emoji: '👨‍👩‍👧', label: 'Guests', value: `${guests} Guest${guests > 1 ? 's' : ''}` },
                  { emoji: '💰', label: 'Estimated Total', value: `₹${totalPrice.toLocaleString('en-IN')} INR` },
                ].map(({ emoji, label, value }) => (
                  <div key={label} className="flex items-start justify-between px-4 py-3 text-sm">
                    <span className="text-[#6E6660] flex items-center gap-1.5">
                      <span>{emoji}</span>
                      <span>{label}</span>
                    </span>
                    <span className="font-semibold text-[#2B231F] text-right max-w-[55%]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp error */}
            {waError && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold mb-1">Couldn't open WhatsApp</p>
                  <p>{waError}</p>
                </div>
              </div>
            )}

            <WhatsAppButton
              onClick={handleSendWhatsApp}
              label="Send via WhatsApp"
              size="lg"
              variant="primary"
              className="w-full"
            />

            {/* Fallback */}
            <button
              type="button"
              onClick={handleContactFallback}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-[#2B231F]/20 text-sm font-semibold text-[#6E6660] hover:text-[#2B231F] hover:border-[#2B231F]/40 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Booking Team Instead</span>
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-center text-xs text-[#6E6660] hover:text-[#2B231F] transition-colors py-1"
            >
              ← Edit booking details
            </button>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            STEP 3 — Success
        ══════════════════════════════════════════════ */}
        {step === 3 && (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#25D366]/15 flex items-center justify-center mx-auto">
              <WhatsAppIcon className="w-9 h-9 text-[#25D366]" />
            </div>

            <h4 className="font-heading text-2xl font-bold text-[#2B231F]">
              WhatsApp Opened! 🎉
            </h4>

            <p className="text-sm text-[#6E6660] leading-relaxed">
              Your booking details have been pre-filled in WhatsApp. Simply <strong>press Send</strong> to confirm your booking with our team.
            </p>

            <div className="p-4 rounded-2xl bg-[#F9F8F6] border border-[#2B231F]/10 text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#6E6660]">Trip:</span>
                <span className="font-bold text-[#2B231F]">{trip.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E6660]">Guests:</span>
                <span className="font-bold text-[#2B231F]">{guests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E6660]">Est. Total:</span>
                <span className="font-bold text-[#D4A373]">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#6E6660]">
              Our booking team typically responds within 30 minutes during business hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5C] text-white font-bold py-3 px-5 rounded-full text-sm transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Open WhatsApp Again</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-[#1E1E1E] text-white hover:bg-[#D4A373] hover:text-[#1E1E1E] font-bold py-3 px-5 rounded-full text-sm transition-all"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
