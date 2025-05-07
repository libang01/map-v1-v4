import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import Button from '../components/Button';
import Colors from '../constants/colors';

const TeamsScreen = ({ navigation }) => {
  // Mock data for teams
  const [teams, setTeams] = useState([
    { id: '1', name: 'Windhoek Hockey Club', category: 'Men', division: 'Premier', players: 18 },
    { id: '2', name: 'Coastal Hockey Club', category: 'Women', division: 'Premier', players: 16 },
    { id: '3', name: 'University of Namibia', category: 'Men', division: 'First', players: 20 },
    { id: '4', name: 'Namibia Defense Force', category: 'Women', division: 'First', players: 15 },
    { id: '5', name: 'Swakopmund Hockey Club', category: 'Men', division: 'Premier', players: 17 },
  ]);

  const renderTeamItem = ({ item }) => (
    <Card style={styles.teamCard} onPress={() => navigation.navigate('TeamDetails', { teamId: item.id })}>
      <View style={styles.teamHeader}>
        <Text style={styles.teamName}>{item.name}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
      <View style={styles.teamInfo}>
        <View style={styles.infoItem}>
          <Ionicons name="trophy-outline" size={16} color={Colors.primary} />
          <Text style={styles.infoText}>{item.division} Division</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="people-outline" size={16} color={Colors.primary} />
          <Text style={styles.infoText}>{item.players} Players</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Teams</Text>
        <Button 
          title="Register New Team" 
          onPress={() => navigation.navigate('TeamRegistration')}
          style={styles.registerButton}
          textStyle={styles.registerButtonText}
        />
      </View>
      
      <FlatList
        data={teams}
        keyExtractor={item => item.id}
        renderItem={renderTeamItem}
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
  list: {
    padding: 16,
  },
  teamCard: {
    marginBottom: 12,
  },
  teamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.secondary,
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    color: Colors.background,
    fontSize: 12,
    fontWeight: 'bold',
  },
  teamInfo: {
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

export default TeamsScreen;
