const PATHS = {
  CONFIG: {
    DEFAULT: '/auth',
    AFTER_LOGIN_WITH_BOOKING: '/next-booking',
    AFTER_LOGIN_WITHOUT_BOOKING: '/bookings',
    AFTER_LOGOUT: '/auth',
    AFTER_SIGNUP: '/bookings'
  },
  UNAUTHENTICATED: {
    LOGIN: '/auth',
    VIPPS_LOGIN_CALLBACK: '/auth/vipps-callback',
    LOGIN_WITH_EMAIL: '/auth/login-with-email',
    SIGNUP: '/auth/signup',
    SIGNUP_WITH_EMAIL: '/auth/sign-up-with-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    CONFIRM_EMAIL: '/auth/confirm-email'
  },
  SERVICE: {
    ACCESS_DENIED: '/service/access-denied',
    GDPR: '/service/gdpr',
    NOT_FOUND: '/service/404',
    TERMS_AND_CONDITIONS: '/service/terms-and-conditions'
  },
  AUTHENTICATED: {
    DASHBOARD: '/dashboard',
    NEXT_BOOKING: '/next-booking',
    BOOKINGS: '/bookings',
    USER_SHOW: '/users/:id',
    USER_EDIT: '/users/:id/edit',
    SET_NEW_PASSWORD: '/user/set-new-password'
  }
}

export default PATHS
