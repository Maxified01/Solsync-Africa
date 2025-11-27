import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [systemData, setSystemData] = useState({
    batteryLevel: 85,
    powerOutput: 245,
    voltage: 24.5,
    temperature: 32,
    dailyProduction: 3.2,
    status: 'optimal'
  });

  const [payments, setPayments] = useState({
    balance: 1500,
    dueDate: '2024-10-22',
    history: [
      { id: 1, date: '2024-10-15', amount: 500, status: 'completed' },
      { id: 2, date: '2024-10-08', amount: 500, status: 'completed' },
    ]
  });

  const value = {
    systemData,
    payments,
    refreshData: () => {
      // Simulate data refresh
      setSystemData(prev => ({
        ...prev,
        batteryLevel: 85,
        powerOutput: 245,
        temperature: 32
      }));
    }
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};