import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TravelHero from './components/TravelHero';
import ScrollProgress from './components/ScrollProgress';
import AnimatedAirplane from './components/AnimatedAirplane';
import ParallaxDestinationSection from './components/ParallaxDestinationSection';
import WorldMap from './components/WorldMap';
import BookingCTA from './components/BookingCTA';
import SocialProofAndValue from './components/SocialProofAndValue';
import RealReviewsSection from './components/RealReviewsSection';
import DestinationDiscovery from './components/DestinationDiscovery';
import DetailModal from './components/DetailModal';
import BookingModal from './components/BookingModal';
import WhatsAppBookingModal from './components/WhatsAppBookingModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ResourcesDrawer from './components/ResourcesDrawer';
import ContactModal from './components/ContactModal';
import WishlistDrawer from './components/WishlistDrawer';
import Footer from './components/Footer';
import { TRIPS, WORLD_DESTINATIONS } from './data/tripsData';

export default function App() {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [wishlist, setWishlist] = useState(['vattavada-kerala', 'munnar-kerala']);
  const [activeDestinationId, setActiveDestinationId] = useState('india');

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

  // Track active destination on scroll
  useEffect(() => {
    const handleScroll = () => {
      WORLD_DESTINATIONS.forEach((dest) => {
        const el = document.getElementById(`dest-${dest.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveDestinationId(dest.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const scrollToDestinations = () => {
    const el = document.getElementById('dest-india');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090807] text-[#2B231F] font-sans relative">
      

      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#1E1E1E] text-white px-5 py-3 rounded-full shadow-2xl text-xs sm:text-sm font-bold border border-[#D4A373]/40 flex items-center gap-2 animate-in slide-in-from-bottom duration-300">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 3. Sticky Glassmorphism Header */}
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

        {/* 4. Cinematic Travel Hero */}
        <TravelHero
          onExploreClick={scrollToDestinations}
          onBookClick={() => handleOpenWhatsAppBooking(null)}
        />

        {/* 5. 3D Parallax World Journey Destination Sections */}
        {WORLD_DESTINATIONS.map((dest) => (
          <ParallaxDestinationSection
            key={dest.id}
            destination={dest}
            onSelectPackage={(pkg) => {
              // Match package to full trip details or open modal
              const match = TRIPS.find((t) => t.id === pkg.id) || TRIPS[0];
              setDetailTrip(match);
            }}
            onBookNow={(destObj) => {
              handleOpenWhatsAppBooking(null, { destination: destObj.name });
            }}
          />
        ))}

        {/* 6. Interactive World Map Visualizer */}
        <WorldMap
          onSelectDestination={(dest) => {
            const el = document.getElementById(`dest-${dest.id}`);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 7. Social Proof & Brand Values */}
        <SocialProofAndValue
          onBookSeatClick={scrollToDestinations}
        />

        {/* 8. Customer Reviews & Write Review System */}
        <RealReviewsSection
          onOpenWhatsAppBooking={(trip) => handleOpenWhatsAppBooking(trip)}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* 9. All Package Cards Grid */}
        <DestinationDiscovery
          selectedCategoryFilter={selectedCategoryFilter}
          setSelectedCategoryFilter={setSelectedCategoryFilter}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onSelectTrip={(trip) => setDetailTrip(trip)}
          onBookWhatsApp={(trip) => handleOpenWhatsAppBooking(trip)}
        />

        {/* 10. Booking CTA (Where Will You Go Next?) */}
        <BookingCTA
          onStartPlanning={() => handleOpenWhatsAppBooking(null)}
          onOpenContact={() => setIsContactOpen(true)}
        />

      </main>

      {/* 11. Footer */}
      <Footer
        onSelectCategory={(cat) => setSelectedCategoryFilter(cat)}
        onOpenResources={() => setIsResourcesOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenWhatsAppBooking={() => handleOpenWhatsAppBooking(null)}
      />

      {/* Floating Concierge Widget */}
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
