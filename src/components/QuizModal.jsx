import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, Compass, RotateCcw } from 'lucide-react';
import { TRIPS } from '../data/tripsData';

export default function QuizModal({ onClose, onSelectTrip }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    vibe: '',
    travelerType: '',
    budget: ''
  });
  const [matchedTrip, setMatchedTrip] = useState(null);

  const questions = [
    {
      id: 'vibe',
      title: '1. What vibe are you craving for your next getaway?',
      options: [
        { label: 'Sunset Yoga & Ocean Cliffside Retreat', val: 'Yoga' },
        { label: 'Wild Nomad Yurts & Mountain Stargazing', val: 'Glamping' },
        { label: 'Lakeside Cultural Heritage & Pine Trails', val: 'Cultural' },
        { label: 'Alpine Trekking & Sandstone Canyons', val: 'Trekking' }
      ]
    },
    {
      id: 'travelerType',
      title: '2. How do you prefer to experience the trip?',
      options: [
        { label: 'Join an open chill group of like-minded travelers', val: 'Open Trip' },
        { label: 'Private curated trip for me & my squad', val: 'Private' }
      ]
    },
    {
      id: 'budget',
      title: '3. What is your ideal investment range per person?',
      options: [
        { label: 'Cozy Value ($400 - $1,500)', val: 'low' },
        { label: 'All-Inclusive Boutique Experience ($2,000 - $4,500)', val: 'high' }
      ]
    }
  ];

  const handleSelectOption = (key, val) => {
    const updated = { ...answers, [key]: val };
    setAnswers(updated);

    if (step < questions.length) {
      setStep(step + 1);
    } else {
      // Calculate match
      calculateMatch(updated);
    }
  };

  const calculateMatch = (finalAnswers) => {
    let best = TRIPS.find((t) => t.activity === finalAnswers.vibe);
    if (!best) {
      best = TRIPS[0];
    }
    setMatchedTrip(best);
    setStep(4); // Result step
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({ vibe: '', travelerType: '', budget: '' });
    setMatchedTrip(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#2B231F]/10 my-auto">
        
        {/* Header */}
        <div className="bg-[#1E1E1E] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-[#D4A373] text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Travel Matcher</span>
          </div>

          <h3 className="font-heading font-extrabold text-2xl">
            {step <= 3 ? `Find Your Ideal Retreat (${step}/3)` : 'Your Perfect Match!'}
          </h3>
        </div>

        {/* Quiz Steps */}
        <div className="p-6 sm:p-8">
          {step <= 3 && (
            <div className="space-y-6">
              <h4 className="font-heading font-bold text-lg text-[#2B231F]">
                {questions[step - 1].title}
              </h4>

              <div className="space-y-3">
                {questions[step - 1].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(questions[step - 1].id, opt.val)}
                    className="w-full text-left p-4 rounded-2xl border border-[#2B231F]/15 hover:border-[#D4A373] hover:bg-[#F9F8F6] text-sm font-semibold text-[#2B231F] transition-all flex items-center justify-between group"
                  >
                    <span>{opt.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#6E6660] group-hover:text-[#D4A373] group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>

              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="text-xs font-bold text-[#6E6660] hover:text-[#2B231F]"
                >
                  ← Previous question
                </button>
              )}
            </div>
          )}

          {/* Step 4: Result Card */}
          {step === 4 && matchedTrip && (
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4A373]/20 text-[#2B231F] text-xs font-bold">
                <Compass className="w-4 h-4 text-[#D4A373]" />
                <span>98% Vibe Match</span>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-[#2B231F]/10 shadow-lg text-left">
                <img
                  src={matchedTrip.image}
                  alt={matchedTrip.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 bg-white">
                  <span className="text-xs font-bold text-[#D4A373] uppercase">{matchedTrip.category}</span>
                  <h4 className="font-heading font-bold text-xl text-[#2B231F] mb-1">{matchedTrip.title}</h4>
                  <p className="text-xs text-[#6E6660] mb-3">{matchedTrip.description}</p>
                  <div className="flex justify-between items-center text-sm font-extrabold text-[#2B231F]">
                    <span>${matchedTrip.price} USD</span>
                    <span className="text-xs font-normal text-[#6E6660]">{matchedTrip.dateRange}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 px-4 rounded-full border border-[#2B231F]/20 text-xs font-bold text-[#2B231F] hover:bg-[#F9F8F6] flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onSelectTrip(matchedTrip);
                  }}
                  className="flex-1 py-3 px-4 rounded-full bg-[#1E1E1E] text-white hover:bg-[#D4A373] hover:text-[#1E1E1E] text-xs font-bold transition-all shadow-md"
                >
                  Explore Matched Trip
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
