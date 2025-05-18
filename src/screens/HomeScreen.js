import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, Image, Dimensions } from 'react-native';
import { Text, Surface, Divider, Avatar, Chip, Badge, Card as PaperCard, ActivityIndicator, ProgressBar } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import Card from '../components/Card';
import Button from '../components/Button';
import Colors from '../constants/colors';
import { getAnnouncements } from '../utils/storage';
import { AuthContext } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch announcements from storage
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoading(true);
        const data = await getAnnouncements();
        // Only show the 3 most recent announcements on home screen
        setAnnouncements(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
      {/* Dashboard Header */}
      <Surface style={styles.headerSection} elevation={4}>
        <View style={styles.headerContent}>
          <View style={styles.dashboardHeader}>
            <Text variant="headlineMedium" style={styles.dashboardTitle}>Dashboard</Text>
            <View style={styles.userSection}>
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
          <Text variant="titleMedium" style={styles.welcomeText}>
            Namibia Hockey, <Text style={styles.usernameText}>{user?.username || 'Player'}</Text>
          </Text>
        </View>
      </Surface>

      {/* Main Dashboard Cards */}
      <View style={styles.dashboardContainer}>
        {/* Team Stats Card */}
        <PaperCard style={styles.statCard} elevation={4}>
          <View style={styles.cardHeader}>
            <Text variant="titleMedium" style={styles.cardHeaderTitle}>Teams</Text>
            <Ionicons name="chevron-forward" size={24} color={Colors.textSecondary} />
          </View>
          <View style={styles.circularProgressContainer}>
            <View style={styles.circularProgress}>
              <Text style={styles.progressNumber}>12</Text>
              <Text style={styles.progressUnit}>Teams</Text>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <Button
              mode="contained"
              title="Register Team"
              icon="plus"
              onPress={() => navigation.navigate('TeamsTab', { screen: 'TeamRegistration' })}
              style={styles.dashboardButton}
            />
          </View>
        </PaperCard>

        {/* Players Stats Card */}
        <PaperCard style={styles.statCard} elevation={4}>
          <View style={styles.cardHeader}>
            <Text variant="titleMedium" style={styles.cardHeaderTitle}>Players</Text>
            <Ionicons name="chevron-forward" size={24} color={Colors.textSecondary} />
          </View>
          <View style={styles.circularProgressContainer}>
            <View style={styles.circularProgress}>
              <Text style={styles.progressNumber}>85</Text>
              <Text style={styles.progressUnit}>%</Text>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <Button
              mode="contained"
              title="Add Player"
              icon="account-plus"
              onPress={() => navigation.navigate('PlayersTab', { screen: 'PlayerRegistration' })}
              style={styles.dashboardButton}
            />
          </View>
        </PaperCard>
      </View>

      {/* Events Section */}
      <View style={styles.eventsContainer}>
        <PaperCard style={styles.eventCard} elevation={4}>
          <View style={styles.cardHeader}>
            <Text variant="titleMedium" style={styles.cardHeaderTitle}>Events</Text>
            <Ionicons name="chevron-forward" size={24} color={Colors.textSecondary} />
          </View>
          <View style={styles.eventContent}>
            <View style={styles.eventItem}>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>League Tournament</Text>
                <Text style={styles.eventDate}>May 20 - June 10, 2025</Text>
              </View>
              <View style={styles.eventStatus}>
                <Chip style={styles.statusChip} textStyle={styles.statusChipText}>Active</Chip>
              </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.eventItem}>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>Summer Cup</Text>
                <Text style={styles.eventDate}>July 15 - July 30, 2025</Text>
              </View>
              <View style={styles.eventStatus}>
                <Chip style={styles.upcomingChip} textStyle={styles.upcomingChipText}>Upcoming</Chip>
              </View>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <Button
              mode="contained"
              title="Register for Event"
              icon="calendar-plus"
              onPress={() => navigation.navigate('EventsTab', { screen: 'EventRegistration' })}
              style={styles.dashboardButton}
            />
          </View>
        </PaperCard>
      </View>

      {/* Announcements Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text variant="titleLarge" style={styles.sectionTitle}>Announcements</Text>
          <Button
            mode="text"
            title="View All"
            icon="chevron-right"
            onPress={() => navigation.navigate('AnnouncementsTab')}
            style={styles.viewAllButton}
            textStyle={styles.viewAllButtonText}
          />
        </View>

        <PaperCard style={styles.announcementsCard} elevation={4}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={Colors.primary} />
              <Text style={styles.loadingText}>Loading announcements...</Text>
            </View>
          ) : announcements.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="information-circle-outline" size={24} color={Colors.textLight} />
              <Text style={styles.emptyText}>No announcements available</Text>
            </View>
          ) : (
            <View style={styles.announcementsList}>
              {announcements.map((announcement) => (
                <View key={announcement.id} style={styles.announcementItem}>
                  <View style={styles.announcementHeader}>
                    <View style={styles.announcementTitleRow}>
                      <Avatar.Icon 
                        icon="newspaper" 
                        size={36} 
                        color={Colors.text} 
                        style={{
                          backgroundColor: announcement.important ? Colors.error : Colors.primary,
                          marginRight: 12
                        }}
                      />
                      <View style={styles.announcementTitleContainer}>
                        <Text style={styles.announcementTitle}>{announcement.title}</Text>
                        <Text style={styles.announcementDate}>
                          {new Date(announcement.createdAt).toLocaleDateString()}
                        </Text>
                      </View>
                    </View>
                    {announcement.important && (
                      <Chip 
                        mode="flat" 
                        style={styles.importantChip}
                        textStyle={styles.importantChipText}
                      >
                        Important
                      </Chip>
                    )}
                  </View>
                  <Text style={styles.announcementMessage}>
                    {announcement.content.length > 100 
                      ? `${announcement.content.substring(0, 100)}...` 
                      : announcement.content}
                  </Text>
                  {announcement.content.length > 100 && (
                    <Text style={styles.readMoreText}>Read more</Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </PaperCard>
      </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 24,
  },
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
  dashboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dashboardTitle: {
    fontWeight: 'bold',
    color: Colors.text,
    fontSize: 28,
  },
  userSection: {
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
  welcomeText: {
    color: Colors.textLight,
    fontSize: 16,
  },
  usernameText: {
    color: Colors.textSecondary,
    fontWeight: 'bold',
  },
  dashboardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    width: (width - 40) / 2,
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  cardHeaderTitle: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize: 18,
  },
  circularProgressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  circularProgress: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 8,
    borderColor: Colors.progressForeground,
    backgroundColor: Colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  progressUnit: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  cardFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
  dashboardButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  eventsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  eventCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  eventContent: {
    padding: 16,
  },
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: Colors.textLight,
  },
  eventStatus: {
    marginLeft: 8,
  },
  statusChip: {
    backgroundColor: Colors.success,
  },
  statusChipText: {
    color: Colors.text,
    fontWeight: 'bold',
  },
  upcomingChip: {
    backgroundColor: Colors.warning,
  },
  upcomingChipText: {
    color: Colors.text,
    fontWeight: 'bold',
  },
  divider: {
    backgroundColor: Colors.divider,
    height: 1,
    marginVertical: 8,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: Colors.text,
    fontSize: 18,
  },
  viewAllButton: {
    marginVertical: 0,
  },
  viewAllButtonText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  loadingText: {
    color: Colors.textLight,
    marginLeft: 8,
  },
  emptyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  emptyText: {
    color: Colors.textLight,
    marginLeft: 8,
  },
  announcementCard: {
    marginBottom: 12,
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  announcementMessage: {
    color: Colors.text,
    marginTop: 8,
  },
  importantBadge: {
    backgroundColor: Colors.error,
  },
  importantChip: {
    backgroundColor: Colors.error,
  },
  importantChipText: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  linkButton: {
    marginVertical: 6,
  },
  announcementsCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 16,
  },
  announcementsList: {
    padding: 16,
  },
  announcementItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  announcementTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  announcementTitleContainer: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  announcementDate: {
    fontSize: 12,
    color: Colors.textLight,
  },
  announcementMessage: {
    color: Colors.text,
    marginTop: 8,
    lineHeight: 20,
  },
  readMoreText: {
    color: Colors.textSecondary,
    marginTop: 8,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
