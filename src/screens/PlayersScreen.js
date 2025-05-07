import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import Button from '../components/Button';
import Colors from '../constants/colors';

const PlayersScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for players
  const [players, setPlayers] = useState([
    { id: '1', name: 'John Smith', team: 'Windhoek Hockey Club', position: 'Forward', age: 25 },
    { id: '2', name: 'Sarah Johnson', team: 'Coastal Hockey Club', position: 'Goalkeeper', age: 23 },
    { id: '3', name: 'Michael Brown', team: 'University of Namibia', position: 'Defender', age: 21 },
    { id: '4', name: 'Emma Williams', team: 'Namibia Defense Force', position: 'Midfielder', age: 24 },
    { id: '5', name: 'David Miller', team: 'Swakopmund Hockey Club', position: 'Forward', age: 22 },
  ]);

  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPlayerItem = ({ item }) => (
    <Card style={styles.playerCard} onPress={() => navigation.navigate('PlayerDetails', { playerId: item.id })}>
      <View style={styles.playerHeader}>
        <Text style={styles.playerName}>{item.name}</Text>
        <View style={styles.ageBadge}>
          <Text style={styles.ageText}>{item.age}</Text>
        </View>
      </View>
      <View style={styles.playerInfo}>
        <View style={styles.infoItem}>
          <Ionicons name="people-outline" size={16} color={Colors.primary} />
          <Text style={styles.infoText}>{item.team}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="football-outline" size={16} color={Colors.primary} />
          <Text style={styles.infoText}>{item.position}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Players</Text>
        <Button 
          title="Register New Player" 
          onPress={() => navigation.navigate('PlayerRegistration')}
          style={styles.registerButton}
          textStyle={styles.registerButtonText}
        />
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.gray} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search players..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <FlatList
        data={filteredPlayers}
        keyExtractor={item => item.id}
        renderItem={renderPlayerItem}
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
  registerButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 0,
  },
  registerButtonText: {
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    margin: 16,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  playerCard: {
    marginBottom: 12,
  },
  playerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.secondary,
    flex: 1,
  },
  ageBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  ageText: {
    color: Colors.background,
    fontSize: 12,
    fontWeight: 'bold',
  },
  playerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});

export default PlayersScreen;
