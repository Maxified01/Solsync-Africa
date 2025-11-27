import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';
import { Card, Button, ProgressBar, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function SystemMonitoringScreen() {
  const { user } = useAuth();
  const [systemData, setSystemData] = useState({
    batteryLevel: 85,
    powerOutput: 245,
    voltage: 24.5,
    temperature: 32,
    dailyProduction: 3.2,
    monthlyProduction: 45.6,
    status: 'optimal',
    lastMaintenance: '2024-09-15',
  });

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      message: 'Battery health check recommended in 7 days',
      timestamp: '2024-10-15 10:30',
      priority: 'medium'
    }
  ]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemData(prev => {
        const newBattery = Math.max(10, prev.batteryLevel - 0.1);
        const newPower = 200 + Math.random() * 100;
        const newTemp = 30 + Math.random() * 10;
        
        // Generate alerts based on conditions
        const newAlerts = [];
        if (newBattery < 20) {
          newAlerts.push({
            id: Date.now(),
            type: 'critical',
            message: 'Battery level critically low!',
            timestamp: new Date().toISOString(),
            priority: 'high'
          });
        }
        if (newTemp > 40) {
          newAlerts.push({
            id: Date.now() + 1,
            type: 'warning',
            message: 'System temperature high',
            timestamp: new Date().toISOString(),
            priority: 'medium'
          });
        }

        if (newAlerts.length > 0) {
          setAlerts(prevAlerts => [...newAlerts, ...prevAlerts]);
        }

        return {
          ...prev,
          batteryLevel: newBattery,
          powerOutput: newPower,
          temperature: newTemp,
          dailyProduction: (2 + Math.random() * 2).toFixed(1),
          status: newBattery > 30 ? 'optimal' : 'warning',
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const requestService = (type) => {
    Alert.alert(
      `Request ${type} Service`,
      'A certified technician will contact you within 24 hours.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm', 
          onPress: () => {
            Alert.alert('Success', 'Service request submitted successfully!');
            // Add to alerts
            setAlerts(prev => [{
              id: Date.now(),
              type: 'info',
              message: `${type} service requested - awaiting technician`,
              timestamp: new Date().toISOString(),
              priority: 'low'
            }, ...prev]);
          }
        }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return '#2E8B57';
      case 'warning': return '#FFA500';
      case 'critical': return '#FF6B6B';
      default: return '#666';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#FF6B6B';
      case 'medium': return '#FFA500';
      case 'low': return '#2E8B57';
      default: return '#666';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* System Overview */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>System Overview</Text>
            <Chip 
              mode="outlined" 
              textStyle={{ color: getStatusColor(systemData.status) }}
            >
              {systemData.status.toUpperCase()}
            </Chip>
          </View>
          
          <Text style={styles.systemId}>System: {user?.systemId || 'Not Registered'}</Text>
          
          {!user?.systemId ? (
            <View style={styles.noSystem}>
              <Icon name="solar-panel" size={50} color="#CCC" />
              <Text style={styles.noSystemText}>No solar system registered</Text>
              <Button 
                mode="contained" 
                onPress={() => router.push('/register-system')}
                style={styles.registerButton}
              >
                Register System
              </Button>
            </View>
          ) : (
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Icon name="battery" size={24} color={getStatusColor(systemData.status)} />
                <Text style={styles.metricValue}>{systemData.batteryLevel.toFixed(1)}%</Text>
                <Text style={styles.metricLabel}>Battery</Text>
                <ProgressBar 
                  progress={systemData.batteryLevel / 100} 
                  color={getStatusColor(systemData.status)}
                  style={styles.progressBar}
                />
              </View>
              
              <View style={styles.metricItem}>
                <Icon name="flash" size={24} color="#FFA500" />
                <Text style={styles.metricValue}>{systemData.powerOutput.toFixed(0)}W</Text>
                <Text style={styles.metricLabel}>Power Output</Text>
              </View>
              
              <View style={styles.metricItem}>
                <Icon name="thermometer" size={24} color="#4169E1" />
                <Text style={styles.metricValue}>{systemData.temperature.toFixed(1)}°C</Text>
                <Text style={styles.metricLabel}>Temperature</Text>
              </View>
              
              <View style={styles.metricItem}>
                <Icon name="chart-line" size={24} color="#8A2BE2" />
                <Text style={styles.metricValue}>{systemData.dailyProduction}kWh</Text>
                <Text style={styles.metricLabel}>Today's Production</Text>
              </View>
            </View>
          )}
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      {user?.systemId && (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Maintenance Actions</Text>
            <View style={styles.actionButtons}>
              <Button
                mode="outlined"
                icon="tools"
                style={styles.actionButton}
                onPress={() => requestService('Maintenance')}
              >
                General Maintenance
              </Button>
              <Button
                mode="outlined"
                icon="battery-alert"
                style={styles.actionButton}
                onPress={() => requestService('Battery')}
              >
                Battery Service
              </Button>
              <Button
                mode="outlined"
                icon="solar-panel"
                style={styles.actionButton}
                onPress={() => requestService('Panel Cleaning')}
              >
                Panel Cleaning
              </Button>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Alerts */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>System Alerts</Text>
            <Text style={styles.alertCount}>{alerts.length} active</Text>
          </View>
          
          {alerts.length > 0 ? (
            alerts.map(alert => (
              <View key={alert.id} style={[
                styles.alertItem,
                { borderLeftColor: getPriorityColor(alert.priority) }
              ]}>
                <Icon 
                  name={alert.type === 'critical' ? 'alert-circle' : 
                        alert.type === 'warning' ? 'alert' : 'information'} 
                  size={20} 
                  color={getPriorityColor(alert.priority)} 
                />
                <View style={styles.alertContent}>
                  <Text style={styles.alertMessage}>{alert.message}</Text>
                  <Text style={styles.alertTimestamp}>{alert.timestamp}</Text>
                </View>
                <View style={[
                  styles.priorityBadge,
                  { backgroundColor: getPriorityColor(alert.priority) }
                ]}>
                  <Text style={styles.priorityText}>{alert.priority}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noAlerts}>No active alerts</Text>
          )}
        </Card.Content>
      </Card>

      {/* Performance History */}
      {user?.systemId && (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Performance Summary</Text>
            <View style={styles.performanceGrid}>
              <View style={styles.performanceItem}>
                <Text style={styles.performanceValue}>{systemData.monthlyProduction}kWh</Text>
                <Text style={styles.performanceLabel}>Monthly Production</Text>
              </View>
              <View style={styles.performanceItem}>
                <Text style={styles.performanceValue}>{(systemData.monthlyProduction * 120).toFixed(0)} RWF</Text>
                <Text style={styles.performanceLabel}>Estimated Savings</Text>
              </View>
              <View style={styles.performanceItem}>
                <Text style={styles.performanceValue}>{systemData.lastMaintenance}</Text>
                <Text style={styles.performanceLabel}>Last Maintenance</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
}

// Add these new styles to your existing styles
const styles = StyleSheet.create({
  // ... keep all existing styles and add these:
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  systemId: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  noSystem: {
    alignItems: 'center',
    padding: 30,
  },
  noSystemText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    marginBottom: 15,
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#2E8B57',
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    marginBottom: 10,
    borderColor: '#2E8B57',
  },
  alertCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
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
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  performanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  performanceItem: {
    alignItems: 'center',
    flex: 1,
  },
  performanceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  performanceLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
});