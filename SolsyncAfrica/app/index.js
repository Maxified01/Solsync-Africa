import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

// Improved validation functions
const validatePhoneNumber = (phone) => {
  // More flexible validation for Rwandan numbers
  const phoneRegex = /^(\+?25)?0?7[0-9]{8}$/; // Allows 07, +2507, 2507, etc.
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

const validateVerificationCode = (code) => {
  return code.length === 6 && /^\d+$/.test(code);
};

const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  
  // Handle different formats
  if (cleaned.startsWith('250')) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith('0')) {
    return `+25${cleaned.substring(1)}`;
  } else if (cleaned.startsWith('7')) {
    return `+25${cleaned}`;
  } else if (cleaned.length === 9 && cleaned.startsWith('25')) {
    return `+${cleaned}`;
  }
  
  return `+${cleaned}`;
};

export default function LoginScreen() {
  const { login, loading } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSendCode = () => {
    console.log('Phone number entered:', phoneNumber);
    
    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert(
        'Invalid Phone Number', 
        'Please enter a valid Rwandan mobile number.\n\nExamples:\n• 0781234567\n• +250781234567\n• 250781234567'
      );
      return;
    }
    
    const formattedPhone = formatPhoneNumber(phoneNumber);
    console.log('Formatted phone:', formattedPhone);
    
    setIsVerifying(true);
    Alert.alert('Success', `Verification code sent to ${formattedPhone}`);
  };

  const handleVerify = async () => {
    if (!validateVerificationCode(verificationCode)) {
      Alert.alert('Error', 'Please enter a valid 6-digit verification code');
      return;
    }
    
    const formattedPhone = formatPhoneNumber(phoneNumber);
    await login(formattedPhone, verificationCode);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E8B57" />
        <Text style={styles.loadingText}>Signing you in...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SolSync Africa</Text>
        <Text style={styles.subtitle}>Powering Your Future with Solar Energy</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>
            {isVerifying ? 'Verify Your Phone' : 'Welcome'}
          </Text>
          
          {!isVerifying ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Phone Number (e.g., 0781234567)"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                autoComplete="tel"
              />
              <Text style={styles.helpText}>
                Enter your Rwandan mobile number
              </Text>
              <Button
                mode="contained"
                onPress={handleSendCode}
                style={styles.button}
                labelStyle={styles.buttonLabel}
              >
                Send Verification Code
              </Button>
            </>
          ) : (
            <>
              <Text style={styles.instruction}>
                Code sent to {formatPhoneNumber(phoneNumber)}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter 6-digit code"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                value={verificationCode}
                onChangeText={setVerificationCode}
                maxLength={6}
              />
              <Button
                mode="contained"
                onPress={handleVerify}
                style={styles.button}
                labelStyle={styles.buttonLabel}
                disabled={verificationCode.length !== 6}
              >
                Verify & Continue
              </Button>
              <TouchableOpacity 
                onPress={() => setIsVerifying(false)}
                style={styles.changeNumberContainer}
              >
                <Text style={styles.changeNumberText}>
                  Change phone number
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Card.Content>
      </Card>

      <View style={styles.featureList}>
        <Text style={styles.featureTitle}>Key Features:</Text>
        <Text style={styles.feature}>• Real-time Solar System Monitoring</Text>
        <Text style={styles.feature}>• Pay-As-You-Go Financing</Text>
        <Text style={styles.feature}>• Technician Services</Text>
        <Text style={styles.feature}>• Business Opportunity Hub</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E8B57',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  card: {
    marginBottom: 30,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  helpText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  button: {
    marginVertical: 10,
    backgroundColor: '#2E8B57',
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  instruction: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    fontSize: 14,
  },
  changeNumberContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  changeNumberText: {
    color: '#2E8B57',
    fontSize: 14,
    fontWeight: '500',
  },
  featureList: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 20,
    borderRadius: 10,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E8B57',
  },
  feature: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E8B57',
  },
  loadingText: {
    marginTop: 20,
    color: 'white',
    fontSize: 16,
  },
});