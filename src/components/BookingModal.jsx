import React, { useState } from 'react';
import { X, Calendar, Users, DollarSign, CheckCircle2, Sparkles, Shield, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingModal({ trip, onClose, onBookingSuccess }) {
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!trip) return null;

  const totalPrice = trip.price * guests;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Trigger celebratory confetti animation
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4A373', '#1E1E1E', '#F9F8F6', '#2B231F']
    });

    if (onBookingSuccess) {
      onBookingSuccess({
        tripTitle: trip.title,
        guests,
        totalPrice,
        name
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#2B231F]/10 my-auto">
        
        {/* Top Accent Header */}
        <div className="bg-[#1E1E1E] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2 text-[#D4A373] text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>Reserve Your Seat</span>
          </div>

          <h3 className="font-heading font-extrabold text-2xl text-white">
            {trip.title}
          </h3>
          <p className="text-xs text-white/70 mt-1">
            {trip.location} • {trip.dateRange}
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#D4A373]/20 text-[#D4A373] flex items-center justify-center mx-auto mb-2 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h4 className="font-heading text-2xl font-bold text-[#2B231F]">
              Seat Reserved, {name}! 🎉
            </h4>

            <p className="text-sm text-[#6E6660]">
              We have sent a confirmation email to <span className="font-bold text-[#2B231F]">{email}</span> with your itinerary details and trip concierges contact.
            </p>

            <div className="p-4 rounded-2xl bg-[#F9F8F6] border border-[#2B231F]/10 text-left text-xs space-y-1">
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
                <span className="font-bold text-[#D4A373]">${totalPrice} USD</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-[#1E1E1E] text-white hover:bg-[#D4A373] hover:text-[#1E1E1E] font-bold py-3.5 px-6 rounded-full transition-all text-sm mt-4"
            >
              Done & Explore More
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
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
                  >
                    -
                  </button>
                  <span className="font-bold text-base text-[#2B231F] w-4 text-center">
                    {guests}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuests(Math.min(trip.slotsLeft, guests + 1))}
                    className="w-8 h-8 rounded-full bg-white border border-[#2B231F]/20 font-bold text-[#2B231F] flex items-center justify-center hover:bg-[#2B231F] hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-[#6E6660] block">Total Amount</span>
                <span className="text-2xl font-extrabold text-[#D4A373]">
                  ${totalPrice.toLocaleString()}
                </span>
                <span className="text-[11px] text-[#6E6660] block">(${trip.price} x {guests})</span>
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
                  placeholder="+1 (555) 000-0000"
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

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#1E1E1E] text-white hover:bg-[#D4A373] hover:text-[#1E1E1E] font-bold py-3.5 px-6 rounded-full transition-all shadow-lg flex items-center justify-center gap-2 font-heading"
              >
                <Sparkles className="w-4 h-4 text-[#D4A373]" />
                <span>Confirm & Reserve (${totalPrice})</span>
              </button>
            </div>

            <p className="text-center text-[11px] text-[#6E6660] flex items-center justify-center gap-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Zero cancellation fees up to 14 days before trip start.</span>
            </p>

          </form>
        )}

      </div>
    </div>
  );
}
