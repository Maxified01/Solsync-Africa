import React, { createContext, useState, useContext } from 'react';
import { router } from 'expo-router';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (phoneNumber, verificationCode) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUser({
        id: 1,
        name: 'Jean Claude',
        phone: phoneNumber,
        location: 'Kigali, Rwanda',
        systemId: 'SOL-123456'
      });
      setLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  const logout = () => {
    setUser(null);
    router.push('/');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};