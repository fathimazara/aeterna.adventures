import { getWhatsAppNumber, WHATSAPP_CONFIG } from '../config/whatsappConfig.js';

/**
 * Validates booking parameters before generating WhatsApp link.
 *
 * Rules:
 * - Check-in must be selected and not in the past.
 * - Check-out must be selected and strictly after Check-in.
 * - Guests must be an integer >= 1.
 *
 * @param {Object} params
 * @param {string} params.checkIn - Date string (YYYY-MM-DD)
 * @param {string} params.checkOut - Date string (YYYY-MM-DD)
 * @param {number|string} params.guests - Number of travelers
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateBooking({ checkIn, checkOut, guests }) {
  if (!checkIn) {
    return { valid: false, error: 'Please select your check-in date.' };
  }
  if (!checkOut) {
    return { valid: false, error: 'Please select your check-out date.' };
  }

  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);

  // Set today to start of day for accurate comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Normalize inDate to midnight
  const normalizedInDate = new Date(inDate.getFullYear(), inDate.getMonth(), inDate.getDate());
  if (normalizedInDate < today) {
    return { valid: false, error: 'Check-in date cannot be in the past.' };
  }

  if (outDate <= inDate) {
    return { valid: false, error: 'Check-out date must be after check-in date.' };
  }

  const guestCount = parseInt(guests, 10);
  if (isNaN(guestCount) || guestCount < 1) {
    return { valid: false, error: 'Please specify at least 1 guest.' };
  }

  return { valid: true };
}

/**
 * Formats a date string (YYYY-MM-DD) to a human-readable format.
 * Example: "2026-10-15" → "15 October 2026"
 */
export function formatDisplayDate(dateStr) {
  if (!dateStr) return 'TBD';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

/**
 * Calculates number of nights between two dates.
 */
export function calculateNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const inD = new Date(checkIn);
  const outD = new Date(checkOut);
  const diff = outD - inD;
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
}

/**
 * Builds the exact pre-filled WhatsApp booking message according to specification.
 *
 * Message template:
 * Hello, I would like to make a booking.
 *
 * 🏨 Resort/Property: [Resort Name]
 * 📍 Location: [Location]
 * 🛏️ Room/Package: [Room or Package Name]
 * 📅 Check-in: [Date]
 * 📅 Check-out: [Date]
 * 👨‍👩‍👧 Guests: [Number of Guests]
 * 💰 Price: [Price, if available]
 *
 * Please confirm the availability and booking details.
 *
 * Thank you.
 *
 * @param {Object} params
 * @param {Object} params.trip - Trip or resort data object
 * @param {string} params.checkIn - Check-in date string
 * @param {string} params.checkOut - Check-out date string
 * @param {number|string} params.guests - Number of guests
 * @param {string} [params.packageName] - Selected room or package name
 * @param {number} [params.customPrice] - Optional custom calculated total price
 * @param {string} [params.customerName] - Optional traveler name
 * @param {string} [params.specialRequests] - Optional special requests/notes
 * @returns {string} Fully structured WhatsApp message text
 */
export function buildWhatsAppMessage({
  trip,
  checkIn,
  checkOut,
  guests,
  packageName,
  customPrice,
  customerName,
  specialRequests,
}) {
  const resortName = trip?.title || 'Selected Resort';
  const location = trip?.location || 'India';
  const selectedRoom = packageName || trip?.category || 'Standard Package';
  const formattedCheckIn = formatDisplayDate(checkIn);
  const formattedCheckOut = formatDisplayDate(checkOut);
  const guestCount = parseInt(guests, 10) || 1;

  let priceLine = '';
  if (customPrice !== undefined && customPrice !== null) {
    priceLine = `💰 Price: ₹${customPrice.toLocaleString('en-IN')} INR`;
  } else if (trip?.price) {
    const total = trip.price * guestCount;
    priceLine = `💰 Price: ₹${total.toLocaleString('en-IN')} INR (₹${trip.price.toLocaleString('en-IN')} × ${guestCount} ${guestCount > 1 ? 'Guests' : 'Guest'})`;
  }

  const lines = [
    'Hello, I would like to make a booking.',
    '',
    `🏨 Resort/Property: ${resortName}`,
    `📍 Location: ${location}`,
    `🛏️ Room/Package: ${selectedRoom}`,
    `📅 Check-in: ${formattedCheckIn}`,
    `📅 Check-out: ${formattedCheckOut}`,
    `👨‍👩‍👧 Guests: ${guestCount} ${guestCount > 1 ? 'Guests' : 'Guest'}`,
  ];

  if (priceLine) {
    lines.push(priceLine);
  }

  if (customerName && customerName.trim()) {
    lines.push(`👤 Guest Name: ${customerName.trim()}`);
  }

  if (specialRequests && specialRequests.trim()) {
    lines.push(`📝 Notes: ${specialRequests.trim()}`);
  }

  lines.push('');
  lines.push('Please confirm the availability and booking details.');
  lines.push('');
  lines.push('Thank you.');

  return lines.join('\n');
}

