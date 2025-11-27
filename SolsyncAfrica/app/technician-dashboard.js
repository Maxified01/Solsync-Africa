import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Card, Button, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function TechnicianDashboard() {
  const { user, logout } = useAuth();
  const [activeJobs, setActiveJobs] = useState([
    {
      id: 1,
      title: 'Battery Replacement',
      customer: 'Marie Uwase',
      location: 'Kigali, Gasabo',
      urgency: 'high',
      scheduledDate: '2024-10-16',
      status: 'assigned'
    },
    {
      id: 2,
      title: 'Panel Cleaning',
      customer: 'Paul Bizimana',
      location: 'Kigali, Kicukiro', 
      urgency: 'medium',
      scheduledDate: '2024-10-17',
      status: 'scheduled'
    }
  ]);

  const quickActions = [
    {
      title: 'My Jobs',
      icon: 'briefcase',
      screen: '/technician-jobs',
      color: '#2E8B57'
    },
    {
      title: 'Service Requests',
      icon: 'tools',
      screen: '/service-requests',
      color: '#FFA500'
    },
    {
      title: 'Schedule',
      icon: 'calendar',
      screen: '/technician-schedule',
      color: '#4169E1'
    },
    {
      title: 'Earnings',
      icon: 'cash',
      screen: '/technician-earnings',
      color: '#8A2BE2'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <Text style={styles.welcomeText}>Technician Dashboard</Text>
          <Text style={styles.welcomeSubtext}>
            Welcome, {user?.name}
          </Text>
          <View style={styles.techInfo}>
            <Text style={styles.techRating}>⭐ {user?.rating || 4.8}</Text>
            <Text style={styles.techSpecialization}>{user?.specialization}</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Quick Stats */}
      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Icon name="check-circle" size={24} color="#2E8B57" />
            <Text style={styles.statNumber}>{user?.completedJobs || 124}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </Card.Content>
        </Card>
        
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Icon name="clock" size={24} color="#FFA500" />
            <Text style={styles.statNumber}>{activeJobs.length}</Text>
            <Text style={styles.statLabel}>Active Jobs</Text>
          </Card.Content>
        </Card>
        
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Icon name="star" size={24} color="#4169E1" />
            <Text style={styles.statNumber}>{user?.rating || 4.8}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </Card.Content>
        </Card>
        
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Icon name="cash" size={24} color="#8A2BE2" />
            <Text style={styles.statNumber}>245K</Text>
            <Text style={styles.statLabel}>Earnings</Text>
          </Card.Content>
        </Card>
      </View>

      {/* Active Jobs */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Active Service Jobs</Text>
            <Button mode="text" onPress={() => router.push('/technician-jobs')}>
              View All
            </Button>
          </View>
          
          {activeJobs.map(job => (
            <List.Item
              key={job.id}
              title={job.title}
              description={`${job.customer} • ${job.location}`}
              left={props => (
                <List.Icon 
                  {...props} 
                  icon="tools" 
                  color={job.urgency === 'high' ? '#FF6B6B' : '#FFA500'} 
                />
              )}
              right={props => (
                <View style={styles.jobMeta}>
                  <Text style={styles.jobDate}>{job.scheduledDate}</Text>
                  <Text style={[
                    styles.jobStatus,
                    { color: job.status === 'assigned' ? '#2E8B57' : '#FFA500' }
                  ]}>
                    {job.status}
                  </Text>
                </View>
              )}
              onPress={() => router.push(`/job-details/${job.id}`)}
            />
          ))}
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

      {/* Emergency Contact */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Emergency Support</Text>
          <Text style={styles.supportText}>
            Need immediate assistance? Contact support 24/7
          </Text>
          <Button
            mode="outlined"
            icon="phone"
            style={styles.supportButton}
            onPress={() => Alert.alert('Support', 'Calling support...')}
          >
            Call Support: +250 788 123 456
          </Button>
        </Card.Content>
      </Card>

      <Button mode="outlined" onPress={logout} style={styles.logoutButton}>
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
  techInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  techRating: {
    color: 'white',
    fontWeight: 'bold',
  },
  techSpecialization: {
    color: 'white',
    fontStyle: 'italic',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    marginBottom: 10,
  },
  statContent: {
    alignItems: 'center',
    padding: 15,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  card: {
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  jobMeta: {
    alignItems: 'flex-end',
  },
  jobDate: {
    fontSize: 12,
    color: '#666',
  },
  jobStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
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
  supportText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  supportButton: {
    borderColor: '#2E8B57',
  },
  logoutButton: {
    marginBottom: 20,
    borderColor: '#FF6B6B',
  },
});