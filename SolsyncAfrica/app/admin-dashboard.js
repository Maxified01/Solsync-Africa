import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.headerCard}>
        <Card.Content>
          <Text style={styles.welcomeText}>Admin Dashboard</Text>
          <Text style={styles.welcomeSubtext}>
            Welcome, {user?.name}!
          </Text>
          <Text style={styles.roleText}>Role: {user?.role}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Quick Stats</Text>
          <Text>Total Users: 1,247</Text>
          <Text>Active Systems: 893</Text>
          <Text>Revenue: 2,456,000 RWF</Text>
        </Card.Content>
      </Card>

      <Button
        mode="outlined"
        onPress={logout}
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
  headerCard: {
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
  roleText: {
    fontSize: 14,
    color: 'white',
    opacity: 0.7,
  },
  card: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  logoutButton: {
    marginBottom: 20,
    borderColor: '#FF6B6B',
  },
});