/**
 * Builds a direct URL to open WhatsApp with pre-filled text.
 * Uses standard `https://wa.me/${number}?text=${encoded}` format which:
 * - On Mobile: launches the native WhatsApp app.
 * - On Desktop: opens WhatsApp Web or the WhatsApp Desktop client.
 *
 * @param {string} phoneNumber - Digits-only international phone number
 * @param {string} message - Unencoded message text
 * @returns {string} Encoded WhatsApp URL
 */
export function buildWhatsAppUrl(phoneNumber, message) {
  const cleanNumber = (phoneNumber || WHATSAPP_CONFIG.defaultNumber).replace(/\D/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

/**
 * Initiates WhatsApp booking flow and opens the pre-filled chat.
 *
 * Performs:
 * 1. Parameter validation
 * 2. Multi-resort phone resolution
 * 3. Exact message composition & URL encoding
 * 4. Safe browser redirection with popup blocker fallback
 * 5. Robust error handling with user-friendly error message
 *
 * @param {Object} params
 * @returns {{ success: boolean, url?: string, error?: string, rawMessage?: string }}
 */
export function openWhatsApp({
  trip,
  checkIn,
  checkOut,
  guests,
  packageName,
  customPrice,
  customerName,
  specialRequests,
}) {
  // 1. Validation
  const validation = validateBooking({ checkIn, checkOut, guests });
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  try {
    // 2. Resolve destination-specific WhatsApp number
    const phoneNumber = getWhatsAppNumber(trip);

    // 3. Construct message
    const message = buildWhatsAppMessage({
      trip,
      checkIn,
      checkOut,
      guests,
      packageName,
      customPrice,
      customerName,
      specialRequests,
    });

    // 4. Generate URL
    const url = buildWhatsAppUrl(phoneNumber, message);

    // 5. Open WhatsApp in new tab / application
    const win = window.open(url, '_blank', 'noopener,noreferrer');

    // Fallback if popup was blocked by browser
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = url;
    }

    return {
      success: true,
      url,
      rawMessage: message,
      phoneNumber,
    };
  } catch (err) {
    console.error('Failed to open WhatsApp:', err);
    return {
      success: false,
      error: "We couldn't open WhatsApp. Please try again or contact our booking team directly.",
    };
  }
}

/**
 * Quick Concierge inquiry helper for general support or property questions.
 *
 * @param {Object} params
 * @param {string} [params.resortName]
 * @param {string} [params.inquiryType] - e.g. 'Custom Squad Trip', 'Dates inquiry', 'General'
 * @param {string} [params.customText]
 * @returns {{ success: boolean, url?: string, error?: string }}
 */
export function openWhatsAppConcierge({ resortName, inquiryType = 'General Inquiry', customText = '' } = {}) {
  try {
    const phoneNumber = WHATSAPP_CONFIG.defaultNumber;
    let message = `Hello Aeterna Concierge Team! 👋\n\n`;

    if (resortName) {
      message += `I have an inquiry regarding: ${resortName}\n`;
      message += `Topic: ${inquiryType}\n\n`;
    } else {
      message += `I'm planning a trip and would like some personalized recommendations.\n\n`;
    }

    if (customText) {
      message += `Details: ${customText}\n\n`;
    }

    message += `Could you please share more details and availability?\n\nThank you!`;

    const url = buildWhatsAppUrl(phoneNumber, message);
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = url;
    }
    return { success: true, url };
  } catch (err) {
    console.error('Failed to open WhatsApp Concierge:', err);
    return {
      success: false,
      error: "We couldn't open WhatsApp. Please try again or contact our booking team directly.",
    };
  }
}
