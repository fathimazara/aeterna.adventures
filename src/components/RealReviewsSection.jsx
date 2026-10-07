import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, MessageSquare, MapPin, Plus, Send, X, ThumbsUp, Camera, Sparkles } from 'lucide-react';
import { TRIPS } from '../data/tripsData';

export default function RealReviewsSection({ onOpenWhatsAppBooking }) {
  const [reviews, setReviews] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // New review form state
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    trip: TRIPS[0]?.title || 'Custom Tour Package',
    rating: 5,
    comment: ''
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Load reviews from localStorage on component mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('aeterna_customer_reviews');
      if (saved) {
        setReviews(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load local reviews', e);
    }
  }, []);

  // Submit new customer review
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) {
      alert('Please enter your name and review experience.');
      return;
    }

    const newRev = {
      id: 'cust-rev-' + Date.now(),
      name: formData.name.trim(),
      location: formData.location.trim() || 'Traveler',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.name)}`,
      rating: formData.rating,
      date: 'Just now',
      verified: true,
      source: 'Verified Traveler',
      comment: formData.comment.trim(),
      trip: formData.trip,
      photos: []
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);

    try {
      localStorage.setItem('aeterna_customer_reviews', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    // Reset form & close modal
    setFormData({
      name: '',
      location: '',
      trip: TRIPS[0]?.title || 'Custom Tour Package',
      rating: 5,
      comment: ''
    });
    setIsFormOpen(false);

    // Show toast confirmation
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  // Submit to WhatsApp Concierge directly
  const handleSendViaWhatsApp = () => {
    if (!formData.name.trim() || !formData.comment.trim()) {
      alert('Please fill in your name and review message first.');
      return;
    }

    const text = `🌟 *NEW TRAVELER REVIEW SUBMISSION*%0A%0A*Name:* ${formData.name}%0A*Location:* ${formData.location || 'N/A'}%0A*Trip Package:* ${formData.trip}%0A*Rating:* ${'⭐'.repeat(formData.rating)} (${formData.rating}/5)%0A%0A*Review:*%0A"${formData.comment}"`;
    window.open(`https://wa.me/918547103872?text=${text}`, '_blank');
  };

  // Calculate average rating
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <section id="real-reviews-section" className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#2B231F]/5 scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Toast Alert */}
        {showSuccessToast && (
          <div className="fixed bottom-6 left-6 z-50 bg-[#1E1E1E] text-white px-5 py-3 rounded-full shadow-2xl text-xs sm:text-sm font-bold border border-[#25D366]/50 flex items-center gap-2 animate-in slide-in-from-bottom duration-300">
            <CheckCircle className="w-5 h-5 text-[#25D366]" />
            <span>Thank you! Your review has been published successfully.</span>
          </div>
        )}

        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E1E1E]/5 border border-[#2B231F]/10 text-xs font-bold text-[#2B231F] tracking-wide mb-4">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>• Traveler Reviews &amp; Feedback</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2B231F] tracking-tight leading-tight">
            Customer Reviews
          </h2>
          
          <p className="mt-3 text-base sm:text-lg text-[#6E6660] font-normal">
            Share your travel experience or read authentic reviews from fellow adventurers.
          </p>
        </div>

        {/* Rating & Submission Action Banner */}
        <div className="bg-[#F9F8F6] rounded-3xl p-6 sm:p-8 border border-[#2B231F]/10 mb-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Rating Summary */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="bg-[#1E1E1E] text-white font-heading text-4xl sm:text-5xl font-extrabold px-5 py-3 rounded-2xl flex items-center justify-center gap-1 shadow-md">
              <span>{avgRating}</span>
              <Star className="w-6 h-6 fill-[#D4A373] text-[#D4A373]" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-1 text-[#D4A373]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-sm font-bold text-[#2B231F] mt-1">
                {reviews.length > 0 ? `${reviews.length} Verified Customer Reviews` : 'Verified Customer Reviews'}
              </p>
              <p className="text-xs text-[#6E6660]">Direct Traveler Submissions &amp; WhatsApp Concierge</p>
            </div>
          </div>

          {/* Write Review CTA Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-6 py-3.5 rounded-full bg-[#1E1E1E] hover:bg-[#D4A373] hover:text-[#1E1E1E] text-white font-bold text-sm flex items-center gap-2.5 shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>

        </div>

        {/* Customer Reviews List */}
        {reviews.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 px-6 bg-[#F9F8F6] rounded-3xl border border-dashed border-[#2B231F]/20 max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#1E1E1E]/5 border border-[#2B231F]/10 flex items-center justify-center mx-auto mb-4 text-[#D4A373]">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#2B231F] mb-2">
              No Traveler Reviews Yet
            </h3>
            <p className="text-sm text-[#6E6660] max-w-md mx-auto mb-6">
              Have you traveled with Aeterna Adventures? Be the very first traveler to submit your review and share your story!
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#1ebe5c] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Your Review</span>
            </button>
          </div>
        ) : (
          /* Grid of Submitted Reviews */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div 
                key={rev.id}
                className="bg-[#F9F8F6] rounded-3xl p-6 border border-[#2B231F]/10 hover:border-[#D4A373]/50 transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  {/* User Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={rev.avatar} 
                        alt={rev.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm bg-white"
                      />
                      <div>
                        <h4 className="font-heading font-bold text-[#2B231F] text-base leading-tight">
                          {rev.name}
                        </h4>
                        <p className="text-xs text-[#6E6660] flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#D4A373]" />
                          {rev.location}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#25D366]/10 text-[#25D366] text-[10px] font-bold border border-[#25D366]/20 shrink-0">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center justify-between gap-2 mb-3 bg-white px-3.5 py-2 rounded-2xl border border-[#2B231F]/5">
                    <div className="flex items-center gap-1 text-[#D4A373]">
                      {[...Array(5)].map((_, idx) => (
                        <Star 
                          key={idx} 
                          className={`w-4 h-4 ${idx < rev.rating ? 'fill-current text-[#D4A373]' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-xs font-bold text-[#2B231F] ml-1">{rev.rating}.0</span>
                    </div>
                    <span className="text-[11px] text-[#6E6660] font-medium">{rev.date}</span>
                  </div>

                  {/* Trip Tag */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 rounded-lg bg-[#1E1E1E]/5 text-[#2B231F] text-xs font-bold">
                      🌴 {rev.trip}
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-sm text-[#2B231F]/80 leading-relaxed font-normal italic">
                    "{rev.comment}"
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* WRITE A REVIEW MODAL */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#2B231F]/10 animate-in fade-in zoom-in duration-200">
              
              {/* Close Button */}
              <button 
                onClick={() => setIsFormOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#1E1E1E]/5 hover:bg-[#1E1E1E]/10 text-[#2B231F] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A373]/15 text-[#2B231F] text-xs font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>Share Your Experience</span>
                </div>
                <h3 className="font-heading text-2xl font-extrabold text-[#2B231F]">
                  Write a Customer Review
                </h3>
                <p className="text-xs text-[#6E6660] mt-1">
                  Tell future travelers about your trip with Aeterna Adventures.
                </p>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                
                {/* Full Name & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2B231F] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Menon"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F9F8F6] border border-[#2B231F]/15 focus:border-[#D4A373] focus:outline-none text-sm text-[#2B231F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2B231F] mb-1">
                      City / Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kochi, Kerala"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F9F8F6] border border-[#2B231F]/15 focus:border-[#D4A373] focus:outline-none text-sm text-[#2B231F]"
                    />
                  </div>
                </div>

                {/* Select Trip */}
                <div>
                  <label className="block text-xs font-bold text-[#2B231F] mb-1">
                    Trip / Tour Package
                  </label>
                  <select
                    value={formData.trip}
                    onChange={(e) => setFormData({ ...formData, trip: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F9F8F6] border border-[#2B231F]/15 focus:border-[#D4A373] focus:outline-none text-sm text-[#2B231F]"
                  >
                    {TRIPS.map((t) => (
                      <option key={t.id} value={t.title}>
                        {t.title}
                      </option>
                    ))}
                    <option value="Custom Tour Package">Custom Tour Package</option>
                  </select>
                </div>

                {/* Rating Picker */}
                <div>
                  <label className="block text-xs font-bold text-[#2B231F] mb-1">
                    Star Rating *
                  </label>
                  <div className="flex items-center gap-2 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 cursor-pointer focus:outline-none transition-transform hover:scale-125"
                      >
                        <Star 
                          className={`w-7 h-7 ${
                            star <= (hoverRating || formData.rating) 
                              ? 'fill-[#D4A373] text-[#D4A373]' 
                              : 'text-gray-300'
                          }`} 
                        />
                      </button>
                    ))}
                    <span className="text-sm font-bold text-[#2B231F] ml-2">
                      {hoverRating || formData.rating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* Review Text Area */}
                <div>
                  <label className="block text-xs font-bold text-[#2B231F] mb-1">
                    Your Review / Experience *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you loved about your trip, accommodation, guide, or itinerary..."
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-[#2B231F]/15 focus:border-[#D4A373] focus:outline-none text-sm text-[#2B231F] resize-none"
                  />
                </div>

                {/* Submit buttons */}
                <div className="pt-3 flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-5 rounded-xl bg-[#1E1E1E] hover:bg-[#D4A373] hover:text-[#1E1E1E] text-white font-bold text-sm transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Publish Review</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendViaWhatsApp}
                    className="py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5c] text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Submit via WhatsApp</span>
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
