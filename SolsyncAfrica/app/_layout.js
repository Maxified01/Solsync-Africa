import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from '../contexts/AuthContext';
import { DataProvider } from '../contexts/DataContext';
import { PaymentProvider } from '../contexts/PaymentContext';
import { ServiceProvider } from '../contexts/ServiceContext';
import ErrorBoundary from '../components/ErrorBoundary';
import NetworkStatus from '../components/NetworkStatus';

const theme = {
  colors: {
    primary: '#2E8B57',
    accent: '#FFA500',
    background: '#F8F9FA',
    surface: '#FFFFFF',
    text: '#2C3E50',
  },
};

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <DataProvider>
            <PaymentProvider>
              <ServiceProvider>
                <NetworkStatus />
                <Stack>
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen name="register" options={{ title: 'Create Account' }} />
                  <Stack.Screen name="dashboard" options={{ title: 'SolSync Africa' }} />
                  <Stack.Screen name="admin-dashboard" options={{ title: 'Admin Dashboard' }} />
                  <Stack.Screen name="system-monitoring" options={{ title: 'System Monitoring' }} />
                  <Stack.Screen name="payment" options={{ title: 'Payment & Financing' }} />
                  <Stack.Screen name="service-request" options={{ title: 'Service Request' }} />
                  <Stack.Screen name="education" options={{ title: 'Opportunity Hub' }} />
                </Stack>
              </ServiceProvider>
            </PaymentProvider>
          </DataProvider>
        </AuthProvider>
      </PaperProvider>
    </ErrorBoundary>
  );
}