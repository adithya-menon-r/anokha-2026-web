export const API_ROUTES = {
  AUTH: {
    REGISTER: '/auth/user/register',
    VERIFY_SIGNUP_OTP: '/auth/user/register/otp/verify',
    RESEND_SIGNUP_OTP: '/auth/user/register/otp/resend',
    LOGIN: '/auth/user/login',
    LOGOUT: '/auth/user/logout',
    SESSION: '/auth/user/session',
    FORGOT_PASSWORD: '/auth/user/forgot-password',
    VERIFY_RESET_OTP: '/auth/user/forgot-password/otp/verify',
    RESEND_RESET_OTP: '/auth/user/forgot-password/otp/resend',
  },

  EVENTS: {
    GET_ALL: '/events/',
    GET_ALL_AUTH: '/events/auth/',
    GET_BY_ID: (id: string) => `/events/${id}`,
    GET_BY_ID_AUTH: (id: string) => `/events/auth/${id}`,
    FAVOURITE: (id: string) => `/events/favourite/${id}`,
  },

  PROFILE: {
    GET: '/profile',
    UPDATE: '/updateProfile',
    REGISTERED_EVENTS: '/user/profile/events',
  },
};
