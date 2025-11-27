import React, { createContext, useState, useContext } from 'react';

const PaymentContext = createContext();

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

export const PaymentProvider = ({ children }) => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 'mtn',
      name: 'MTN Mobile Money',
      icon: 'cellphone',
      color: '#FF9900',
      enabled: true,
      countries: ['RW', 'UG', 'GH']
    },
    {
      id: 'airtel',
      name: 'Airtel Money',
      icon: 'cellphone',
      color: '#E61327',
      enabled: true,
      countries: ['RW', 'UG', 'KE']
    },
    {
      id: 'mpesa',
      name: 'M-Pesa',
      icon: 'cellphone',
      color: '#007C3F',
      enabled: true,
      countries: ['KE', 'TZ']
    }
  ]);

  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: 1,
      amount: 500,
      method: 'mtn',
      status: 'completed',
      date: '2024-10-15',
      transactionId: 'TXN_001'
    },
    {
      id: 2,
      amount: 2000,
      method: 'airtel',
      status: 'completed',
      date: '2024-10-01',
      transactionId: 'TXN_002'
    }
  ]);

  const processPayment = async (paymentData) => {
    // Simulate API call to mobile money provider
    return new Promise((resolve) => {
      setTimeout(() => {
        const transaction = {
          id: Date.now(),
          ...paymentData,
          status: 'completed',
          transactionId: `TXN_${Date.now()}`,
          date: new Date().toISOString().split('T')[0]
        };
        
        setPaymentHistory(prev => [transaction, ...prev]);
        resolve(transaction);
      }, 3000);
    });
  };

  const getPaymentStats = () => {
    const totalPaid = paymentHistory
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0);
    
    const pendingPayments = paymentHistory.filter(p => p.status === 'pending');
    
    return {
      totalPaid,
      pendingCount: pendingPayments.length,
      transactionCount: paymentHistory.length
    };
  };

  const value = {
    paymentMethods,
    paymentHistory,
    processPayment,
    getPaymentStats
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};