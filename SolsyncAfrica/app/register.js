import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity
} from 'react-native';
import { Card, Button, RadioButton } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { validatePhoneNumber, formatPhoneNumber } from '../utils/validators';
import { router } from 'expo-router';

export default function RegisterScreen() {
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    email: '',
    role: 'end-user',
    location: '',
    businessName: '',
  });
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSendCode = () => {
    console.log('Send code button pressed');
    
    if (!validatePhoneNumber(formData.phone)) {
      Alert.alert('Error', 'Please enter a valid Rwandan phone number');
      return;
    }
    
    if (!formData.name) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    
    console.log('Setting verification state to true');
    setIsVerifying(true);
    Alert.alert('Success', 'Verification code sent to your phone');
  };

  const handleFinalRegistration = async () => {
    console.log('Final registration button pressed');
    
    // For demo purposes, we'll skip actual verification and just register
    const userData = {
      name: formData.name,
      phone: formatPhoneNumber(formData.phone),
      email: formData.email,
      role: formData.role,
      location: formData.location,
      ...(formData.role === 'business' && { businessName: formData.businessName }),
    };

    console.log('Registering user:', userData);
    await register(userData);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join SolSync Africa</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Personal Information</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Full Name *"
            value={formData.name}
            onChangeText={text => setFormData(prev => ({ ...prev, name: text }))}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={text => setFormData(prev => ({ ...prev, email: text }))}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={formData.location}
            onChangeText={text => setFormData(prev => ({ ...prev, location: text }))}
          />

          <Text style={styles.sectionTitle}>Account Type</Text>
          <RadioButton.Group
            value={formData.role}
            onValueChange={value => setFormData(prev => ({ ...prev, role: value }))}
          >
            <View style={styles.radioItem}>
              <RadioButton value="end-user" />
              <Text style={styles.radioLabel}>Solar User</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="technician" />
              <Text style={styles.radioLabel}>Technician</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="admin" />
              <Text style={styles.radioLabel}>Administrator</Text>
            </View>
          </RadioButton.Group>

          {formData.role === 'business' && (
            <TextInput
              style={styles.input}
              placeholder="Business Name"
              value={formData.businessName}
              onChangeText={text => setFormData(prev => ({ ...prev, businessName: text }))}
            />
          )}

          <Text style={styles.sectionTitle}>Phone Verification</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Phone Number *"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={text => setFormData(prev => ({ ...prev, phone: text }))}
          />

          {/* SIMPLE REGISTRATION BUTTON - No verification required for demo */}
          <Button
            mode="contained"
            onPress={handleFinalRegistration}
            style={styles.registerButton}
            labelStyle={styles.registerButtonLabel}
            loading={loading}
            disabled={!formData.name || !formData.phone}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>

          {/* Optional: Add verification later if needed */}
          <TouchableOpacity 
            onPress={handleSendCode}
            style={styles.verifyLink}
          >
            <Text style={styles.verifyLinkText}>
              Need phone verification? Click here
            </Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
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
    marginVertical: 40,
  },
  title: {
    fontSize: 28,
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
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  registerButton: {
    marginVertical: 20,
    backgroundColor: '#FFA500',
    padding: 5,
  },
  registerButtonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  verifyLink: {
    alignItems: 'center',
    marginTop: 10,
  },
  verifyLinkText: {
    color: '#2E8B57',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});