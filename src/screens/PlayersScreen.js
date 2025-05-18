import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import { Text, Surface, Divider, Card as PaperCard, Chip, ActivityIndicator, FAB, Searchbar, Avatar, Badge } from 'react-native-paper';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import Button from '../components/Button';
import Colors from '../constants/colors';
import { getPlayers, getTeams } from '../utils/storage';

const { width } = Dimensions.get('window');

const PlayersScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  // Load players and teams from storage
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load teams first to get team names
        const storedTeams = await getTeams();
        const teamMap = {};
        storedTeams.forEach(team => {
          teamMap[team.id] = team.name;
        });
        setTeams(teamMap);
        
        // Load players
        const storedPlayers = await getPlayers();
        // Format player data
        const formattedPlayers = storedPlayers.map(player => ({
          id: player.id,
          name: `${player.firstName} ${player.lastName}`,
          team: teamMap[player.teamId] || 'Unknown Team',
          position: player.position,
          age: calculateAge(player.dateOfBirth),
          teamId: player.teamId
        }));
        setPlayers(formattedPlayers);
      } catch (error) {
        console.error('Error loading players:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Refresh data when navigating back to this screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        setIsLoading(true);
        
        // Refresh teams
        const storedTeams = await getTeams();
        const teamMap = {};
        storedTeams.forEach(team => {
          teamMap[team.id] = team.name;
        });
        setTeams(teamMap);
        
        // Refresh players
        const storedPlayers = await getPlayers();
        const formattedPlayers = storedPlayers.map(player => ({
          id: player.id,
          name: `${player.firstName} ${player.lastName}`,
          team: teamMap[player.teamId] || 'Unknown Team',
          position: player.position,
          age: calculateAge(player.dateOfBirth),
          teamId: player.teamId
        }));
        setPlayers(formattedPlayers);
      } catch (error) {
        console.error('Error refreshing players:', error);
      } finally {
        setIsLoading(false);
      }
    });
    
    return unsubscribe;
  }, [navigation]);
  
  // Helper function to calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 0;
    
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    
    return age;
  };

  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPlayerItem = ({ item }) => {
    // Calculate a stat percentage for the circular indicator (just for visual purposes)
    const statPercentage = (item.age / 40) * 100; // Using age as a sample metric
    
    return (
      <PaperCard 
        style={styles.playerCard} 
        elevation={4}
      >
        <View style={styles.playerCardContent}>
          <View style={styles.playerHeader}>
            <View style={styles.playerNameContainer}>
              <Text style={styles.playerName}>{item.name}</Text>
              <Chip 
                style={styles.positionChip} 
                textStyle={styles.positionChipText}
              >
                {item.position}
              </Chip>
            </View>
            <View style={styles.playerTeam}>
              <FontAwesome5 name="users" size={16} color={Colors.accent} solid />
              <Text style={styles.teamText}>{item.team}</Text>
            </View>
          </View>
          
          <View style={styles.playerStatsContainer}>
            <View style={styles.ageContainer}>
              <View style={styles.ageCircle}>
                <Text style={styles.ageNumber}>{item.age}</Text>
                <Text style={styles.ageLabel}>Years</Text>
              </View>
            </View>
            
            <View style={styles.playerStatsRight}>
              <View style={styles.progressContainer}>
                <Text style={styles.progressLabel}>Experience</Text>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: `${Math.min(statPercentage, 100)}%` }]} />
                </View>
                <Text style={styles.progressPercentage}>{Math.round(statPercentage)}%</Text>
              </View>
              
              <View style={styles.playerActions}>
                <Button
                  mode="text"
                  icon="account-edit"
                  title="Edit"
                  onPress={() => navigation.navigate('PlayerDetails', { playerId: item.id })}
                  style={styles.playerActionButton}
                  textStyle={styles.playerActionButtonText}
                />
                <Button
                  mode="text"
                  icon="information"
                  title="Details"
                  onPress={() => navigation.navigate('PlayerDetails', { playerId: item.id })}
                  style={styles.playerActionButton}
                  textStyle={styles.playerActionButtonText}
                />
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
            <Text style={styles.title}>Players</Text>
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
          <Text style={styles.subtitle}>Manage your hockey players</Text>
        </View>
      </Surface>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search players..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchBar}
          iconColor={Colors.textSecondary}
          inputStyle={styles.searchInput}
          placeholderTextColor={Colors.textLight}
          theme={{ colors: { elevation: { level3: Colors.cardBackground } } }}
        />
      </View>
      
      {isLoading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading players...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPlayers}
          keyExtractor={item => item.id}
          renderItem={renderPlayerItem}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderTitle}>Your Players</Text>
              <Text style={styles.listHeaderCount}>{filteredPlayers.length} Players</Text>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <FontAwesome5 name="user-slash" size={50} color={Colors.textLight} />
              <Text style={styles.emptyTitle}>
                {searchQuery ? 'No Matches Found' : 'No Players Found'}
              </Text>
              <Text style={styles.emptyText}>
                {searchQuery ? 'Try a different search term' : 'You haven\'t registered any players yet'}
              </Text>
              {!searchQuery && (
                <Button
                  title="Register New Player"
                  icon="plus"
                  onPress={() => navigation.navigate('PlayerRegistration')}
                  mode="contained"
                  style={styles.emptyButton}
                />
              )}
            </View>
          }
        />
      )}
      
      <FAB
        icon="plus"
        style={styles.fab}
        color={Colors.text}
        onPress={() => navigation.navigate('PlayerRegistration')}
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
  
  // Search styles
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
    marginTop: 8,
  },
  searchBar: {
    elevation: 2,
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  searchInput: {
    fontSize: 16,
    color: Colors.text,
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
  
  // Player card styles
  list: {
    padding: 16,
    paddingBottom: 80, // Extra padding for FAB
  },
  playerCard: {
    marginBottom: 16,
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  playerCardContent: {
    padding: 16,
  },
  playerHeader: {
    marginBottom: 16,
  },
  playerNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  playerName: {
    fontWeight: 'bold',
    color: Colors.text,
    fontSize: 18,
    flex: 1,
  },
  positionChip: {
    backgroundColor: Colors.primary,
    height: 28,
  },
  positionChipText: {
    color: Colors.text,
    fontWeight: 'bold',
  },
  playerTeam: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.textLight,
  },
  
  // Player stats styles
  playerStatsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    paddingTop: 16,
  },
  ageContainer: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ageCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 8,
    borderColor: Colors.progressForeground,
    backgroundColor: Colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ageNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  ageLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  playerStatsRight: {
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
  progressPercentage: {
    fontSize: 14,
    color: Colors.textSecondary,
    alignSelf: 'flex-end',
  },
  playerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playerActionButton: {
    marginVertical: 0,
    flex: 1,
  },
  playerActionButtonText: {
    color: Colors.textSecondary,
    fontSize: 14,
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

export default PlayersScreen;
