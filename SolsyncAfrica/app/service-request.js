import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity
} from 'react-native';
import { Card, Button, TextInput, List, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useService } from '../contexts/ServiceContext';
import { useAuth } from '../contexts/AuthContext';

export default function ServiceRequestScreen() {
  const { user } = useAuth();
  const { serviceRequests, technicians, createServiceRequest, getTechnicianById } = useService();
  
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    urgency: 'medium',
    issueType: 'general'
  });
  const [submitting, setSubmitting] = useState(false);

  const issueTypes = [
    { id: 'battery', label: 'Battery Issues', icon: 'battery' },
    { id: 'panel', label: 'Solar Panel Issues', icon: 'solar-panel' },
    { id: 'inverter', label: 'Inverter Problems', icon: 'flash' },
    { id: 'wiring', label: 'Wiring & Connections', icon: 'connection' },
    { id: 'general', label: 'General Maintenance', icon: 'tools' }
  ];

  const submitRequest = async () => {
    if (!newRequest.title || !newRequest.description) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    
    try {
      const requestData = {
        ...newRequest,
        userId: user?.id
      };

      const result = createServiceRequest(requestData);
      
      Alert.alert(
        'Service Request Submitted!',
        'A technician will be assigned to your request shortly. You will receive a notification when a technician accepts your request.',
        [
          { 
            text: 'OK', 
            onPress: () => {
              setNewRequest({ title: '', description: '', urgency: 'medium', issueType: 'general' });
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit service request. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
      case 'assigned': return '#4169E1';
      case 'in_progress': return '#8A2BE2';
      case 'completed': return '#2E8B57';
      case 'cancelled': return '#FF6B6B';
      default: return '#666';
    }
  };

  const getAvailableTechnicians = () => {
    return technicians.filter(tech => tech.availability === 'available').length;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Available Technicians */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.availabilityHeader}>
            <View style={styles.availabilityInfo}>
              <Icon name="account-hard-hat" size={24} color="#2E8B57" />
              <Text style={styles.availabilityText}>
                {getAvailableTechnicians()} technicians available now
              </Text>
            </View>
            <Text style={styles.responseTime}>Avg. response: 2-4 hours</Text>
          </View>
        </Card.Content>
      </Card>

      {/* New Service Request */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>New Service Request</Text>
          
          <Text style={styles.sectionTitle}>Issue Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.issueTypesScroll}>
            <View style={styles.issueTypes}>
              {issueTypes.map(type => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.issueTypeButton,
                    newRequest.issueType === type.id && styles.selectedIssueType
                  ]}
                  onPress={() => setNewRequest(prev => ({ ...prev, issueType: type.id }))}
                >
                  <Icon 
                    name={type.icon} 
                    size={20} 
                    color={newRequest.issueType === type.id ? 'white' : '#2E8B57'} 
                  />
                  <Text style={[
                    styles.issueTypeText,
                    newRequest.issueType === type.id && styles.selectedIssueTypeText
                  ]}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          
          <TextInput
            label="Issue Title *"
            value={newRequest.title}
            onChangeText={text => setNewRequest(prev => ({ ...prev, title: text }))}
            style={styles.input}
            mode="outlined"
            placeholder="Brief description of the issue"
          />
          
          <TextInput
            label="Detailed Description *"
            value={newRequest.description}
            onChangeText={text => setNewRequest(prev => ({ ...prev, description: text }))}
            style={styles.input}
            mode="outlined"
            multiline
            numberOfLines={4}
            placeholder="Please describe the issue in detail..."
          />
          
          <Text style={styles.sectionTitle}>Urgency Level</Text>
          <View style={styles.urgencyOptions}>
            {['low', 'medium', 'high'].map(level => (
              <Button
                key={level}
                mode={newRequest.urgency === level ? 'contained' : 'outlined'}
                onPress={() => setNewRequest(prev => ({ ...prev, urgency: level }))}
                style={styles.urgencyButton}
                labelStyle={{ fontSize: 12 }}
                contentStyle={styles.urgencyButtonContent}
              >
                {level === 'low' && 'Low (1-2 days)'}
                {level === 'medium' && 'Medium (12-24 hours)'}
                {level === 'high' && 'High (2-6 hours)'}
              </Button>
            ))}
          </View>
          
          <Button
            mode="contained"
            onPress={submitRequest}
            style={styles.submitButton}
            loading={submitting}
            disabled={submitting || !newRequest.title || !newRequest.description}
          >
            {submitting ? 'Submitting...' : 'Submit Service Request'}
          </Button>
        </Card.Content>
      </Card>

      {/* Service History */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Service History</Text>
          
          {serviceRequests.length === 0 ? (
            <Text style={styles.noData}>No service requests yet</Text>
          ) : (
            serviceRequests.map(request => {
              const assignedTech = request.technicianId ? getTechnicianById(request.technicianId) : null;
              
              return (
                <List.Item
                  key={request.id}
                  title={request.title}
                  description={request.description}
                  left={props => (
                    <List.Icon 
                      {...props} 
                      icon="tools" 
                      color={getUrgencyColor(request.urgency)} 
                    />
                  )}
                  right={props => (
                    <View style={styles.requestMeta}>
                      <Text style={[styles.status, { color: getStatusColor(request.status) }]}>
                        {request.status}
                      </Text>
                      <Text style={styles.date}>{request.date}</Text>
                      {assignedTech && (
                        <Text style={styles.technicianName}>
                          {assignedTech.name}
                        </Text>
                      )}
                    </View>
                  )}
                  onPress={() => assignedTech && router.push({
                    pathname: '/technician-details',
                    params: { technicianId: assignedTech.id, requestId: request.id }
                  })}
                />
              );
            })
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
  availabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  availabilityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  responseTime: {
    fontSize: 12,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },
  issueTypesScroll: {
    marginBottom: 15,
  },
  issueTypes: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  issueTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#2E8B57',
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'white',
  },
  selectedIssueType: {
    backgroundColor: '#2E8B57',
  },
  issueTypeText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '500',
    color: '#2E8B57',
  },
  selectedIssueTypeText: {
    color: 'white',
  },
  input: {
    marginBottom: 15,
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
  urgencyButtonContent: {
    height: 36,
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
    fontSize: 11,
    color: '#666',
    marginBottom: 3,
  },
  technicianName: {
    fontSize: 10,
    color: '#2E8B57',
    fontStyle: 'italic',
  },
  noData: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    marginVertical: 20,
  },
});