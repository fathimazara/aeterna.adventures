import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#2B231F]/10 my-auto">
        
        {/* Header */}
        <div className="bg-[#1E1E1E] text-white p-6 relative">
          <button
            onClick={() => {
              setSubmitted(false);
              onClose();
            }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-[#D4A373] text-xs font-bold uppercase tracking-wider mb-1">
            <Mail className="w-4 h-4" />
            <span>Get in Touch</span>
          </div>

          <h3 className="font-heading font-extrabold text-2xl">
            Contact Aeterna Adventures
          </h3>
          <p className="text-xs text-white/70 mt-1">
            We are here to help curate your dream staycation or adventure.
          </p>
        </div>

        {/* Form Body */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#D4A373]/20 text-[#D4A373] flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h4 className="font-heading text-2xl font-bold text-[#2B231F]">
              Message Received, {name}!
            </h4>

            <p className="text-sm text-[#6E6660]">
              Our travel concierges will get back to your email ({email}) within 2 hours.
            </p>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-[#1E1E1E] text-white hover:bg-[#D4A373] hover:text-[#1E1E1E] font-bold py-3 px-8 rounded-full text-sm transition-all mt-4"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#2B231F] mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Alex Rivera"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#2B231F]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2B231F] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#2B231F]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2B231F] mb-1">
                How can we help? *
              </label>
              <textarea
                rows="3"
                required
                placeholder="Tell us about your trip plans, preferred dates, or custom squad requests..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#2B231F]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1E1E1E] text-white hover:bg-[#D4A373] hover:text-[#1E1E1E] font-bold py-3.5 px-6 rounded-full transition-all shadow-lg flex items-center justify-center gap-2 font-heading"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>

            <div className="pt-2 border-t border-[#2B231F]/10 flex flex-col sm:flex-row justify-between text-xs text-[#6E6660] gap-2">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#D4A373]" />
                +1 (800) AETERNA-TRIP
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
                Seminyak & Almaty HQ
              </span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
