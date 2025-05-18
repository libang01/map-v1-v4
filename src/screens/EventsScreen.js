import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Alert, Dimensions } from 'react-native';
import { Text, Surface, Divider, Card as PaperCard, Chip, ActivityIndicator, FAB, IconButton, Avatar, Badge } from 'react-native-paper';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import Button from '../components/Button';
import Colors from '../constants/colors';
import { getEvents, deleteEvent, initializeStorage } from '../utils/storage';

const { width } = Dimensions.get('window');

const EventsScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load events from storage
  useEffect(() => {
    const loadEvents = async () => {
      try {
        // Initialize storage with sample data if empty
        await initializeStorage();
        
        // Load events
        const storedEvents = await getEvents();
        setEvents(storedEvents);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadEvents();
  }, []);
  
  // Refresh events when navigating back to this screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        setIsLoading(true);
        const storedEvents = await getEvents();
        setEvents(storedEvents);
      } catch (error) {
        console.error('Error refreshing events:', error);
      } finally {
        setIsLoading(false);
      }
    });
    
    return unsubscribe;
  }, [navigation]);
  
  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setEvents(events.filter(event => event.id !== eventId));
      Alert.alert('Success', 'Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
      Alert.alert('Error', 'Failed to delete event. Please try again.');
    }
  };

  const renderEventItem = ({ item }) => {
    const eventDate = new Date(item.date);
    const deadlineDate = new Date(item.registrationDeadline);
    const currentDate = new Date();
    
    const isRegistrationOpen = currentDate <= deadlineDate;
    
    // Calculate days remaining for registration
    const daysRemaining = isRegistrationOpen ? 
      Math.ceil((deadlineDate - currentDate) / (1000 * 60 * 60 * 24)) : 0;
    
    // Calculate a fill percentage for the circular indicator
    const maxDays = 30; // Assuming max registration period is 30 days
    const fillPercentage = isRegistrationOpen ? 
      Math.min((daysRemaining / maxDays) * 100, 100) : 0;
    
    // Determine the category color
    let categoryColor;
    if (item.category === 'Tournament') {
      categoryColor = Colors.primary;
    } else if (item.category === 'Training') {
      categoryColor = Colors.secondary;
    } else {
      categoryColor = Colors.warning;
    }
    
    return (
      <PaperCard 
        style={styles.eventCard} 
        elevation={4}
      >
        <View style={styles.eventCardContent}>
          <View style={styles.eventHeader}>
            <View style={styles.eventTitleContainer}>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Chip 
                style={[styles.categoryChip, { backgroundColor: categoryColor }]}
                textStyle={styles.categoryChipText}
              >
                {item.category}
              </Chip>
            </View>
            <View style={styles.eventDateLocation}>
              <View style={styles.infoItem}>
                <FontAwesome5 name="calendar-alt" size={16} color={Colors.accent} solid />
                <Text style={styles.infoText}>{eventDate.toLocaleDateString()}</Text>
              </View>
              <View style={styles.infoItem}>
                <FontAwesome5 name="map-marker-alt" size={16} color={Colors.accent} solid />
                <Text style={styles.infoText}>{item.location}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.eventStatsContainer}>
            <View style={styles.registrationContainer}>
              <View style={styles.registrationCircle}>
                {isRegistrationOpen ? (
                  <>
                    <Text style={styles.daysNumber}>{daysRemaining}</Text>
                    <Text style={styles.daysLabel}>Days Left</Text>
                  </>
                ) : (
                  <Text style={styles.closedText}>Closed</Text>
                )}
              </View>
            </View>
            
            <View style={styles.eventStatsRight}>
              <View style={styles.progressContainer}>
                <Text style={styles.progressLabel}>Registration Period</Text>
                <View style={styles.progressBarContainer}>
                  <View 
                    style={[styles.progressBar, 
                      { width: `${fillPercentage}%`, 
                        backgroundColor: isRegistrationOpen ? Colors.progressForeground : Colors.error 
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.statusText}>
                  {isRegistrationOpen ? 
                    `Closes on ${deadlineDate.toLocaleDateString()}` : 
                    `Closed on ${deadlineDate.toLocaleDateString()}`}
                </Text>
              </View>
              
              <View style={styles.eventActions}>
                <Button
                  mode="text"
                  icon="pencil"
                  title="Edit"
                  onPress={() => navigation.navigate('EventEdit', { eventId: item.id })}
                  style={styles.eventActionButton}
                  textStyle={styles.eventActionButtonText}
                />
                <Button
                  mode="text"
                  icon="delete"
                  title="Delete"
                  onPress={() => {
                    Alert.alert(
                      'Delete Event',
                      `Are you sure you want to delete "${item.title}"?`,
                      [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Delete', onPress: () => handleDeleteEvent(item.id), style: 'destructive' },
                      ],
                    );
                  }}
                  style={styles.eventActionButton}
                  textStyle={[styles.eventActionButtonText, { color: Colors.error }]}
                />
                {isRegistrationOpen && (
                  <Button
                    mode="contained"
                    icon="calendar-plus"
                    title="Register"
                    onPress={() => navigation.navigate('EventRegistration', { eventId: item.id })}
                    style={styles.registerButton}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </PaperCard>
    );
  };

  return (
    <View style={styles.screen}>
      {/* Header Section */}
      <Surface style={styles.headerSection} elevation={4}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>Events</Text>
            <View style={styles.headerActions}>
              <View style={styles.notificationBadge}>
                <Ionicons name="notifications" size={24} color={Colors.text} />
                <Badge style={styles.badge}>2</Badge>
              </View>
              <Avatar.Icon 
                size={40} 
                icon="account" 
                color={Colors.text} 
                style={styles.avatar}
              />
            </View>
          </View>
          <Text style={styles.subtitle}>View and register for hockey events</Text>
        </View>
      </Surface>
      
      {isLoading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading events...</Text>
        </View>
      ) : (
        <FlatList
          data={events}
          keyExtractor={item => item.id}
          renderItem={renderEventItem}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderTitle}>Upcoming Events</Text>
              <Text style={styles.listHeaderCount}>{events.length} Events</Text>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <FontAwesome5 name="calendar-times" size={50} color={Colors.textLight} />
              <Text style={styles.emptyTitle}>No Events Found</Text>
              <Text style={styles.emptyText}>You haven't created any events yet</Text>
              <Button
                title="Create New Event"
                icon="plus"
                onPress={() => navigation.navigate('EventCreation')}
                mode="contained"
                style={styles.emptyButton}
              />
            </View>
          }
        />
      )}
      
      <FAB
        icon="plus"
        style={styles.fab}
        color={Colors.text}
        onPress={() => navigation.navigate('EventCreation')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Screen container
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  // Header styles
  headerSection: {
    backgroundColor: Colors.surface,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerContent: {
    width: '100%',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    color: Colors.text,
    fontSize: 28,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationBadge: {
    marginRight: 16,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Colors.error,
  },
  avatar: {
    backgroundColor: Colors.cardBackground,
  },
  subtitle: {
    color: Colors.textLight,
    fontSize: 16,
  },
  
  // List header
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  listHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  listHeaderCount: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  
  // Event card styles
  list: {
    padding: 16,
    paddingBottom: 80, // Extra padding for FAB
  },
  eventCard: {
    marginBottom: 16,
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  eventCardContent: {
    padding: 16,
  },
  eventHeader: {
    marginBottom: 16,
  },
  eventTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventTitle: {
    fontWeight: 'bold',
    color: Colors.text,
    fontSize: 18,
    flex: 1,
  },
  categoryChip: {
    height: 28,
  },
  categoryChipText: {
    color: Colors.text,
    fontWeight: 'bold',
  },
  eventDateLocation: {
    marginTop: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.textLight,
  },
  
  // Event stats styles
  eventStatsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    paddingTop: 16,
  },
  registrationContainer: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registrationCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 8,
    borderColor: Colors.progressForeground,
    backgroundColor: Colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daysNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  daysLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  closedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.error,
  },
  eventStatsRight: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: Colors.progressBackground,
    borderRadius: 4,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.progressForeground,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    color: Colors.textSecondary,
    alignSelf: 'flex-end',
  },
  eventActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  eventActionButton: {
    marginVertical: 0,
  },
  eventActionButtonText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  registerButton: {
    marginVertical: 0,
    backgroundColor: Colors.primary,
  },
  
  // Loading and empty states
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    color: Colors.textSecondary,
    fontSize: 16,
  },
  emptyContainer: {
    margin: 20,
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderStyle: 'dashed',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 16,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textLight,
    marginVertical: 8,
    textAlign: 'center',
  },
  emptyButton: {
    marginTop: 16,
    backgroundColor: Colors.primary,
  },
  
  // FAB
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
  },
  divider: {
    backgroundColor: Colors.divider,
    height: 1,
    marginVertical: 8,
  },
});

export default EventsScreen;
