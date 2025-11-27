import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Card, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

export default function EducationScreen() {
  const [expandedSection, setExpandedSection] = useState(null);

  const businessIdeas = [
    {
      id: 1,
      title: 'Phone Charging Station',
      investment: 'Low',
      revenue: '2000-5000 RWF/day',
      description: 'You can set up a phone charging service for your community',
      requirements: 'Solar system with 100W+ capacity, multiple charging cables'
    },
    {
      id: 2,
      title: 'Refrigerated Drink Sales',
      investment: 'Medium',
      revenue: '5000-10000 RWF/day',
      description: 'Sell more cold drinks and beverages using solar-powered refrigeration',
      requirements: 'Solar refrigerator, initial stock investment'
    }
  ];

  const tutorials = [
    {
      id: 1,
      title: 'Basic System Maintenance',
      duration: '10 mins',
      type: 'video'
    },
    {
      id: 2,
      title: 'Maximizing Battery Life',
      duration: '8 mins',
      type: 'article'
    }
  ];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Section */}
      <Card style={styles.heroCard}>
        <Card.Content>
          <Text style={styles.heroTitle}>Opportunity Hub</Text>
          <Text style={styles.heroSubtitle}>
            Optimize your solar power use for profitable businesses
          </Text>
        </Card.Content>
      </Card>

      {/* Business Ideas */}
      <Text style={styles.sectionTitle}>Business Opportunities</Text>
      {businessIdeas.map(idea => (
        <Card key={idea.id} style={styles.businessCard}>
          <Card.Content>
            <View style={styles.businessHeader}>
              <Text style={styles.businessTitle}>{idea.title}</Text>
              <View style={[styles.investmentBadge, 
                { backgroundColor: idea.investment === 'Low' ? '#2E8B57' : '#FFA500' }]}>
                <Text style={styles.badgeText}>{idea.investment} Investment</Text>
              </View>
            </View>
            
            <Text style={styles.businessDescription}>{idea.description}</Text>
            
            <View style={styles.businessDetails}>
              <View style={styles.detailItem}>
                <Icon name="cash" size={16} color="#2E8B57" />
                <Text style={styles.detailText}>Potential: {idea.revenue}</Text>
              </View>
            </View>

            <Button
              mode="outlined"
              style={styles.learnMoreButton}
              onPress={() => toggleSection(idea.id)}
            >
              {expandedSection === idea.id ? 'Show Less' : 'Learn More'}
            </Button>

            {expandedSection === idea.id && (
              <View style={styles.expandedContent}>
                <Text style={styles.expandedTitle}>Getting Started:</Text>
                <Text style={styles.expandedText}>
                  • Conduct market research in your area{'\n'}
                  • Calculate initial investment costs{'\n'}
                  • Start small and scale as you grow
                </Text>
                
                <View style={styles.actionButtons}>
                  <Button
                    mode="contained"
                    style={styles.actionButton}
                    onPress={() => router.push('/payment')}
                  >
                    Apply for Financing
                  </Button>
                </View>
              </View>
            )}
          </Card.Content>
        </Card>
      ))}

      {/* Tutorials Section */}
      <Text style={styles.sectionTitle}>Learning Resources</Text>
      <Card style={styles.tutorialsCard}>
        <Card.Content>
          {tutorials.map(tutorial => (
            <TouchableOpacity
              key={tutorial.id}
              style={styles.tutorialItem}
              onPress={() => alert('Tutorial content coming soon!')}
            >
              <View style={styles.tutorialInfo}>
                <Icon 
                  name={tutorial.type === 'video' ? 'play-circle' : 'book'} 
                  size={24} 
                  color="#2E8B57" 
                />
                <View style={styles.tutorialText}>
                  <Text style={styles.tutorialTitle}>{tutorial.title}</Text>
                  <Text style={styles.tutorialDuration}>{tutorial.duration} • {tutorial.type}</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={20} color="#666" />
            </TouchableOpacity>
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
  heroCard: {
    backgroundColor: '#2E8B57',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  businessCard: {
    marginBottom: 15,
    elevation: 4,
  },
  businessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  businessTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: '#333',
  },
  investmentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  businessDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  businessDetails: {
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#333',
  },
  learnMoreButton: {
    borderColor: '#2E8B57',
  },
  expandedContent: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  expandedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  expandedText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#2E8B57',
  },
  tutorialsCard: {
    marginBottom: 20,
  },
  tutorialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tutorialInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tutorialText: {
    marginLeft: 10,
    flex: 1,
  },
  tutorialTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  tutorialDuration: {
    fontSize: 12,
    color: '#666',
  },
});