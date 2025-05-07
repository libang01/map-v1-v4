import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import Button from '../components/Button';
import Colors from '../constants/colors';

const EventsScreen = ({ navigation }) => {
  // Mock data for events
  const [events, setEvents] = useState([
    { 
      id: '1', 
      title: 'National Championship', 
      date: '2025-06-15', 
      location: 'Windhoek Stadium', 
      category: 'Tournament',
      registrationDeadline: '2025-05-30'
    },
    { 
      id: '2', 
      title: 'Junior Development Camp', 
      date: '2025-07-10', 
      location: 'University of Namibia', 
      category: 'Training',
      registrationDeadline: '2025-06-25'
    },
    { 
      id: '3', 
      title: 'Coastal Cup', 
      date: '2025-08-05', 
      location: 'Swakopmund Sports Complex', 
      category: 'Tournament',
      registrationDeadline: '2025-07-20'
    },
    { 
      id: '4', 
      title: 'Coaching Workshop', 
      date: '2025-09-12', 
      location: 'Namibia Sports Commission', 
      category: 'Workshop',
      registrationDeadline: '2025-08-30'
    },
    { 
      id: '5', 
      title: 'Schools Championship', 
      date: '2025-10-01', 
      location: 'Windhoek High School', 
      category: 'Tournament',
      registrationDeadline: '2025-09-15'
    },
  ]);

  const renderEventItem = ({ item }) => {
    const eventDate = new Date(item.date);
    const deadlineDate = new Date(item.registrationDeadline);
    const currentDate = new Date();
    
    const isRegistrationOpen = currentDate <= deadlineDate;
    
    return (
      <Card style={styles.eventCard} onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}>
        <View style={styles.eventHeader}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <View style={[
            styles.categoryBadge, 
            item.category === 'Tournament' ? styles.tournamentBadge : 
            item.category === 'Training' ? styles.trainingBadge : styles.workshopBadge
          ]}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>
        
        <View style={styles.eventInfo}>
          <View style={styles.infoItem}>
            <Ionicons name="calendar-outline" size={16} color={Colors.primary} />
            <Text style={styles.infoText}>{eventDate.toLocaleDateString()}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={16} color={Colors.primary} />
            <Text style={styles.infoText}>{item.location}</Text>
          </View>
        </View>
        
        <View style={styles.registrationContainer}>
          <Text style={styles.deadlineText}>
            Registration {isRegistrationOpen ? 'closes' : 'closed'} on {deadlineDate.toLocaleDateString()}
          </Text>
          {isRegistrationOpen && (
            <Button 
              title="Register" 
              onPress={() => navigation.navigate('EventRegistration', { eventId: item.id })}
              style={styles.registerButton}
              textStyle={styles.registerButtonText}
            />
          )}
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Upcoming Events</Text>
      </View>
      
      <FlatList
        data={events}
        keyExtractor={item => item.id}
        renderItem={renderEventItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  list: {
    padding: 16,
  },
  eventCard: {
    marginBottom: 12,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.secondary,
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tournamentBadge: {
    backgroundColor: Colors.primary,
  },
  trainingBadge: {
    backgroundColor: Colors.info,
  },
  workshopBadge: {
    backgroundColor: Colors.warning,
  },
  categoryText: {
    color: Colors.background,
    fontSize: 12,
    fontWeight: 'bold',
  },
  eventInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 4,
    fontSize: 14,
    color: Colors.secondary,
  },
  registrationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.gray,
    paddingTop: 8,
  },
  deadlineText: {
    fontSize: 12,
    color: Colors.secondary,
  },
  registerButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginVertical: 0,
  },
  registerButtonText: {
    fontSize: 12,
  },
});

export default EventsScreen;
