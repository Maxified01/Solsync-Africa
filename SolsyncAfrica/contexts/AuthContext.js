import React, { createContext, useState, useContext, useEffect } from 'react';
import { router } from 'expo-router';
import { storage } from '../services/storage';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkStoredAuth();
  }, []);

  const checkStoredAuth = async () => {
    try {
      const storedUser = await storage.getItem('user');
      if (storedUser) {
        setUser(storedUser);
        redirectBasedOnRole(storedUser);
      }
    } catch (error) {
      console.error('Error checking stored auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const redirectBasedOnRole = (userData) => {
    if (userData.role === 'admin') {
      router.push('/admin-dashboard');
    } else if (userData.role === 'technician') {
      router.push('/technician-dashboard');
    } else {
      router.push('/dashboard');
    }
  };

  const register = async (userData) => {
    setLoading(true);
    // Simulate API call for registration
    setTimeout(async () => {
      const newUser = {
        id: Date.now(),
        ...userData,
        systemId: userData.role === 'end-user' ? `SOL-${Date.now()}` : null,
        createdAt: new Date().toISOString(),
      };
      
      setUser(newUser);
      await storage.setItem('user', newUser);
      setLoading(false);
      redirectBasedOnRole(newUser);
    }, 1500);
  };

  const login = async (phoneNumber, verificationCode) => {
    setLoading(true);
    // Simulate API call
    setTimeout(async () => {
      // For demo purposes - in real app, this would come from your backend
      // Let's use a simple mapping for demo users
      const demoUsers = {
        '0780000000': { role: 'admin', name: 'System Admin' },
        '0780000001': { role: 'technician', name: 'John Technician' },
        '0780000002': { role: 'end-user', name: 'Jean Claude' },
        '0781111111': { role: 'admin', name: 'System Admin' },
        '0782222222': { role: 'technician', name: 'Sarah Technician' },
        '0783333333': { role: 'end-user', name: 'Marie User' },
      };

      let userData;
      const cleanPhone = phoneNumber.replace(/\D/g, '').slice(-10); // Get last 10 digits
      
      if (demoUsers[cleanPhone]) {
        const demoUser = demoUsers[cleanPhone];
        userData = {
          id: Date.now(),
          name: demoUser.name,
          phone: phoneNumber,
          email: `${demoUser.role}@solsync.africa`,
          role: demoUser.role,
          location: 'Kigali, Rwanda',
          ...(demoUser.role === 'technician' && {
            specialization: 'Solar Systems',
            rating: 4.8,
            completedJobs: 124,
          }),
          ...(demoUser.role === 'end-user' && {
            systemId: 'SOL-123456',
          }),
        };
      } else {
        // Default to end-user for any other number
        userData = {
          id: Date.now(),
          name: 'Demo User',
          phone: phoneNumber,
          email: 'user@example.com',
          role: 'end-user',
          location: 'Kigali, Rwanda',
          systemId: 'SOL-123456',
        };
      }
      
      setUser(userData);
      await storage.setItem('user', userData);
      setLoading(false);
      redirectBasedOnRole(userData);
    }, 1500);
  };

  const logout = async () => {
    setUser(null);
    await storage.removeItem('user');
    router.push('/');
  };

  const updateProfile = async (profileData) => {
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);
    await storage.setItem('user', updatedUser);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isTechnician: user?.role === 'technician',
    isEndUser: user?.role === 'end-user',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};