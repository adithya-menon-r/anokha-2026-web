/**
 * ============================================================================
 *  ENVIRONMENT
 * ============================================================================
 */

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

// Determine if running in production based on flag
const IS_PRODUCTION = process.env.NEXT_PUBLIC_IS_PRODUCTION === '1';

// Select appropriate PayU merchant key based on environment
export const PAYU_MERCHANT_KEY = IS_PRODUCTION
  ? process.env.NEXT_PUBLIC_PAY_U_KEY_PROD || ''
  : process.env.NEXT_PUBLIC_PAY_U_KEY_TEST || '';

// Select appropriate PayU URL based on environment
export const PAYU_URL = IS_PRODUCTION ? PAYU_URLS.PROD : PAYU_URLS.TEST;

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
