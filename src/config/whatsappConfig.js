/**
 * WhatsApp Booking Configuration
 * ─────────────────────────────
 * Change WHATSAPP_DEFAULT_NUMBER to your WhatsApp Business number.
 * Format: full international number WITHOUT leading + or spaces.
 * Example: India (+91) → "919876543210"
 *
 * Per-trip overrides: add the trip id as key with the number as value.
 * If a trip has no override, the default number is used.
 */

export const WHATSAPP_DEFAULT_NUMBER = '919876543210'; // ← replace with your number

/**
 * Optional per-property / per-trip WhatsApp numbers.
 * Key = trip.id from tripsData.js
 * Value = international number string (no +, no spaces)
 */
export const WHATSAPP_TRIP_NUMBERS = {
  // 'uluwatu-bali': '628123456789',   // example Bali property number
  // 'ladakh-pangong': '919988776655', // example Ladakh team number
};

/**
 * Returns the correct WhatsApp number for a given trip.
 * Falls back to the default number if no trip-specific number is configured.
 * @param {string|undefined} tripId
 * @returns {string}
 */
export function getWhatsAppNumber(tripId) {
  if (tripId && WHATSAPP_TRIP_NUMBERS[tripId]) {
    return WHATSAPP_TRIP_NUMBERS[tripId];
  }
  return WHATSAPP_DEFAULT_NUMBER;
}
