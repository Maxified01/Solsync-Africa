import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  Switch
} from 'react-native';
import { Card, Button, TextInput, List, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileScreen() {
  const { user, updateProfile, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    businessName: user?.businessName || '',
  });
  const [notifications, setNotifications] = useState({
    payment: true,
    maintenance: true,
    promotions: false,
  });

  const handleSave = async () => {
    try {
      await updateProfile(profile);
      Alert.alert('Success', 'Profile updated successfully');
      setEditing(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const toggleNotification = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <Card style={styles.headerCard}>
        <Card.Content style={styles.headerContent}>
          <Icon name="account-circle" size={80} color="#2E8B57" />
          <View style={styles.headerInfo}>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userRole}>{user?.role}</Text>
            <Text style={styles.userSystem}>{user?.systemId}</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Profile Information */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Profile Information</Text>
            <Button
              mode={editing ? "outlined" : "text"}
              onPress={() => setEditing(!editing)}
            >
              {editing ? 'Cancel' : 'Edit'}
            </Button>
          </View>

          {editing ? (
            <View style={styles.editForm}>
              <TextInput
                label="Full Name"
                value={profile.name}
                onChangeText={text => setProfile(prev => ({ ...prev, name: text }))}
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Email"
                value={profile.email}
                onChangeText={text => setProfile(prev => ({ ...prev, email: text }))}
                style={styles.input}
                mode="outlined"
                keyboardType="email-address"
              />
              <TextInput
                label="Location"
                value={profile.location}
                onChangeText={text => setProfile(prev => ({ ...prev, location: text }))}
                style={styles.input}
                mode="outlined"
              />
              {user?.role === 'business' && (
                <TextInput
                  label="Business Name"
                  value={profile.businessName}
                  onChangeText={text => setProfile(prev => ({ ...prev, businessName: text }))}
                  style={styles.input}
                  mode="outlined"
                />
              )}
              <Button
                mode="contained"
                onPress={handleSave}
                style={styles.saveButton}
              >
                Save Changes
              </Button>
            </View>
          ) : (
            <View style={styles.profileInfo}>
              <List.Item
                title="Name"
                description={user?.name || 'Not provided'}
                left={props => <List.Icon {...props} icon="account" />}
              />
              <Divider />
              <List.Item
                title="Email"
                description={user?.email || 'Not provided'}
                left={props => <List.Icon {...props} icon="email" />}
              />
              <Divider />
              <List.Item
                title="Phone"
                description={user?.phone}
                left={props => <List.Icon {...props} icon="phone" />}
              />
              <Divider />
              <List.Item
                title="Location"
                description={user?.location || 'Not provided'}
                left={props => <List.Icon {...props} icon="map-marker" />}
              />
              {user?.businessName && (
                <>
                  <Divider />
                  <List.Item
                    title="Business Name"
                    description={user?.businessName}
                    left={props => <List.Icon {...props} icon="office-building" />}
                  />
                </>
              )}
            </View>
          )}
        </Card.Content>
      </Card>

      {/* Notifications Settings */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Notifications</Text>
          <List.Item
            title="Payment Reminders"
            description="Receive payment due notifications"
            left={props => <List.Icon {...props} icon="bell" />}
            right={props => (
              <Switch
                value={notifications.payment}
                onValueChange={() => toggleNotification('payment')}
                color="#2E8B57"
              />
            )}
          />
          <Divider />
          <List.Item
            title="Maintenance Alerts"
            description="System maintenance and performance alerts"
            left={props => <List.Icon {...props} icon="tools" />}
            right={props => (
              <Switch
                value={notifications.maintenance}
                onValueChange={() => toggleNotification('maintenance')}
                color="#2E8B57"
              />
            )}
          />
          <Divider />
          <List.Item
            title="Promotional Updates"
            description="Business opportunities and promotions"
            left={props => <List.Icon {...props} icon="email-open" />}
            right={props => (
              <Switch
                value={notifications.promotions}
                onValueChange={() => toggleNotification('promotions')}
                color="#2E8B57"
              />
            )}
          />
        </Card.Content>
      </Card>

      {/* System Information */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>System Information</Text>
          <List.Item
            title="App Version"
            description="1.0.0"
            left={props => <List.Icon {...props} icon="information" />}
          />
          <List.Item
            title="Privacy Policy"
            left={props => <List.Icon {...props} icon="shield-account" />}
            onPress={() => Alert.alert('Privacy Policy', 'Coming soon...')}
          />
          <List.Item
            title="Terms of Service"
            left={props => <List.Icon {...props} icon="file-document" />}
            onPress={() => Alert.alert('Terms of Service', 'Coming soon...')}
          />
        </Card.Content>
      </Card>

      {/* Logout Button */}
      <Button
        mode="outlined"
        onPress={logout}
        style={styles.logoutButton}
        labelStyle={{ color: '#FF6B6B' }}
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
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerInfo: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  userRole: {
    fontSize: 16,
    color: '#2E8B57',
    textTransform: 'capitalize',
    marginTop: 5,
  },
  userSystem: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
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
  editForm: {
    marginTop: 10,
  },
  input: {
    marginBottom: 15,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: '#2E8B57',
  },
  profileInfo: {
    marginTop: 10,
  },
  logoutButton: {
    marginBottom: 30,
    borderColor: '#FF6B6B',
  },
});