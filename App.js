import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NetInfo from "@react-native-community/netinfo";

// Context
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { NetworkProvider } from './src/context/NetworkContext';

// Navigation
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';

// Config
import { theme } from './src/config/themes';
import { initSecurity } from './src/utils/encryption';

// Components
import LoadingSpinner from './src/components/LoadingSpinner';
import OfflineIndicator from './src/components/OfflineIndicator';

function Navigation() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <OfflineIndicator />
      {user ? <AppNavigator /> : <AuthNavigator />}
    </>
  );
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Initialize security
        await initSecurity();
        
        // Pre-load any resources
        await Promise.all([
          // Add any async initializations here
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NetworkProvider>
          <LanguageProvider>
            <AuthProvider>
              <NavigationContainer>
                <StatusBar style="auto" />
                <Navigation />
              </NavigationContainer>
            </AuthProvider>
          </LanguageProvider>
        </NetworkProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}