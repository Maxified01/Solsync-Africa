import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity
} from 'react-native';
import { Card, Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterSystemScreen() {
  const { user } = useAuth();
  const [systemData, setSystemData] = useState({
    serialNumber: '',
    manufacturer: '',
    capacity: '',
    installationDate: '',
    location: user?.location || '',
  });
  const [scanning, setScanning] = useState(false);

  const handleScanQR = () => {
    setScanning(true);
    Alert.alert(
      'Scan QR Code',
      'Point your camera at the solar system QR code',
      [
        { text: 'Cancel', onPress: () => setScanning(false) },
        { 
          text: 'Simulate Scan', 
          onPress: () => {
            // Simulate QR scan
            setSystemData(prev => ({
              ...prev,
              serialNumber: 'SOL-' + Date.now().toString().slice(-6),
              manufacturer: 'SunPower Africa',
              capacity: '300W',
            }));
            setScanning(false);
          }
        },
      ]
    );
  };

  const handleRegister = () => {
    if (!systemData.serialNumber || !systemData.manufacturer || !systemData.capacity) {
      Alert.alert('Error', 'Please fill all required fields or scan QR code');
      return;
    }

    Alert.alert(
      'System Registered',
      `Solar system ${systemData.serialNumber} has been successfully registered!`,
      [{ text: 'OK', onPress: () => router.push('/system-monitoring') }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Register Solar System</Text>
          <Text style={styles.subtitle}>
            Register your solar system using QR code or manual entry
          </Text>

          {/* QR Code Scanner */}
          <TouchableOpacity style={styles.qrSection} onPress={handleScanQR}>
            <Icon name="qrcode-scan" size={60} color="#2E8B57" />
            <Text style={styles.qrText}>
              {scanning ? 'Scanning...' : 'Tap to Scan QR Code'}
            </Text>
            <Text style={styles.qrSubtext}>
              Scan the QR code on your solar system equipment
            </Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Or Enter Manually</Text>

          <TextInput
            label="Serial Number *"
            value={systemData.serialNumber}
            onChangeText={text => setSystemData(prev => ({ ...prev, serialNumber: text }))}
            style={styles.input}
            mode="outlined"
            placeholder="e.g., SOL-123456"
          />

          <TextInput
            label="Manufacturer *"
            value={systemData.manufacturer}
            onChangeText={text => setSystemData(prev => ({ ...prev, manufacturer: text }))}
            style={styles.input}
            mode="outlined"
            placeholder="e.g., SunPower, Tesla, etc."
          />

          <TextInput
            label="System Capacity *"
            value={systemData.capacity}
            onChangeText={text => setSystemData(prev => ({ ...prev, capacity: text }))}
            style={styles.input}
            mode="outlined"
            placeholder="e.g., 300W, 5kW, etc."
            keyboardType="numbers-and-punctuation"
          />

          <TextInput
            label="Installation Date"
            value={systemData.installationDate}
            onChangeText={text => setSystemData(prev => ({ ...prev, installationDate: text }))}
            style={styles.input}
            mode="outlined"
            placeholder="YYYY-MM-DD"
          />

          <TextInput
            label="Location"
            value={systemData.location}
            onChangeText={text => setSystemData(prev => ({ ...prev, location: text }))}
            style={styles.input}
            mode="outlined"
          />

          <Button
            mode="contained"
            onPress={handleRegister}
            style={styles.registerButton}
            disabled={!systemData.serialNumber}
          >
            Register System
          </Button>
        </Card.Content>
      </Card>

      {/* System Benefits */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Benefits of Registration</Text>
          <View style={styles.benefitItem}>
            <Icon name="chart-line" size={20} color="#2E8B57" />
            <Text style={styles.benefitText}>Real-time performance monitoring</Text>
          </View>
          <View style={styles.benefitItem}>
            <Icon name="bell" size={20} color="#2E8B57" />
            <Text style={styles.benefitText}>Maintenance alerts and notifications</Text>
          </View>
          <View style={styles.benefitItem}>
            <Icon name="tools" size={20} color="#2E8B57" />
            <Text style={styles.benefitText}>Quick technician service matching</Text>
          </View>
          <View style={styles.benefitItem}>
            <Icon name="cash" size={20} color="#2E8B57" />
            <Text style={styles.benefitText}>Access to PAYG financing options</Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 15,
  },
  card: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  qrSection: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#2E8B57',
    borderStyle: 'dashed',
  },
  qrText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#2E8B57',
  },
  qrSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    marginBottom: 15,
  },
  registerButton: {
    marginTop: 10,
    backgroundColor: '#2E8B57',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
});