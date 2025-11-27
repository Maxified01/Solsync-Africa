import { APP_CONFIG } from '../config/constants';

export const analytics = {
  trackEvent: (eventName, properties = {}) => {
    // In production, integrate with your analytics service
    console.log('📊 Analytics Event:', eventName, properties);
    
    // Example: Send to analytics service
    // if (process.env.EXPO_PUBLIC_ANALYTICS_ID) {
    //   // Your analytics implementation here
    // }
  },

  trackScreen: (screenName) => {
    console.log('📱 Screen View:', screenName);
    // Track screen views
  },

  trackError: (error, context = {}) => {
    console.error('🚨 Error Tracked:', error, context);
    // Send errors to your error monitoring service
  },
};

// Common events
export const EVENTS = {
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  PAYMENT_SUCCESS: 'payment_success',
  PAYMENT_FAILED: 'payment_failed',
  SERVICE_REQUESTED: 'service_requested',
  SYSTEM_ALERT: 'system_alert',
};