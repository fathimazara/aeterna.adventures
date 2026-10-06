import React, { useState } from 'react';
import {
  X,
  Calendar,
  Users,
  DollarSign,
  CheckCircle2,
  Sparkles,
  Shield,
  Compass,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import WhatsAppButton, { WhatsAppIcon } from './WhatsAppButton';
import { getWhatsAppNumber, formatPhoneNumber } from '../config/whatsappConfig';

export default function BookingModal({ trip, onClose, onBookingSuccess, onSwitchToWhatsApp }) {
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!trip) return null;

  const totalPrice = trip.price * guests;
  const propertyPhone = formatPhoneNumber(getWhatsAppNumber(trip));

  const handleWhatsAppSwitch = () => {
    onClose();
    if (onSwitchToWhatsApp) {
      onSwitchToWhatsApp(trip, {
        guests,
        name,
        notes,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Trigger celebratory confetti animation
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4A373', '#1E1E1E', '#F9F8F6', '#2B231F', '#25D366'],
    });

    if (onBookingSuccess) {
      onBookingSuccess({
        tripTitle: trip.title,
        guests,
        totalPrice,
        name,
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#2B231F]/15 my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Accent Header */}
        <div className="bg-[#1E1E1E] text-white p-5 sm:p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2 text-[#D4A373] text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>Booking & Checkout</span>
          </div>

          <h3 className="font-heading font-extrabold text-2xl text-white">
            {trip.title}
          </h3>
          <p className="text-xs text-white/70 mt-1">
            {trip.location} • {trip.dateRange}
          </p>
        </div>

        {/* Scrollable Container */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* Quick WhatsApp Alternative Banner at top of checkout */}
          {!isSubmitted && (
            <div className="p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-left">
                <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <WhatsAppIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#15803d] block">
                    Prefer Instant Confirmation?
                  </span>
                  <span className="text-[11px] text-[#2B231F]/80 block">
                    Book directly with resort concierge on WhatsApp
                  </span>
                </div>
              </div>

              <WhatsAppButton
                onClick={handleWhatsAppSwitch}
                label="Book via WhatsApp"
                size="sm"
                variant="primary"
                className="shrink-0 w-full sm:w-auto"
              />
            </div>
          )}

          {isSubmitted ? (
            <div className="p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#D4A373]/20 text-[#D4A373] flex items-center justify-center mx-auto mb-2 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h4 className="font-heading text-2xl font-bold text-[#2B231F]">
                Seat Reserved, {name}! 🎉
              </h4>

              <p className="text-sm text-[#6E6660]">
                We have sent a confirmation email to <span className="font-bold text-[#2B231F]">{email}</span> with your itinerary details and trip concierge contact.
              </p>

              <div className="p-4 rounded-2xl bg-[#F9F8F6] border border-[#2B231F]/10 text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#6E6660]">Reservation Code:</span>
                  <span className="font-mono font-bold text-[#2B231F]">AETERNA-8842</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E6660]">Travelers:</span>
                  <span className="font-bold text-[#2B231F]">{guests} Guest(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E6660]">Total Reserved:</span>
                  <span className="font-bold text-[#D4A373]">₹{totalPrice.toLocaleString('en-IN')} INR</span>
                </div>
              </div>

              {/* Also offer to connect via WhatsApp after submission */}
              <div className="pt-2">
                <WhatsAppButton
                  onClick={handleWhatsAppSwitch}
                  label="Connect with Concierge on WhatsApp"
                  size="md"
                  variant="primary"
                  fullWidth
                />
              </div>

              <button
                onClick={onClose}
                className="w-full bg-[#1E1E1E] text-white hover:bg-[#D4A373] hover:text-[#1E1E1E] font-bold py-3 px-6 rounded-full transition-all text-xs"
              >
                Done & Explore More
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Guest Counter & Price Summary */}
              <div className="p-4 rounded-2xl bg-[#F9F8F6] border border-[#2B231F]/10 flex items-center justify-between">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#6E6660]">
                    Number of Seats
                  </label>
                  <div className="flex items-center gap-3 mt-1.5">
                    <button
                      type="button"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-8 h-8 rounded-full bg-white border border-[#2B231F]/20 font-bold text-[#2B231F] flex items-center justify-center hover:bg-[#2B231F] hover:text-white transition-colors"
                      aria-label="Decrease seats"
                    >
                      -
                    </button>
                    <span className="font-bold text-base text-[#2B231F] w-4 text-center">
                      {guests}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuests(Math.min(trip.slotsLeft || 20, guests + 1))}
                      className="w-8 h-8 rounded-full bg-white border border-[#2B231F]/20 font-bold text-[#2B231F] flex items-center justify-center hover:bg-[#2B231F] hover:text-white transition-colors"
                      aria-label="Increase seats"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-[#6E6660] block">Total Amount</span>
                  <span className="text-2xl font-extrabold text-[#D4A373]">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-[#6E6660] block">(₹{trip.price.toLocaleString('en-IN')} x {guests})</span>
                </div>
              </div>

              {/* Input Fields */}
              <div>
                <label className="block text-xs font-bold text-[#2B231F] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2B231F]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2B231F] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="maya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#2B231F]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2B231F] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 85471 03872"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#2B231F]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2B231F] mb-1">
                  Dietary & Special Notes (Optional)
                </label>
                <textarea
                  rows="2"
                  placeholder="e.g. Vegetarian diet, surf level beginner..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-[#2B231F]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                ></textarea>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full bg-[#1E1E1E] text-white hover:bg-[#D4A373] hover:text-[#1E1E1E] font-bold py-3.5 px-6 rounded-full transition-all shadow-lg flex items-center justify-center gap-2 font-heading"
                >
                  <Sparkles className="w-4 h-4 text-[#D4A373]" />
                  <span>Confirm Reservation (₹{totalPrice.toLocaleString('en-IN')})</span>
                </button>

                <WhatsAppButton
                  onClick={handleWhatsAppSwitch}
                  label="Or Book via WhatsApp Directly"
                  size="md"
                  variant="outline"
                  fullWidth
                />
              </div>

              <p className="text-center text-[11px] text-[#6E6660] flex items-center justify-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>Zero cancellation fees up to 14 days before trip start.</span>
              </p>

            </form>
          )}

        </div>
      </div>
    </div>
  );
}
