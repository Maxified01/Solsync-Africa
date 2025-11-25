import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

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
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="dashboard" options={{ title: 'SolSync Africa' }} />
        <Stack.Screen name="system-monitoring" options={{ title: 'System Monitoring' }} />
        <Stack.Screen name="payment" options={{ title: 'Payment & Financing' }} />
        <Stack.Screen name="service-request" options={{ title: 'Service Request' }} />
        <Stack.Screen name="education" options={{ title: 'Opportunity Hub' }} />
      </Stack>
    </PaperProvider>
  );
}