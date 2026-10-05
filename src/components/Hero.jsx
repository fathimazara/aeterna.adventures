import React, { useState, useEffect } from 'react';

export const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2400&q=90',
    fallback: '/hero/bg-6.jpg'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=2400&q=90',
    fallback: '/hero/bg-2.jpg'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2400&q=90',
    fallback: '/hero/bg-1.jpg'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=2400&q=90',
    fallback: '/hero/bg-4.jpg'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=2400&q=90',
    fallback: '/hero/bg-3.jpg'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=2400&q=90',
    fallback: '/hero/bg-5.jpg'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageErrorMap, setImageErrorMap] = useState({});

  // Auto-advance slideshow every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handleImageError = (slideId) => {
    setImageErrorMap((prev) => ({ ...prev, [slideId]: true }));
  };

  return (
    <section className="relative w-full min-h-[82vh] lg:min-h-[88vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-6 lg:py-10 overflow-hidden select-none">
      
      {/* 1. Animated Background Tourist Spot Image Slideshow Container */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#12100E]">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          const hasError = imageErrorMap[slide.id];
          const imgSrc = hasError ? slide.fallback : slide.image;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* High Clarity Animated Image with Ken Burns Zoom & Pan Effect */}
              <img
                src={imgSrc}
                alt="Tourist Spot Background"
                onError={() => handleImageError(slide.id)}
                className={`w-full h-full object-cover object-center transition-transform duration-[10000ms] ease-out ${
                  isActive ? 'scale-110 translate-y-[-1.5%] translate-x-[-0.5%]' : 'scale-100'
                }`}
              />
              
              {/* Dynamic Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#14100E]/95 via-[#1E1E1E]/40 to-[#14100E]/60 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/50 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-[#0F0B09]/20 mix-blend-multiply" />
            </div>
          );
        })}
      </div>

      {/* Hero Central Content Banner */}
      <div className="relative z-10 max-w-5xl mx-auto text-center my-auto py-8 lg:py-14">
        
        {/* Headline */}
        <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tight leading-none mb-4 drop-shadow-2xl">
          Travel
        </h1>

        {/* Universal Subheading */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/95 font-normal leading-relaxed drop-shadow-lg transition-all duration-500">
          Travel with intention. Discover retreats, active adventures, and boutique stays all in one place.
        </p>

      </div>

    </section>
  );
}




