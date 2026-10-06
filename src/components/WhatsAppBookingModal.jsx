import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Users,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Sparkles,
  Phone,
  Copy,
  Check,
  ShieldCheck,
  Building,
  Info,
} from 'lucide-react';
import WhatsAppButton, { WhatsAppIcon } from './WhatsAppButton';
import {
  openWhatsApp,
  validateBooking,
  buildWhatsAppMessage,
  formatDisplayDate,
  calculateNights,
} from '../utils/whatsappUtils';
import { getWhatsAppNumber, formatPhoneNumber, WHATSAPP_CONFIG } from '../config/whatsappConfig';

// Helper to get formatted YYYY-MM-DD for today
function getTodayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper to calculate minimum check-out date (day after check-in)
function getMinCheckOut(checkInDateStr) {
  if (!checkInDateStr) return getTodayString();
  const d = new Date(checkInDateStr);
  d.setDate(d.getDate() + 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * WhatsAppBookingModal
 *
 * Implements the full 8-step WhatsApp Booking Flow:
 * 1. Select Resort/Property
 * 2. Select Room / Package
 * 3. Select Check-in and Check-out dates
 * 4. Enter Number of Guests
 * 5. Review Booking Information
 * 6. Click "Book via WhatsApp"
 * 7. Opens WhatsApp with pre-filled message
 * 8. Customer sends the message to resort/admin number
 *
 * @param {Object} props
 * @param {Object} props.trip - The active resort/trip object
 * @param {Function} props.onClose - Callback to close modal
 * @param {Function} [props.onOpenContact] - Fallback callback to open standard contact modal
 * @param {Object} [props.initialData] - Optional pre-filled data { checkIn, checkOut, guests, name, packageName }
 */
export default function WhatsAppBookingModal({
  trip,
  onClose,
  onOpenContact,
  initialData = {},
}) {
  const [step, setStep] = useState(1); // 1 = Details, 2 = Review, 3 = Confirmation
  
  // Form state initialized with reasonable defaults
  const [checkIn, setCheckIn] = useState(initialData.checkIn || '');
  const [checkOut, setCheckOut] = useState(initialData.checkOut || '');
  const [guests, setGuests] = useState(initialData.guests || 1);
  const [packageName, setPackageName] = useState(
    initialData.packageName || trip?.category || 'Standard Stay Package'
  );
  const [customerName, setCustomerName] = useState(initialData.name || '');
  const [specialRequests, setSpecialRequests] = useState(initialData.notes || '');

  // UI status
  const [fieldError, setFieldError] = useState('');
  const [waError, setWaError] = useState('');
  const [copied, setCopied] = useState(false);

  // If initialData provides valid dates and step requested, sync
  useEffect(() => {
    if (initialData.checkIn) setCheckIn(initialData.checkIn);
    if (initialData.checkOut) setCheckOut(initialData.checkOut);
    if (initialData.guests) setGuests(initialData.guests);
    if (initialData.packageName) setPackageName(initialData.packageName);
    if (initialData.name) setCustomerName(initialData.name);
  }, [initialData]);

  if (!trip) return null;

  const targetWhatsAppNumber = getWhatsAppNumber(trip);
  const formattedTargetNumber = formatPhoneNumber(targetWhatsAppNumber);
  const nights = calculateNights(checkIn, checkOut);
  const guestCount = parseInt(guests, 10) || 1;
  const totalPrice = trip.price ? trip.price * guestCount : null;

  // Available room / package options derived from trip inclusions & category
  const packageOptions = [
    trip.category ? `${trip.category} - Full Experience` : 'Standard Package',
    ...(trip.inclusions ? trip.inclusions.map((inc) => `${inc.text} Tier`) : []),
  ];

  /* ── Step 1 → Step 2: Validate fields before Review ── */
  const handleProceedToReview = (e) => {
    if (e) e.preventDefault();
    setFieldError('');

    const validation = validateBooking({ checkIn, checkOut, guests });
    if (!validation.valid) {
      setFieldError(validation.error);
      return;
    }

    setStep(2);
  };

  /* ── Step 2 → Step 3: Open WhatsApp with pre-filled message ── */
  const handleSendWhatsApp = () => {
    setWaError('');

    const result = openWhatsApp({
      trip,
      checkIn,
      checkOut,
      guests,
      packageName,
      customPrice: totalPrice,
      customerName,
      specialRequests,
    });

    if (result.success === false) {
      setWaError(result.error || "We couldn't open WhatsApp. Please try again or contact our booking team directly.");
      return;
    }

    setStep(3);
  };

  /* ── Copy message text fallback ── */
  const handleCopyMessage = () => {
    const rawMessage = buildWhatsAppMessage({
      trip,
      checkIn,
      checkOut,
      guests,
      packageName,
      customPrice: totalPrice,
      customerName,
      specialRequests,
    });

    navigator.clipboard.writeText(rawMessage).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  /* ── Fallback contact team ── */
  const handleContactFallback = () => {
    onClose();
    if (onOpenContact) {
      onOpenContact();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-modal-title"
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#2B231F]/15 my-auto max-h-[94vh] flex flex-col">
        
        {/* ── Modal Top Header ── */}
        <div className="bg-[#1E1E1E] text-white p-5 sm:p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-extrabold uppercase tracking-wider">
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>Instant WhatsApp Booking</span>
            </span>

            <span className="text-[11px] text-white/60 hidden sm:inline-block">
              Direct to: {formattedTargetNumber}
            </span>
          </div>

          <h3 id="whatsapp-modal-title" className="font-heading font-extrabold text-xl sm:text-2xl text-white leading-snug pr-8">
            {trip.title}
          </h3>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/75 mt-1.5">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
              {trip.location}
            </span>
            <span>•</span>
            <span className="text-[#D4A373] font-semibold">
              ₹{trip.price?.toLocaleString('en-IN')} / person
            </span>
            {trip.slotsLeft && (
              <>
                <span>•</span>
                <span className="text-emerald-400 font-medium">
                  {trip.slotsLeft} spots left
                </span>
              </>
            )}
          </div>

          {/* Step Progression Visualizer */}
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
            {[
              { num: 1, label: 'Trip Details' },
              { num: 2, label: 'Review Booking' },
              { num: 3, label: 'WhatsApp Ready' },
            ].map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step >= s.num
                        ? 'bg-[#25D366] text-[#1E1E1E]'
                        : 'bg-white/15 text-white/50'
                    }`}
                  >
                    {step > s.num ? <Check className="w-3.5 h-3.5 text-white stroke-[3]" /> : s.num}
                  </div>
                  <span
                    className={`text-xs font-semibold hidden sm:inline ${
                      step >= s.num ? 'text-white' : 'text-white/40'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < 2 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 rounded-full transition-all ${
                      step > s.num ? 'bg-[#25D366]' : 'bg-white/15'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── Modal Scrollable Body ── */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5 flex-1 bg-white">
          
          {/* ════════════════════════════════════════════════════════
              STEP 1: Selection of Room/Package, Dates & Guests
          ════════════════════════════════════════════════════════ */}
          {step === 1 && (
            <form onSubmit={handleProceedToReview} className="space-y-5">
              
              {/* Room or Package Tier Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2B231F] mb-1.5 flex items-center justify-between">
                  <span>Room or Package Tier *</span>
                  <span className="text-[11px] font-normal text-[#6E6660]">Customizable</span>
                </label>
                <div className="relative">
                  <select
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-[#2B231F]/20 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#25D366] bg-[#F9F8F6] text-[#2B231F]"
                  >
                    {packageOptions.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Check-in and Check-out Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2B231F] mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4A373]" />
                    <span>Check-in Date *</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={getTodayString()}
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      if (checkOut && checkOut <= e.target.value) {
                        setCheckOut('');
                      }
                      setFieldError('');
                    }}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-[#2B231F]/20 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#25D366] bg-[#F9F8F6] text-[#2B231F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2B231F] mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4A373]" />
                    <span>Check-out Date *</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={getMinCheckOut(checkIn)}
                    value={checkOut}
                    onChange={(e) => {
                      setCheckOut(e.target.value);
                      setFieldError('');
                    }}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-[#2B231F]/20 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#25D366] bg-[#F9F8F6] text-[#2B231F]"
                  />
                </div>
              </div>

              {/* Nights indicator */}
              {nights > 0 && (
                <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                  <span className="font-semibold">
                    📅 Stay Duration: {nights} Night{nights > 1 ? 's' : ''}
                  </span>
                  <span className="text-emerald-700 font-medium">
                    {formatDisplayDate(checkIn)} → {formatDisplayDate(checkOut)}
                  </span>
                </div>
              )}

              {/* Number of Guests Counter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2B231F] mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#D4A373]" />
                    <span>Number of Guests *</span>
                  </span>
                  {trip.slotsLeft && (
                    <span className="text-[11px] font-medium text-[#6E6660]">
                      Max {trip.slotsLeft} travelers for this group
                    </span>
                  )}
                </label>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F9F8F6] border border-[#2B231F]/15">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setGuests(Math.max(1, guestCount - 1))}
                      className="w-9 h-9 rounded-full bg-white border border-[#2B231F]/20 font-bold text-[#2B231F] flex items-center justify-center hover:bg-[#1E1E1E] hover:text-white transition-colors text-base"
                      aria-label="Decrease guests"
                    >
                      −
                    </button>
                    <span className="text-lg font-extrabold text-[#2B231F] w-8 text-center">
                      {guests}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuests(Math.min(trip.slotsLeft || 20, guestCount + 1))}
                      className="w-9 h-9 rounded-full bg-white border border-[#2B231F]/20 font-bold text-[#2B231F] flex items-center justify-center hover:bg-[#1E1E1E] hover:text-white transition-colors text-base"
                      aria-label="Increase guests"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-[#6E6660] block">Estimated Total</span>
                    <span className="text-lg sm:text-xl font-extrabold text-[#D4A373]">
                      ₹{totalPrice ? totalPrice.toLocaleString('en-IN') : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Guest Full Name (Optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2B231F] mb-1.5">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Maya Lin"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-[#2B231F]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] bg-[#F9F8F6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2B231F] mb-1.5">
                    Special Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vegetarian, anniversary..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-[#2B231F]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] bg-[#F9F8F6]"
                  />
                </div>
              </div>

              {/* Inline Validation Error Banner */}
              {fieldError && (
                <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>{fieldError}</span>
                </div>
              )}

              {/* Submit to Step 2 */}
              <button
                type="submit"
                className="w-full bg-[#1E1E1E] text-white hover:bg-[#25D366] hover:text-[#1E1E1E] font-extrabold py-4 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group font-heading"
              >
                <span>Review WhatsApp Message</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <p className="text-center text-[11px] text-[#6E6660] flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>No instant card charge. Direct WhatsApp confirmation with property concierge.</span>
              </p>
            </form>
          )}

          {/* ════════════════════════════════════════════════════════
              STEP 2: Review Booking Information & WhatsApp Preview
          ════════════════════════════════════════════════════════ */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#6E6660] hover:text-[#2B231F] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>
                <span className="text-xs font-bold text-[#25D366] uppercase tracking-wider">
                  Step 2 of 2
                </span>
              </div>

              {/* Review Card */}
              <div className="rounded-3xl border border-[#2B231F]/15 overflow-hidden shadow-sm">
                <div className="bg-[#1E1E1E] px-4 py-3 text-white flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Booking Summary Preview
                  </span>
                  <span className="text-[11px] text-[#D4A373] font-semibold">
                    {formattedTargetNumber}
                  </span>
                </div>

                <div className="divide-y divide-[#2B231F]/10 bg-[#F9F8F6]/60">
                  <div className="flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm">
                    <span className="text-[#6E6660] flex items-center gap-1.5 font-medium">
                      <span>🏨</span> Resort
                    </span>
                    <span className="font-bold text-[#2B231F] text-right">{trip.title}</span>
                  </div>

                  <div className="flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm">
                    <span className="text-[#6E6660] flex items-center gap-1.5 font-medium">
                      <span>📍</span> Location
                    </span>
                    <span className="font-semibold text-[#2B231F] text-right">{trip.location}</span>
                  </div>

                  <div className="flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm">
                    <span className="text-[#6E6660] flex items-center gap-1.5 font-medium">
                      <span>🛏️</span> Room/Package
                    </span>
                    <span className="font-semibold text-[#2B231F] text-right">{packageName}</span>
                  </div>

                  <div className="flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm">
                    <span className="text-[#6E6660] flex items-center gap-1.5 font-medium">
                      <span>📅</span> Check-in
                    </span>
                    <span className="font-bold text-emerald-800 text-right">{formatDisplayDate(checkIn)}</span>
                  </div>

                  <div className="flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm">
                    <span className="text-[#6E6660] flex items-center gap-1.5 font-medium">
                      <span>📅</span> Check-out
                    </span>
                    <span className="font-bold text-emerald-800 text-right">{formatDisplayDate(checkOut)}</span>
                  </div>

                  <div className="flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm">
                    <span className="text-[#6E6660] flex items-center gap-1.5 font-medium">
                      <span>👨‍👩‍👧</span> Guests
                    </span>
                    <span className="font-bold text-[#2B231F] text-right">
                      {guests} {guestCount > 1 ? 'Guests' : 'Guest'}
                    </span>
                  </div>

                  {totalPrice && (
                    <div className="flex items-center justify-between px-4 py-3 bg-[#D4A373]/15 text-sm sm:text-base">
                      <span className="text-[#2B231F] font-bold flex items-center gap-1.5">
                        <span>💰</span> Total Price
                      </span>
                      <span className="font-extrabold text-[#2B231F] text-right">
                        ₹{totalPrice.toLocaleString('en-IN')} INR
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Exact WhatsApp Message Box Preview */}
              <div className="rounded-2xl bg-[#ECE5DD]/40 border border-[#2B231F]/15 p-3.5 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#6E6660] font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1 text-[#075E54]">
                    <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                    WhatsApp Pre-filled Message Preview
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="flex items-center gap-1 text-[#2B231F] hover:text-[#25D366] transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-white p-3.5 rounded-xl shadow-xs text-xs font-mono text-[#2B231F] whitespace-pre-line border border-[#2B231F]/10 leading-relaxed max-h-40 overflow-y-auto">
                  {buildWhatsAppMessage({
                    trip,
                    checkIn,
                    checkOut,
                    guests,
                    packageName,
                    customPrice: totalPrice,
                    customerName,
                    specialRequests,
                  })}
                </div>
              </div>

              {/* Error banner if WhatsApp opening failed */}
              {waError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4.5 h-4.5 shrink-0 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-bold text-sm">We couldn't open WhatsApp.</p>
                      <p className="mt-0.5">{waError}</p>
                    </div>
                  </div>
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="px-3 py-1.5 rounded-lg bg-white border border-red-300 font-bold text-red-700 hover:bg-red-100"
                    >
                      Copy message & send manually
                    </button>
                  </div>
                </div>
              )}

              {/* Primary CTA: Book via WhatsApp */}
              <WhatsAppButton
                onClick={handleSendWhatsApp}
                label="Book via WhatsApp"
                size="lg"
                variant="primary"
                fullWidth
                badge="1-Tap Send"
              />

              {/* Fallback Option */}
              <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6E6660]">
                <button
                  type="button"
                  onClick={handleContactFallback}
                  className="hover:text-[#2B231F] underline flex items-center gap-1 font-medium"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Contact Booking Team Directly</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="hover:text-[#2B231F] font-semibold"
                >
                  Change Dates or Room
                </button>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════
              STEP 3: Confirmation / Success
          ════════════════════════════════════════════════════════ */}
          {step === 3 && (
            <div className="text-center py-6 px-2 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center mx-auto shadow-inner">
                <WhatsAppIcon className="w-9 h-9" />
              </div>

              <div>
                <h4 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2B231F]">
                  WhatsApp Ready! 🎉
                </h4>
                <p className="text-sm text-[#6E6660] mt-2 max-w-md mx-auto">
                  We have prepared your booking message for <strong>{trip.title}</strong>. Simply click <strong>Send</strong> in WhatsApp to verify availability with the resort team.
                </p>
              </div>

              {/* Mini summary badge */}
              <div className="p-4 rounded-2xl bg-[#F9F8F6] border border-[#2B231F]/10 text-left text-xs space-y-1.5 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-[#6E6660]">Resort:</span>
                  <span className="font-bold text-[#2B231F]">{trip.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E6660]">Stay Dates:</span>
                  <span className="font-bold text-[#2B231F]">{formatDisplayDate(checkIn)} → {formatDisplayDate(checkOut)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E6660]">Travelers:</span>
                  <span className="font-bold text-[#2B231F]">{guests} Guest{guestCount > 1 ? 's' : ''}</span>
                </div>
                {totalPrice && (
                  <div className="flex justify-between pt-1 border-t border-[#2B231F]/10">
                    <span className="text-[#6E6660] font-bold">Estimated Total:</span>
                    <span className="font-extrabold text-[#D4A373]">₹{totalPrice.toLocaleString('en-IN')} INR</span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold py-3.5 px-5 rounded-full text-sm transition-all shadow-md"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Open WhatsApp Again</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-[#1E1E1E] text-white hover:bg-[#D4A373] hover:text-[#1E1E1E] font-bold py-3.5 px-5 rounded-full text-sm transition-all"
                >
                  Done
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleContactFallback}
                  className="text-xs text-[#6E6660] hover:text-[#2B231F] underline"
                >
                  Need alternative assistance? Contact our booking team directly
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
