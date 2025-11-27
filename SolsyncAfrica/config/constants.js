// App Constants and Configuration
export const APP_CONFIG = {
  NAME: 'SolSync Africa',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@solsync.africa',
  SUPPORT_PHONE: '+250788123456',
};

export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'https://api.solsync.africa/v1',
  TIMEOUT: 30000,
};

export const PAYMENT_CONFIG = {
  CURRENCY: 'RWF',
  PROVIDERS: {
    MTN: { name: 'MTN Mobile Money', code: 'MTN' },
    AIRTEL: { name: 'Airtel Money', code: 'AIRTEL' },
  },
  PLANS: {
    DAILY: { amount: 70, label: 'Daily' },
    WEEKLY: { amount: 500, label: 'Weekly' },
    MONTHLY: { amount: 2000, label: 'Monthly' },
  },
};

export const SYSTEM_THRESHOLDS = {
  BATTERY_CRITICAL: 20,
  BATTERY_LOW: 40,
  TEMPERATURE_HIGH: 45,
};

export const COLORS = {
  PRIMARY: '#2E8B57',
  SECONDARY: '#FFA500',
  SUCCESS: '#27AE60',
  WARNING: '#F39C12',
  ERROR: '#E74C3C',
  INFO: '#3498DB',
};