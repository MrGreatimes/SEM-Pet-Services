// Square Appointments booking site (Free plan, set up 2026-11-12). Only the
// Complimentary Meet & Greet (30 min, free) is bookable online, and "Accept bookings
// automatically" is off, so every request stays pending until Sean accepts or declines.
// The Check Availability form stays as the fallback for anything else.
//
// Links straight to the Meet & Greet's own page (full description + one "Book" button)
// instead of the service list, which cuts the description to two lines and needs an
// extra tap. Square has no link that skips to the calendar. The last part of the URL is
// the service's ID: if the service is ever deleted and recreated, this link breaks, so
// copy the new one from the booking site (tap the service, copy the address bar).
export const bookingUrl =
  "https://book.squareup.com/appointments/f4cxxoodyd9dn5/location/LB3VTHMYJPH3X/services/REFZZZ7KMVJ64AZUEKLTIHP6";
