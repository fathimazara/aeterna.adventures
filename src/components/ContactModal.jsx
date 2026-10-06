import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock, Sparkles } from 'lucide-react';
import WhatsAppButton, { WhatsAppIcon } from './WhatsAppButton';
import { openWhatsAppConcierge } from '../utils/whatsappUtils';
import { WHATSAPP_CONFIG, formatPhoneNumber } from '../config/whatsappConfig';

export default function ContactModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [inquiryType, setInquiryType] = useState('Resort Booking');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppContact = () => {
    openWhatsAppConcierge({
      inquiryType,
      customText: message || 'I would like to inquire about booking availability and custom squad itineraries.',
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#2B231F]/15 my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#1E1E1E] text-white p-5 sm:p-6 relative shrink-0">
          <button
            onClick={() => {
              setSubmitted(false);
              onClose();
            }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-[#D4A373] text-xs font-bold uppercase tracking-wider mb-1">
            <Mail className="w-4 h-4" />
            <span>Concierge & Booking Team</span>
          </div>

          <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Get in Touch
          </h3>
          <p className="text-xs text-white/75 mt-1">
            We are here to help curate your dream staycation or answer any questions.
          </p>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 bg-white">
          
          {/* Direct Quick Contact Cards (WhatsApp & Email) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* WhatsApp Card */}
            <div className="p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex flex-col justify-between space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <WhatsAppIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#1E1E1E] block">WhatsApp / Phone</span>
                  <a
                    href={`tel:+${WHATSAPP_CONFIG.defaultNumber}`}
                    className="text-xs font-extrabold text-[#15803d] hover:underline"
                  >
                    +91 8547103872
                  </a>
                </div>
              </div>

              <WhatsAppButton
                onClick={handleWhatsAppContact}
                label="Chat on WhatsApp"
                size="sm"
                variant="primary"
                fullWidth
              />
            </div>

            {/* Direct Email Card */}
            <div className="p-4 rounded-2xl bg-[#D4A373]/10 border border-[#D4A373]/30 flex flex-col justify-between space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#D4A373] text-[#1E1E1E] flex items-center justify-center shrink-0 shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-[#1E1E1E] block">Official Email</span>
                  <a
                    href="mailto:hawkeyezmarketing@gmail.com"
                    className="text-xs font-extrabold text-[#2B231F] hover:text-[#D4A373] transition-colors truncate block"
                    title="Send email to hawkeyezmarketing@gmail.com"
                  >
                    hawkeyezmarketing@gmail.com
                  </a>
                </div>
              </div>

              <a
                href="mailto:hawkeyezmarketing@gmail.com"
                className="inline-flex items-center justify-center py-2 px-3 rounded-full bg-[#1E1E1E] text-white hover:bg-[#D4A373] hover:text-[#1E1E1E] text-xs font-bold transition-all text-center"
              >
                Send Email Directly
              </a>
            </div>

          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#2B231F]/10 w-full" />
            <span className="bg-white px-3 text-xs uppercase font-bold text-[#6E6660] shrink-0">
              Or Leave a Message Below
            </span>
            <div className="border-t border-[#2B231F]/10 w-full" />
          </div>

          {submitted ? (
            <div className="p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#D4A373]/20 text-[#D4A373] flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h4 className="font-heading text-2xl font-bold text-[#2B231F]">
                Message Received, {name}!
              </h4>

              <p className="text-sm text-[#6E6660]">
                Our travel concierges will get back to your email (<span className="font-bold text-[#2B231F]">{email}</span>) within 2 hours.
              </p>

              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="bg-[#1E1E1E] text-white hover:bg-[#D4A373] hover:text-[#1E1E1E] font-bold py-3 px-8 rounded-full text-xs transition-all mt-4"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold uppercase text-[#2B231F] mb-1">
                  Topic of Inquiry
                </label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#2B231F]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373] bg-[#F9F8F6]"
                >
                  <option value="Resort Booking">Resort & Staycation Booking</option>
                  <option value="Custom Squad Trip">Custom Group / Squad Trip</option>
                  <option value="Corporate Retreat">Corporate & Private Retreat</option>
                  <option value="General Question">General Question</option>
                </select>
              </div>

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
                <span>Send Email Inquiry</span>
              </button>

              <div className="pt-3 border-t border-[#2B231F]/10 flex flex-wrap items-center justify-between text-xs text-[#6E6660] gap-3">
                <a
                  href={`tel:+${WHATSAPP_CONFIG.defaultNumber}`}
                  className="flex items-center gap-1.5 text-[#2B231F] hover:text-[#D4A373] font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>+91 8547103872</span>
                </a>

                <a
                  href="mailto:hawkeyezmarketing@gmail.com"
                  className="flex items-center gap-1.5 text-[#2B231F] hover:text-[#D4A373] font-semibold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>hawkeyezmarketing@gmail.com</span>
                </a>

                <a
                  href="https://www.instagram.com/aeterna.adventures?stkn=cG40NWFmMXczcDR6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#2B231F] hover:text-[#D4A373] font-semibold transition-colors"
                  title="Follow @aeterna.adventures on Instagram"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  <span>Instagram</span>
                </a>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
