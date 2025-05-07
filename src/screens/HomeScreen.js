import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import Button from '../components/Button';
import Colors from '../constants/colors';

const HomeScreen = ({ navigation }) => {
  // Mock data for announcements
  const announcements = [
    { id: '1', title: 'Season Start', message: 'The new hockey season starts on June 1st!', date: '2025-05-01' },
    { id: '2', title: 'National Team Selection', message: 'National team trials will be held next month', date: '2025-05-03' },
    { id: '3', title: 'New Rules Update', message: 'Check out the updated rules for the upcoming season', date: '2025-05-05' },
  ];

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/icon.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
        <Text style={styles.title}>Namibia Hockey Union</Text>
      </View>

      <View style={styles.quickActions}>
        <Card style={styles.actionCard} onPress={() => navigation.navigate('TeamsTab', { screen: 'TeamRegistration' })}>
          <Ionicons name="people" size={24} color={Colors.primary} />
          <Text style={styles.actionText}>Register Team</Text>
        </Card>
        <Card style={styles.actionCard} onPress={() => navigation.navigate('PlayersTab', { screen: 'PlayerRegistration' })}>
          <Ionicons name="person-add" size={24} color={Colors.primary} />
          <Text style={styles.actionText}>Register Player</Text>
        </Card>
        <Card style={styles.actionCard} onPress={() => navigation.navigate('EventsTab', { screen: 'EventRegistration' })}>
          <Ionicons name="calendar" size={24} color={Colors.primary} />
          <Text style={styles.actionText}>Event Entry</Text>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest Announcements</Text>
        {announcements.map(announcement => (
          <Card key={announcement.id} style={styles.announcementCard}>
            <View style={styles.announcementHeader}>
              <Text style={styles.announcementTitle}>{announcement.title}</Text>
              <Text style={styles.announcementDate}>{new Date(announcement.date).toLocaleDateString()}</Text>
            </View>
            <Text style={styles.announcementMessage}>{announcement.message}</Text>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Links</Text>
        <Button 
          title="Visit Namibia Hockey Website" 
          onPress={() => {}} 
          style={styles.linkButton}
        />
        <Button 
          title="View Upcoming Events" 
          onPress={() => navigation.navigate('EventsTab')} 
          style={styles.linkButton}
        />
        <Button 
          title="View Teams" 
          onPress={() => navigation.navigate('TeamsTab')} 
          style={styles.linkButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 10,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  actionCard: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  actionText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
    color: Colors.secondary,
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.secondary,
  },
  announcementCard: {
    marginBottom: 10,
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  announcementTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.primary,
  },
  announcementDate: {
    fontSize: 12,
    color: Colors.gray,
  },
  announcementMessage: {
    fontSize: 14,
    color: Colors.secondary,
  },
  linkButton: {
    marginVertical: 5,
  },
});

export default HomeScreen;
