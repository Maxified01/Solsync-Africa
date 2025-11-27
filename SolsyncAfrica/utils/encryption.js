import CryptoJS from 'crypto-js';

// In production, use environment variables for these keys
const SECRET_KEY = process.env.EXPO_PUBLIC_ENCRYPTION_KEY || 'solync-africa-secure-2024';

export const encryption = {
  encryptData: (data) => {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    } catch (error) {
      console.error('Encryption error:', error);
      return null;
    }
  },

  decryptData: (encryptedData) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Decryption error:', error);
      return null;
    }
  },

  hashData: (data) => {
    return CryptoJS.SHA256(data).toString();
  },

  generateToken: (length = 32) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  }
};