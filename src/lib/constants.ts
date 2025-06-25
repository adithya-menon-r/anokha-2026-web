/**
 * ============================================================================
 *  ENVIRONMENT
 * ============================================================================
 */

// Base API URL (set in .env)
export const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// LocalStorage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'anokha_auth_token',
  FAVOURITES: 'anokha_favourites',
};

/**
 * ============================================================================
 *  CURRENCY & TAX
 * ============================================================================
 */

export const CURRENCY = '₹';
export const GST_RATE = 0.18;

/**
 * ============================================================================
 *  ROUTES
 *  — Centralize all your Next.js App Router paths here
 * ============================================================================
 */

export const ROUTES = {
  HOME: `/`,
  EVENTS: `/events`,
  EVENT_DETAILS: (id: string) => `/events/${id}`,
  EVENTIDE: `/events/eventide`,
  TECH_FAIR: `/events/techfair`,
  PROFILE: `/profile`,
  TRANSACTIONS: `/view-transactions`,
  TEAM: `/team`,
  CHECKOUT: `/checkout`,
};

/**
 * ============================================================================
 *  PAYMENT GATEWAY (PayU)
 * ============================================================================
 */

export const PAYU_URLS = {
  TEST: 'https://test.payu.in/_payment',
  PROD: 'https://secure.payu.in/_payment',
};

// If you expose a public key for PayU (only the “key”, never the salt)
export const PAYU_MERCHANT_KEY = process.env.NEXT_PUBLIC_PAYU_KEY || '';

/**
 * ============================================================================
 *  ASSET PATHS
 *  — if you have common images or icons under /public
 * ============================================================================
 */

export const ASSETS = {
  LOGO: '/logo.webp',
  HERO: '/hero-banner.webp',
  DEFAULT_AVATAR: '/default-avatar.png',
};
