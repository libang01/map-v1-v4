import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import Button from '../components/Button';
import Colors from '../constants/colors';

const TeamDetailsScreen = ({ route, navigation }) => {
  const { teamId } = route.params;
  
  // Mock team data
  const [team, setTeam] = useState({
    id: teamId,
    name: 'Windhoek Hockey Club',
    category: 'Men',
    division: 'Premier',
    founded: '1985',
    homeGround: 'Windhoek Hockey Stadium',
    coach: 'Michael Johnson',
    contactEmail: 'info@windhoekHC.com',
    contactPhone: '+264 61 123 4567',
    description: 'Windhoek Hockey Club is one of the oldest and most successful hockey clubs in Namibia, with a strong tradition of developing local talent and competing at the highest level.',
  });
  
  // Mock players data
  const [players, setPlayers] = useState([
    { id: '1', name: 'John Smith', position: 'Forward', age: 25 },
    { id: '2', name: 'Robert Wilson', position: 'Midfielder', age: 27 },
    { id: '3', name: 'David Brown', position: 'Defender', age: 24 },
    { id: '4', name: 'Thomas Clark', position: 'Goalkeeper', age: 29 },
    { id: '5', name: 'Michael Davis', position: 'Forward', age: 22 },
    { id: '6', name: 'William Taylor', position: 'Midfielder', age: 26 },
    { id: '7', name: 'James Anderson', position: 'Defender', age: 23 },
  ]);
  
  // Mock upcoming matches
  const [upcomingMatches, setUpcomingMatches] = useState([
    { id: '1', opponent: 'Coastal Hockey Club', date: '2025-06-10', venue: 'Home' },
    { id: '2', opponent: 'University of Namibia', date: '2025-06-17', venue: 'Away' },
    { id: '3', opponent: 'Namibia Defense Force', date: '2025-06-24', venue: 'Home' },
  ]);
  
  const renderPlayerItem = ({ item }) => (
    <Card style={styles.playerCard} onPress={() => navigation.navigate('PlayerDetails', { playerId: item.id })}>
      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{item.name}</Text>
        <View style={styles.playerDetails}>
          <Text style={styles.playerPosition}>{item.position}</Text>
          <Text style={styles.playerAge}>Age: {item.age}</Text>
        </View>
      </View>
    </Card>
  );
  
  const renderMatchItem = ({ item }) => (
    <Card style={styles.matchCard}>
      <View style={styles.matchInfo}>
        <Text style={styles.matchDate}>{new Date(item.date).toLocaleDateString()}</Text>
        <Text style={styles.matchOpponent}>vs {item.opponent}</Text>
        <View style={[styles.venueBadge, item.venue === 'Home' ? styles.homeVenue : styles.awayVenue]}>
          <Text style={styles.venueText}>{item.venue}</Text>
        </View>
      </View>
    </Card>
  );
  
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.teamName}>{team.name}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{team.category}</Text>
          </View>
        </View>
        
        <Card style={styles.infoCard}>
          <Text style={styles.cardTitle}>Team Information</Text>
          <View style={styles.infoRow}>
            <Ionicons name="trophy-outline" size={20} color={Colors.primary} />
            <Text style={styles.infoText}>Division: {team.division}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
            <Text style={styles.infoText}>Founded: {team.founded}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color={Colors.primary} />
            <Text style={styles.infoText}>Home Ground: {team.homeGround}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={20} color={Colors.primary} />
            <Text style={styles.infoText}>Coach: {team.coach}</Text>
          </View>
        </Card>
        
        <Card style={styles.infoCard}>
          <Text style={styles.cardTitle}>Contact Information</Text>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={20} color={Colors.primary} />
            <Text style={styles.infoText}>{team.contactEmail}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={20} color={Colors.primary} />
            <Text style={styles.infoText}>{team.contactPhone}</Text>
          </View>
        </Card>
        
        <Card style={styles.infoCard}>
          <Text style={styles.cardTitle}>About</Text>
          <Text style={styles.description}>{team.description}</Text>
        </Card>
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Players</Text>
          <Button 
            title="Add Player" 
            onPress={() => navigation.navigate('PlayerRegistration')}
            style={styles.addButton}
            textStyle={styles.addButtonText}
          />
        </View>
        
        <FlatList
          data={players}
          keyExtractor={item => item.id}
          renderItem={renderPlayerItem}
          scrollEnabled={false}
        />
        
        <Text style={styles.sectionTitle}>Upcoming Matches</Text>
        
        <FlatList
          data={upcomingMatches}
          keyExtractor={item => item.id}
          renderItem={renderMatchItem}
          scrollEnabled={false}
          style={styles.matchesList}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  teamName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  categoryText: {
    color: Colors.background,
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoCard: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: Colors.secondary,
    marginLeft: 12,
  },
  description: {
    fontSize: 16,
    color: Colors.secondary,
    lineHeight: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginTop: 16,
    marginBottom: 12,
  },
  addButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginVertical: 0,
  },
  addButtonText: {
    fontSize: 14,
  },
  playerCard: {
    marginBottom: 8,
    padding: 12,
  },
  playerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  playerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerPosition: {
    fontSize: 14,
    color: Colors.primary,
    marginRight: 12,
  },
  playerAge: {
    fontSize: 14,
    color: Colors.secondary,
  },
  matchesList: {
    marginBottom: 16,
  },
  matchCard: {
    marginBottom: 8,
    padding: 12,
  },
  matchInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  matchDate: {
    fontSize: 14,
    color: Colors.secondary,
  },
  matchOpponent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.secondary,
    flex: 1,
    marginLeft: 12,
  },
  venueBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  homeVenue: {
    backgroundColor: Colors.success,
  },
  awayVenue: {
    backgroundColor: Colors.info,
  },
  venueText: {
    color: Colors.background,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default TeamDetailsScreen;
