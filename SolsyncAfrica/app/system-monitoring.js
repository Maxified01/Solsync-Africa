import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';
import { Card, Button, ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

export default function SystemMonitoringScreen() {
  const [systemData, setSystemData] = useState({
    batteryLevel: 85,
    powerOutput: 245,
    voltage: 24.5,
    temperature: 32,
    dailyProduction: 3.2,
    status: 'optimal'
  });

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      message: 'Battery health check recommended in 7 days',
      timestamp: '2024-10-15 10:30'
    }
  ]);

  const requestService = () => {
    Alert.alert(
      'Request Service',
      'A certified technician will contact you within 24 hours.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm', 
          onPress: () => {
            Alert.alert('Success', 'Service request submitted successfully!');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* System Overview */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>System Overview</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <Icon name="battery" size={24} color="#2E8B57" />
              <Text style={styles.metricValue}>{systemData.batteryLevel}%</Text>
              <Text style={styles.metricLabel}>Battery</Text>
              <ProgressBar 
                progress={systemData.batteryLevel / 100} 
                color={systemData.batteryLevel > 20 ? '#2E8B57' : '#FF6B6B'}
                style={styles.progressBar}
              />
            </View>
            <View style={styles.metricItem}>
              <Icon name="flash" size={24} color="#FFA500" />
              <Text style={styles.metricValue}>{systemData.powerOutput}W</Text>
              <Text style={styles.metricLabel}>Power Output</Text>
            </View>
            <View style={styles.metricItem}>
              <Icon name="thermometer" size={24} color="#4169E1" />
              <Text style={styles.metricValue}>{systemData.temperature}°C</Text>
              <Text style={styles.metricLabel}>Temperature</Text>
            </View>
            <View style={styles.metricItem}>
              <Icon name="chart-line" size={24} color="#8A2BE2" />
              <Text style={styles.metricValue}>{systemData.dailyProduction}kWh</Text>
              <Text style={styles.metricLabel}>Today's Production</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Alerts */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>System Alerts</Text>
          {alerts.length > 0 ? (
            alerts.map(alert => (
              <View key={alert.id} style={styles.alertItem}>
                <Icon 
                  name={alert.type === 'warning' ? 'alert' : 'information'} 
                  size={20} 
                  color={alert.type === 'warning' ? '#FFA500' : '#4169E1'} 
                />
                <View style={styles.alertContent}>
                  <Text style={styles.alertMessage}>{alert.message}</Text>
                  <Text style={styles.alertTimestamp}>{alert.timestamp}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noAlerts}>No active alerts</Text>
          )}
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Maintenance Actions</Text>
          <Button
            mode="outlined"
            icon="tools"
            style={styles.actionButton}
            onPress={requestService}
          >
            Request Technician Service
          </Button>
          <Button
            mode="outlined"
            icon="history"
            style={styles.actionButton}
            onPress={() => Alert.alert('Coming Soon', 'System history will be available in the next update.')}
          >
            View System History
          </Button>
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
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 15,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  progressBar: {
    width: '100%',
    height: 6,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF9E6',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  alertContent: {
    flex: 1,
    marginLeft: 10,
  },
  alertMessage: {
    fontSize: 14,
    color: '#333',
  },
  alertTimestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  noAlerts: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
  },
  actionButton: {
    marginBottom: 10,
    borderColor: '#2E8B57',
  },
});