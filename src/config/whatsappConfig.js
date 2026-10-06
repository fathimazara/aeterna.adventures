/**
 * WhatsApp Booking & Concierge Configuration
 * ──────────────────────────────────────────
 * Centralized settings for all WhatsApp integrations across Aeterna Adventures.
 *
 * Requirements:
 * - Numbers MUST be in full international format WITHOUT leading '+' or spaces/dashes.
 *   Example: India (+91) 8547103872 → "918547103872"
 *
 * Multi-Resort Support:
 * - Individual properties/resorts can have their own dedicated WhatsApp booking numbers.
 * - If a resort has no custom number assigned, it seamlessly falls back to `defaultNumber`.
 */

export const WHATSAPP_CONFIG = {
  // Primary Business WhatsApp number for general bookings & concierge
  defaultNumber: '918547103872',

  // Company info for display & fallbacks
  businessName: 'Aeterna Adventures Concierge',
  supportEmail: 'hawkeyezmarketing@gmail.com',
  supportPhoneFormatted: '+91 85471 03872',
  operatingHours: '24/7 Concierge Support (Avg response < 15 mins)',

  /**
   * Property-specific WhatsApp Numbers
   * Key = `trip.id` from tripsData.js
   * Value = International number string
   */
  propertyNumbers: {
    'vattavada-kerala': '918547103872',      // Vattavada Eco Retreat Team
    'munnar-kerala': '918547103872',         // Munnar Tea Haven Front Desk
    'kasol-himachal': '918547103872',        // Parvati Valley Base Camp
    'spiti-himachal': '918547103872',        // Spiti High Altitude Operations
    'alleppey-kerala': '918547103872',       // Alleppey Houseboat Captains
    'ladakh-pangong': '918547103872',        // Pangong Glamping Concierge
    'uluwatu-bali': '918547103872',          // Bali Concierge
    'toba-lake': '918547103872',             // Lake Toba Team
    'sumba-adventure': '918547103872',       // Sumba Safari Camp
    'kazakhstan-mountains': '918547103872',   // Tian Shan Mountain Camp
    'bangli-bali': '918547103872',           // Bangli Forest Retreat
    'peru-macchu': '918547103872',           // Sacred Valley Concierge
  },
};

// Backwards compatibility export
export const WHATSAPP_DEFAULT_NUMBER = WHATSAPP_CONFIG.defaultNumber;
export const WHATSAPP_TRIP_NUMBERS = WHATSAPP_CONFIG.propertyNumbers;

/**
 * Returns the appropriate WhatsApp number for a specific trip/resort.
 *
 * Resolution order:
 * 1. `trip.whatsappNumber` (if provided directly on the trip object)
 * 2. `WHATSAPP_CONFIG.propertyNumbers[tripId]`
 * 3. `WHATSAPP_CONFIG.defaultNumber`
 *
 * @param {Object|string|undefined} tripOrId - Trip object or trip ID string
 * @returns {string} Clean digits-only international phone number
 */
export function getWhatsAppNumber(tripOrId) {
  if (!tripOrId) return WHATSAPP_CONFIG.defaultNumber;

  if (typeof tripOrId === 'object' && tripOrId !== null) {
    if (tripOrId.whatsappNumber && typeof tripOrId.whatsappNumber === 'string') {
      return tripOrId.whatsappNumber.replace(/\D/g, '');
    }
    if (tripOrId.id && WHATSAPP_CONFIG.propertyNumbers[tripOrId.id]) {
      return WHATSAPP_CONFIG.propertyNumbers[tripOrId.id];
    }
  } else if (typeof tripOrId === 'string' && WHATSAPP_CONFIG.propertyNumbers[tripOrId]) {
    return WHATSAPP_CONFIG.propertyNumbers[tripOrId];
  }

  return WHATSAPP_CONFIG.defaultNumber;
}

/**
 * Formats an international digits-only phone number for clean UI presentation.
 * Example: "918547103872" → "+91 85471 03872"
 *
 * @param {string} rawNumber
 * @returns {string} Formatted number
 */
export function formatPhoneNumber(rawNumber) {
  if (!rawNumber) return WHATSAPP_CONFIG.supportPhoneFormatted;
  const cleaned = rawNumber.replace(/\D/g, '');
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  if (cleaned.startsWith('62') && cleaned.length >= 11) {
    return `+62 ${cleaned.slice(2, 5)} ${cleaned.slice(5, 9)} ${cleaned.slice(9)}`;
  }
  return `+${cleaned}`;
}
