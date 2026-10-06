import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProofAndValue from './components/SocialProofAndValue';
import DestinationDiscovery from './components/DestinationDiscovery';
import DetailModal from './components/DetailModal';
import BookingModal from './components/BookingModal';
import WhatsAppBookingModal from './components/WhatsAppBookingModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
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
  const [whatsAppTrip, setWhatsAppTrip] = useState(null);
  const [whatsAppInitialData, setWhatsAppInitialData] = useState({});
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSelectTrip = (tripIdOrObj) => {
    if (typeof tripIdOrObj === 'string') {
      const found = TRIPS.find((t) => t.id === tripIdOrObj);
      if (found) setDetailTrip(found);
    } else {
      setDetailTrip(tripIdOrObj);
    }
  };

  // Open WhatsApp booking modal
  const handleOpenWhatsAppBooking = (trip, initialData = {}) => {
    // If no trip is provided (e.g. from general navbar click), pick first trip as default
    const targetTrip = trip || TRIPS[0];
    setWhatsAppTrip(targetTrip);
    setWhatsAppInitialData(initialData);
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
    <div className="min-h-screen flex flex-col bg-[#F9F8F6] text-[#2B231F] font-sans relative">
      
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#1E1E1E] text-white px-5 py-3 rounded-full shadow-2xl text-xs sm:text-sm font-bold border border-[#D4A373]/40 flex items-center gap-2 animate-in slide-in-from-bottom duration-300">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Navigation Header & Branding */}
      <Navbar
        activeCategory={selectedCategoryFilter}
        onSelectCategory={(cat) => setSelectedCategoryFilter(cat)}
        onOpenResources={() => setIsResourcesOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenWhatsAppBooking={() => handleOpenWhatsAppBooking(null)}
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
          onBookWhatsApp={(trip) => handleOpenWhatsAppBooking(trip)}
        />
      </main>

      {/* 5. Footer */}
      <Footer
        onSelectCategory={(cat) => setSelectedCategoryFilter(cat)}
        onOpenResources={() => setIsResourcesOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenWhatsAppBooking={() => handleOpenWhatsAppBooking(null)}
      />

      {/* Floating 1-Tap WhatsApp Concierge Widget */}
      <FloatingWhatsApp
        onOpenWhatsAppBooking={(trip) => handleOpenWhatsAppBooking(trip)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Modals & Drawers */}
      {detailTrip && (
        <DetailModal
          trip={detailTrip}
          onClose={() => setDetailTrip(null)}
          onBookNow={(tripToBook) => setBookingTrip(tripToBook)}
          onBookWhatsApp={(tripToBook, options) => handleOpenWhatsAppBooking(tripToBook, options)}
        />
      )}

      {bookingTrip && (
        <BookingModal
          trip={bookingTrip}
          onClose={() => setBookingTrip(null)}
          onBookingSuccess={(details) => {
            showToast(`Reservation confirmed for ${details.name}!`);
          }}
          onSwitchToWhatsApp={(tripToBook, initialData) => {
            setBookingTrip(null);
            handleOpenWhatsAppBooking(tripToBook, initialData);
          }}
        />
      )}

      {/* WhatsApp Booking Modal */}
      {whatsAppTrip && (
        <WhatsAppBookingModal
          trip={whatsAppTrip}
          initialData={whatsAppInitialData}
          onClose={() => {
            setWhatsAppTrip(null);
            setWhatsAppInitialData({});
          }}
          onOpenContact={() => setIsContactOpen(true)}
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
