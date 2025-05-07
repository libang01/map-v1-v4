import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import Button from '../components/Button';
import Colors from '../constants/colors';

const PlayerDetailsScreen = ({ route, navigation }) => {
  const { playerId } = route.params;
  
  // Mock player data
  const [player, setPlayer] = useState({
    id: playerId,
    name: 'John Smith',
    age: 25,
    dateOfBirth: '2000-05-15',
    team: 'Windhoek Hockey Club',
    position: 'Forward',
    nationality: 'Namibian',
    joinedYear: '2020',
    email: 'john.smith@example.com',
    phone: '+264 81 123 4567',
    bio: 'John is a talented forward with excellent goal-scoring abilities. He has represented Namibia at international tournaments and is known for his speed and technical skills.',
    stats: {
      matches: 45,
      goals: 28,
      assists: 12,
      yellowCards: 3,
      redCards: 0,
    },
    profileImage: null, // We'll use a placeholder
  });
  
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            {player.profileImage ? (
              <Image source={{ uri: player.profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Ionicons name="person" size={60} color={Colors.gray} />
              </View>
            )}
          </View>
          <Text style={styles.playerName}>{player.name}</Text>
          <View style={styles.positionBadge}>
            <Text style={styles.positionText}>{player.position}</Text>
          </View>
        </View>
        
        <Card style={styles.infoCard}>
          <Text style={styles.cardTitle}>Personal Information</Text>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
            <Text style={styles.infoText}>Age: {player.age}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
            <Text style={styles.infoText}>Date of Birth: {new Date(player.dateOfBirth).toLocaleDateString()}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="flag-outline" size={20} color={Colors.primary} />
            <Text style={styles.infoText}>Nationality: {player.nationality}</Text>
          </View>
        </Card>
        
        <Card style={styles.infoCard}>
          <Text style={styles.cardTitle}>Team Information</Text>
          <View style={styles.infoRow}>
            <Ionicons name="people-outline" size={20} color={Colors.primary} />
            <Text style={styles.infoText}>Team: {player.team}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="football-outline" size={20} color={Colors.primary} />
            <Text style={styles.infoText}>Position: {player.position}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
            <Text style={styles.infoText}>Joined: {player.joinedYear}</Text>
          </View>
        </Card>
        
        <Card style={styles.infoCard}>
          <Text style={styles.cardTitle}>Contact Information</Text>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={20} color={Colors.primary} />
            <Text style={styles.infoText}>{player.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={20} color={Colors.primary} />
            <Text style={styles.infoText}>{player.phone}</Text>
          </View>
        </Card>
        
        <Card style={styles.infoCard}>
          <Text style={styles.cardTitle}>Player Statistics</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{player.stats.matches}</Text>
              <Text style={styles.statLabel}>Matches</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{player.stats.goals}</Text>
              <Text style={styles.statLabel}>Goals</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{player.stats.assists}</Text>
              <Text style={styles.statLabel}>Assists</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{player.stats.yellowCards}</Text>
              <Text style={styles.statLabel}>Yellow Cards</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{player.stats.redCards}</Text>
              <Text style={styles.statLabel}>Red Cards</Text>
            </View>
          </View>
        </Card>
        
        <Card style={styles.infoCard}>
          <Text style={styles.cardTitle}>Biography</Text>
          <Text style={styles.bio}>{player.bio}</Text>
        </Card>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Edit Player"
            onPress={() => {}}
            style={styles.button}
          />
        </View>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  playerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: 8,
  },
  positionBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  positionText: {
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  statItem: {
    alignItems: 'center',
    width: '30%',
    marginBottom: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.secondary,
    marginTop: 4,
  },
  bio: {
    fontSize: 16,
    color: Colors.secondary,
    lineHeight: 24,
  },
  buttonContainer: {
    marginTop: 8,
  },
  button: {
    marginBottom: 12,
  },
});

export default PlayerDetailsScreen;
