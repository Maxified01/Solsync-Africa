import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';
import { Card, Button, List, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

export default function PaymentScreen() {
  const [paymentPlan, setPaymentPlan] = useState('weekly');
  const [balance, setBalance] = useState(1500);

  const paymentPlans = [
    { id: 'daily', amount: 70, label: 'Daily - 70 RWF/day' },
    { id: 'weekly', amount: 500, label: 'Weekly - 500 RWF/week' },
    { id: 'monthly', amount: 2000, label: 'Monthly - 2000 RWF/month' }
  ];

  const paymentHistory = [
    { id: 1, date: '2024-10-15', amount: 500, status: 'completed' },
    { id: 2, date: '2024-10-08', amount: 500, status: 'completed' },
    { id: 3, date: '2024-10-01', amount: 500, status: 'completed' }
  ];

  const handlePayment = (amount) => {
    Alert.alert(
      'Confirm Payment',
      `Make payment of ${amount} RWF?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Pay Now', 
          onPress: () => {
            setBalance(prev => prev - amount);
            Alert.alert('Success', 'Payment completed successfully!');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Current Balance */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Account Overview</Text>
          <View style={styles.balanceContainer}>
            <Icon name="cash" size={40} color="#2E8B57" />
            <View style={styles.balanceInfo}>
              <Text style={styles.balanceLabel}>Current Balance</Text>
              <Text style={styles.balanceAmount}>{balance} RWF</Text>
              <Text style={styles.dueDate}>Next due: 2024-10-22</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Payment Plans */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Select Payment Plan</Text>
          <RadioButton.Group
            value={paymentPlan}
            onValueChange={value => setPaymentPlan(value)}
          >
            {paymentPlans.map(plan => (
              <View key={plan.id} style={styles.radioItem}>
                <RadioButton value={plan.id} color="#2E8B57" />
                <Text style={styles.radioLabel}>{plan.label}</Text>
              </View>
            ))}
          </RadioButton.Group>
          
          <Button
            mode="contained"
            style={styles.payButton}
            onPress={() => {
              const amount = paymentPlans.find(p => p.id === paymentPlan)?.amount;
              if (amount) handlePayment(amount);
            }}
          >
            Make Payment Now
          </Button>
        </Card.Content>
      </Card>

      {/* Payment History */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Payment History</Text>
          {paymentHistory.map(payment => (
            <List.Item
              key={payment.id}
              title={`${payment.amount} RWF`}
              description={`Paid on ${payment.date}`}
              left={props => (
                <List.Icon 
                  {...props} 
                  icon="check-circle" 
                  color="#2E8B57" 
                />
              )}
              right={props => (
                <Text style={styles.statusText}>{payment.status}</Text>
              )}
            />
          ))}
        </Card.Content>
      </Card>

      {/* Mobile Money Providers */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Supported Providers</Text>
          <View style={styles.providersContainer}>
            <View style={styles.providerItem}>
              <Icon name="cellphone" size={30} color="#FF9900" />
              <Text style={styles.providerText}>MTN Mobile Money</Text>
            </View>
            <View style={styles.providerItem}>
              <Icon name="cellphone" size={30} color="#E61327" />
              <Text style={styles.providerText}>Airtel Money</Text>
            </View>
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
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceInfo: {
    marginLeft: 15,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#666',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  dueDate: {
    fontSize: 14,
    color: '#FFA500',
    marginTop: 5,
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
  payButton: {
    marginTop: 15,
    backgroundColor: '#2E8B57',
  },
  statusText: {
    color: '#2E8B57',
    fontWeight: 'bold',
  },
  providersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  providerItem: {
    alignItems: 'center',
  },
  providerText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
});