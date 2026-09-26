import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProofAndValue from './components/SocialProofAndValue';
import DestinationDiscovery from './components/DestinationDiscovery';
import DetailModal from './components/DetailModal';
import BookingModal from './components/BookingModal';
import QuizModal from './components/QuizModal';
import ResourcesDrawer from './components/ResourcesDrawer';
import ContactModal from './components/ContactModal';
import WishlistDrawer from './components/WishlistDrawer';
import Footer from './components/Footer';
import { TRIPS } from './data/tripsData';

export default function App() {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [wishlist, setWishlist] = useState(['vattavada-kerala', 'munnar-kerala']);
  
  // Modals state
  const [detailTrip, setDetailTrip] = useState(null);
  const [bookingTrip, setBookingTrip] = useState(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const handleSelectTrip = (tripIdOrObj) => {
    if (typeof tripIdOrObj === 'string') {
      const found = TRIPS.find((t) => t.id === tripIdOrObj);
      if (found) setDetailTrip(found);
    } else {
      setDetailTrip(tripIdOrObj);
    }
  };

  // Toast notification state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleWishlist = (tripId) => {
    if (wishlist.includes(tripId)) {
      setWishlist(wishlist.filter((id) => id !== tripId));
      showToast('Removed from saved wishlist');
    } else {
      setWishlist([...wishlist, tripId]);
      showToast('Saved to wishlist! ❤️');
    }
  };

  const handleRemoveWishlist = (tripId) => {
    setWishlist(wishlist.filter((id) => id !== tripId));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6] text-[#2B231F] font-sans">
      
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E1E1E] text-white px-5 py-3 rounded-full shadow-2xl text-xs sm:text-sm font-bold border border-[#D4A373]/40 flex items-center gap-2 animate-in slide-in-from-bottom duration-300">
          <span className="w-2 h-2 rounded-full bg-[#D4A373] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Navigation Header & Branding */}
      <Navbar
        activeCategory={selectedCategoryFilter}
        onSelectCategory={(cat) => setSelectedCategoryFilter(cat)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenResources={() => setIsResourcesOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero onSelectTrip={handleSelectTrip} />

        {/* 3. Social Proof & Brand Statement Section + Asymmetric Value Gallery */}
        <SocialProofAndValue
          onBookSeatClick={() => {
            const destSec = document.getElementById('destinations-section');
            if (destSec) destSec.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 4. Destination Discovery & Package Cards Section */}
        <DestinationDiscovery
          selectedCategoryFilter={selectedCategoryFilter}
          setSelectedCategoryFilter={setSelectedCategoryFilter}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onSelectTrip={(trip) => setDetailTrip(trip)}
        />
      </main>

      {/* 5. Footer */}
      <Footer
        onSelectCategory={(cat) => setSelectedCategoryFilter(cat)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenResources={() => setIsResourcesOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Modals & Drawers */}
      {detailTrip && (
        <DetailModal
          trip={detailTrip}
          onClose={() => setDetailTrip(null)}
          onBookNow={(tripToBook) => setBookingTrip(tripToBook)}
        />
      )}

      {bookingTrip && (
        <BookingModal
          trip={bookingTrip}
          onClose={() => setBookingTrip(null)}
          onBookingSuccess={(details) => {
            showToast(`Reservation confirmed for ${details.name}!`);
          }}
        />
      )}

      {isQuizOpen && (
        <QuizModal
          onClose={() => setIsQuizOpen(false)}
          onSelectTrip={(trip) => setDetailTrip(trip)}
        />
      )}

      <ResourcesDrawer
        isOpen={isResourcesOpen}
        onClose={() => setIsResourcesOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveWishlist={handleRemoveWishlist}
        onSelectTrip={(trip) => setDetailTrip(trip)}
      />

    </div>
  );
}
