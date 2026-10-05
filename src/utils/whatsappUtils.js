import { getWhatsAppNumber } from '../config/whatsappConfig';

/**
 * Validates booking fields before opening WhatsApp.
 * Returns { valid: true } or { valid: false, error: string }
 */
export function validateBooking({ checkIn, checkOut, guests }) {
  if (!checkIn) return { valid: false, error: 'Please select a check-in date.' };
  if (!checkOut) return { valid: false, error: 'Please select a check-out date.' };

  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (inDate < today) return { valid: false, error: 'Check-in date cannot be in the past.' };
  if (outDate <= inDate) return { valid: false, error: 'Check-out must be after check-in.' };

  const guestCount = parseInt(guests, 10);
  if (!guestCount || guestCount < 1) return { valid: false, error: 'Please select at least 1 guest.' };

  return { valid: true };
}

/**
 * Builds the pre-filled WhatsApp message from booking details.
 */
export function buildWhatsAppMessage({ trip, checkIn, checkOut, guests, packageName }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return 'TBD';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  };

  const guestCount = parseInt(guests, 10) || 1;
  const totalPrice = trip?.price ? trip.price * guestCount : null;

  const lines = [
    'Hello, I would like to make a booking.',
    '',
    `🏨 Resort/Property: ${trip?.title ?? 'N/A'}`,
    `📍 Location: ${trip?.location ?? 'N/A'}`,
    `🛏️ Room/Package: ${packageName || trip?.category || 'N/A'}`,
    `📅 Check-in: ${formatDate(checkIn)}`,
    `📅 Check-out: ${formatDate(checkOut)}`,
    `👨‍👩‍👧 Guests: ${guestCount} Guest${guestCount > 1 ? 's' : ''}`,
    totalPrice ? `💰 Price: ₹${totalPrice.toLocaleString('en-IN')} INR (₹${trip.price.toLocaleString('en-IN')} × ${guestCount})` : '',
    '',
    'Please confirm the availability and booking details.',
    '',
    'Thank you.',
  ].filter((line, i, arr) => !(line === '' && arr[i - 1] === '')); // remove consecutive blanks

  return lines.join('\n');
}

/**
 * Opens WhatsApp with a pre-filled message.
 * Returns { success: true } or { success: false, error: string }
 */
export function openWhatsApp({ trip, checkIn, checkOut, guests, packageName }) {
  const validation = validateBooking({ checkIn, checkOut, guests });
  if (!validation.valid) return validation;

  try {
    const number = getWhatsAppNumber(trip?.id);
    const message = buildWhatsAppMessage({ trip, checkIn, checkOut, guests, packageName });
    const encoded = encodeURIComponent(message);

    // wa.me works on both mobile (opens app) and desktop (opens Web WhatsApp)
    const url = `https://wa.me/${number}?text=${encoded}`;

    const opened = window.open(url, '_blank', 'noopener,noreferrer');

    if (!opened) {
      // Popup blocked — try direct location change
      window.location.href = url;
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: "We couldn't open WhatsApp. Please try again or contact our booking team directly.",
    };
  }
}
