// Mock API service - replace with real API endpoints
export const api = {
  async login(phone, code) {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          user: {
            id: 1,
            name: 'Jean Claude',
            phone: phone,
            location: 'Kigali, Rwanda',
            systemId: 'SOL-123456'
          },
          token: 'mock-jwt-token'
        });
      }, 1500);
    });
  },

  async getSystemData(systemId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          batteryLevel: 80 + Math.random() * 20,
          powerOutput: 200 + Math.random() * 100,
          voltage: 24.5,
          temperature: 30 + Math.random() * 10,
          dailyProduction: (2 + Math.random() * 2).toFixed(1),
          status: 'optimal'
        });
      }, 1000);
    });
  },

  async processPayment(paymentData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: 'TXN_' + Date.now(),
          ...paymentData
        });
      }, 2000);
    });
  }
};