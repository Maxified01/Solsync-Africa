import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { Card, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

export default function DashboardScreen() {
  const systemData = {
    batteryLevel: 85,
    powerOutput: 245,
    status: 'Optimal',
  };

  const quickActions = [
    {
      title: 'System Monitoring',
      icon: 'solar-panel',
      screen: '/system-monitoring',
      color: '#2E8B57'
    },
    {
      title: 'Payment',
      icon: 'cash',
      screen: '/payment',
      color: '#FFA500'
    },
    {
      title: 'Service Request',
      icon: 'tools',
      screen: '/service-request',
      color: '#4169E1'
    },
    {
      title: 'Opportunity Hub',
      icon: 'lightbulb',
      screen: '/education',
      color: '#8A2BE2'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Section */}
      <Card style={styles.welcomeCard}>
        <Card.Content>
          <Text style={styles.welcomeText}>Welcome to SolSync Africa!</Text>
          <Text style={styles.welcomeSubtext}>
            Your solar energy management platform
          </Text>
        </Card.Content>
      </Card>

      {/* System Status Card */}
      <Card style={styles.statusCard}>
        <Card.Content>
          <Text style={styles.cardTitle}>System Status</Text>
          <View style={styles.statusGrid}>
            <View style={styles.statusItem}>
              <Icon name="battery" size={30} color="#2E8B57" />
              <Text style={styles.statusValue}>{systemData.batteryLevel}%</Text>
              <Text style={styles.statusLabel}>Battery</Text>
            </View>
            <View style={styles.statusItem}>
              <Icon name="flash" size={30} color="#FFA500" />
              <Text style={styles.statusValue}>{systemData.powerOutput}W</Text>
              <Text style={styles.statusLabel}>Power Output</Text>
            </View>
            <View style={styles.statusItem}>
              <Icon name="check-circle" size={30} color="#2E8B57" />
              <Text style={styles.statusValue}>{systemData.status}</Text>
              <Text style={styles.statusLabel}>Status</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={styles.actionCard}
            onPress={() => router.push(action.screen)}
          >
            <View style={[styles.iconContainer, { backgroundColor: action.color }]}>
              <Icon name={action.icon} size={24} color="white" />
            </View>
            <Text style={styles.actionTitle}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Activity */}
      <Card style={styles.activityCard}>
        <Card.Content>
          <Text style={styles.cardTitle}>Recent Activity</Text>
          <View style={styles.activityItem}>
            <Icon name="check" size={20} color="#2E8B57" />
            <Text style={styles.activityText}>Payment received - 15 Oct 2024</Text>
          </View>
          <View style={styles.activityItem}>
            <Icon name="tools" size={20} color="#4169E1" />
            <Text style={styles.activityText}>System maintenance completed</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Logout Button */}
      <Button
        mode="outlined"
        onPress={() => router.push('/')}
        style={styles.logoutButton}
      >
        Logout
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 15,
  },
  welcomeCard: {
    backgroundColor: '#2E8B57',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  statusCard: {
    marginBottom: 20,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  statusGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusItem: {
    alignItems: 'center',
    flex: 1,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  statusLabel: {
    fontSize: 12,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionCard: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  iconContainer: {
    padding: 15,
    borderRadius: 25,
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  activityCard: {
    marginBottom: 20,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  activityText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  logoutButton: {
    marginBottom: 20,
    borderColor: '#FF6B6B',
  },
});