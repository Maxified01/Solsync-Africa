import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';
import { Card, Button, TextInput, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

export default function ServiceRequestScreen() {
  const [serviceRequests, setServiceRequests] = useState([
    {
      id: 1,
      title: 'Battery Replacement',
      description: 'Battery not holding charge properly',
      urgency: 'high',
      status: 'pending',
      date: '2024-10-15',
    },
    {
      id: 2,
      title: 'Panel Cleaning',
      description: 'Dust accumulation on solar panels',
      urgency: 'low',
      status: 'completed',
      date: '2024-10-10',
    }
  ]);

  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    urgency: 'medium'
  });

  const submitRequest = () => {
    if (!newRequest.title || !newRequest.description) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const request = {
      id: Date.now(),
      ...newRequest,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };

    setServiceRequests(prev => [request, ...prev]);
    setNewRequest({ title: '', description: '', urgency: 'medium' });
    Alert.alert('Success', 'Service request submitted');
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return '#FF6B6B';
      case 'medium': return '#FFA500';
      case 'low': return '#2E8B57';
      default: return '#666';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#FFA500';
      case 'in_progress': return '#4169E1';
      case 'completed': return '#2E8B57';
      case 'cancelled': return '#FF6B6B';
      default: return '#666';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>New Service Request</Text>
          
          <TextInput
            label="Title"
            value={newRequest.title}
            onChangeText={text => setNewRequest(prev => ({ ...prev, title: text }))}
            style={styles.input}
            mode="outlined"
          />
          
          <TextInput
            label="Description"
            value={newRequest.description}
            onChangeText={text => setNewRequest(prev => ({ ...prev, description: text }))}
            style={styles.input}
            mode="outlined"
            multiline
            numberOfLines={3}
          />
          
          <Text style={styles.label}>Urgency</Text>
          <View style={styles.urgencyOptions}>
            {['low', 'medium', 'high'].map(level => (
              <Button
                key={level}
                mode={newRequest.urgency === level ? 'contained' : 'outlined'}
                onPress={() => setNewRequest(prev => ({ ...prev, urgency: level }))}
                style={styles.urgencyButton}
                labelStyle={{ fontSize: 12 }}
              >
                {level}
              </Button>
            ))}
          </View>
          
          <Button
            mode="contained"
            onPress={submitRequest}
            style={styles.submitButton}
          >
            Submit Request
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Service History</Text>
          
          {serviceRequests.length === 0 ? (
            <Text style={styles.noData}>No service requests</Text>
          ) : (
            serviceRequests.map(item => (
              <List.Item
                key={item.id}
                title={item.title}
                description={item.description}
                left={props => (
                  <List.Icon 
                    {...props} 
                    icon="tools" 
                    color={getUrgencyColor(item.urgency)} 
                  />
                )}
                right={props => (
                  <View style={styles.requestMeta}>
                    <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
                      {item.status}
                    </Text>
                    <Text style={styles.date}>{item.date}</Text>
                  </View>
                )}
              />
            ))
          )}
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
  input: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  urgencyOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  urgencyButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: '#2E8B57',
  },
  requestMeta: {
    alignItems: 'flex-end',
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  noData: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    marginVertical: 20,
  },
});