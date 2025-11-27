import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity
} from 'react-native';
import { Card, Button, List, RadioButton, Divider, ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { usePayment } from '../contexts/PaymentContext';

export default function PaymentScreen() {
  const { user } = useAuth();
  const { payments, makePayment } = useData();
  const { paymentMethods, paymentHistory, processPayment, getPaymentStats } = usePayment();
  
  const [selectedMethod, setSelectedMethod] = useState('mtn');
  const [processing, setProcessing] = useState(false);
  const [paymentPlan, setPaymentPlan] = useState('weekly');

  const paymentPlans = [
    { id: 'daily', amount: 70, label: 'Daily - 70 RWF/day' },
    { id: 'weekly', amount: 500, label: 'Weekly - 500 RWF/week' },
    { id: 'monthly', amount: 2000, label: 'Monthly - 2000 RWF/month' }
  ];

  const handleMobileMoneyPayment = async (amount) => {
    setProcessing(true);
    
    try {
      const paymentData = {
        amount,
        method: selectedMethod,
        phoneNumber: user?.phone,
        plan: paymentPlan
      };

      const result = await processPayment(paymentData);
      
      // Update local balance
      makePayment(amount);
      
      Alert.alert(
        'Payment Successful!', 
        `Your payment of ${amount} RWF has been processed successfully.\nTransaction ID: ${result.transactionId}`,
        [{ text: 'OK', onPress: () => router.push('/dashboard') }]
      );
    } catch (error) {
      Alert.alert('Payment Failed', 'Please try again or use a different payment method.');
    } finally {
      setProcessing(false);
    }
  };

  const getDaysUntilDue = () => {
    const dueDate = new Date(payments.dueDate);
    const today = new Date();
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilDue = getDaysUntilDue();
  const paymentStats = getPaymentStats();

  return (
    <ScrollView style={styles.container}>
      {/* Account Status */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Account Status</Text>
          <View style={styles.statusGrid}>
            <View style={styles.statusItem}>
              <Icon name="cash" size={24} color="#2E8B57" />
              <Text style={styles.statusValue}>{payments.balance} RWF</Text>
              <Text style={styles.statusLabel}>Current Balance</Text>
            </View>
            <View style={styles.statusItem}>
              <Icon name="calendar" size={24} color="#FFA500" />
              <Text style={styles.statusValue}>{daysUntilDue}</Text>
              <Text style={styles.statusLabel}>Days Until Due</Text>
            </View>
          </View>
          
          {daysUntilDue <= 3 && (
            <View style={styles.warningBanner}>
              <Icon name="alert" size={20} color="#FF6B6B" />
              <Text style={styles.warningText}>
                Payment due in {daysUntilDue} day{daysUntilDue !== 1 ? 's' : ''}
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>

      {/* Quick Payment */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Quick Payment</Text>
          <Text style={styles.subtitle}>Select amount to pay now</Text>
          
          <View style={styles.quickAmounts}>
            {[100, 500, 1000, 2000].map(amount => (
              <Button
                key={amount}
                mode="outlined"
                onPress={() => handleMobileMoneyPayment(amount)}
                style={styles.amountButton}
                disabled={processing}
                loading={processing}
              >
                {amount} RWF
              </Button>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Payment Plans */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Subscription Plans</Text>
          <RadioButton.Group
            value={paymentPlan}
            onValueChange={value => setPaymentPlan(value)}
          >
            {paymentPlans.map(plan => (
              <View key={plan.id} style={styles.radioItem}>
                <RadioButton value={plan.id} color="#2E8B57" />
                <View style={styles.planInfo}>
                  <Text style={styles.planLabel}>{plan.label}</Text>
                  <Text style={styles.planDescription}>
                    Auto-renewal • Cancel anytime
                  </Text>
                </View>
              </View>
            ))}
          </RadioButton.Group>
          
          <Button
            mode="contained"
            style={styles.subscribeButton}
            onPress={() => {
              const amount = paymentPlans.find(p => p.id === paymentPlan)?.amount;
              if (amount) handleMobileMoneyPayment(amount);
            }}
            disabled={processing}
            loading={processing}
          >
            {processing ? 'Processing...' : 'Subscribe to Plan'}
          </Button>
        </Card.Content>
      </Card>

      {/* Mobile Money Providers */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Mobile Money Providers</Text>
          <Text style={styles.subtitle}>Select your preferred payment method</Text>
          
          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.providerItem,
                selectedMethod === method.id && styles.selectedProvider
              ]}
              onPress={() => setSelectedMethod(method.id)}
              disabled={processing}
            >
              <View style={styles.providerInfo}>
                <View style={[styles.providerIcon, { backgroundColor: method.color }]}>
                  <Icon name={method.icon} size={24} color="white" />
                </View>
                <View style={styles.providerDetails}>
                  <Text style={styles.providerName}>{method.name}</Text>
                  <Text style={styles.providerCountries}>
                    Available in: {method.countries.join(', ')}
                  </Text>
                </View>
              </View>
              <RadioButton
                value={method.id}
                status={selectedMethod === method.id ? 'checked' : 'unchecked'}
                color="#2E8B57"
              />
            </TouchableOpacity>
          ))}
        </Card.Content>
      </Card>

      {/* Payment Statistics */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Payment Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{paymentStats.totalPaid} RWF</Text>
              <Text style={styles.statLabel}>Total Paid</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{paymentStats.transactionCount}</Text>
              <Text style={styles.statLabel}>Transactions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{paymentStats.pendingCount}</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Recent Transactions */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Recent Transactions</Text>
          {paymentHistory.slice(0, 5).map(transaction => (
            <List.Item
              key={transaction.id}
              title={`${transaction.amount} RWF`}
              description={`Via ${paymentMethods.find(m => m.id === transaction.method)?.name} • ${transaction.date}`}
              left={props => (
                <List.Icon 
                  {...props} 
                  icon="check-circle" 
                  color={transaction.status === 'completed' ? '#2E8B57' : '#FFA500'} 
                />
              )}
              right={props => (
                <View style={styles.transactionMeta}>
                  <Text style={[
                    styles.statusText,
                    { color: transaction.status === 'completed' ? '#2E8B57' : '#FFA500' }
                  ]}>
                    {transaction.status}
                  </Text>
                  <Text style={styles.transactionId}>
                    {transaction.transactionId}
                  </Text>
                </View>
              )}
            />
          ))}
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
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  statusGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statusItem: {
    alignItems: 'center',
    flex: 1,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  statusLabel: {
    fontSize: 12,
    color: '#666',
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE6E6',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  warningText: {
    color: '#FF6B6B',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  quickAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amountButton: {
    width: '48%',
    marginBottom: 10,
    borderColor: '#2E8B57',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  planInfo: {
    flex: 1,
    marginLeft: 8,
  },
  planLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  planDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  subscribeButton: {
    marginTop: 15,
    backgroundColor: '#2E8B57',
  },
  providerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedProvider: {
    borderColor: '#2E8B57',
    backgroundColor: '#F0F9F0',
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  providerIcon: {
    padding: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  providerDetails: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  providerCountries: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  transactionMeta: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  transactionId: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
});