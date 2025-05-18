import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import { Text, Surface, Divider, Card as PaperCard, Chip, ActivityIndicator, FAB, Avatar, Badge } from 'react-native-paper';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import Button from '../components/Button';
import Colors from '../constants/colors';
import { getTeams, getPlayers } from '../utils/storage';

const { width } = Dimensions.get('window');

const TeamsScreen = ({ navigation }) => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playerCounts, setPlayerCounts] = useState({});
  
  // Load teams from storage
  useEffect(() => {
    const loadTeams = async () => {
      try {
        const storedTeams = await getTeams();
        setTeams(storedTeams);
        
        // Load player counts for each team
        const storedPlayers = await getPlayers();
        const counts = {};
        storedPlayers.forEach(player => {
          if (player.teamId) {
            counts[player.teamId] = (counts[player.teamId] || 0) + 1;
          }
        });
        setPlayerCounts(counts);
      } catch (error) {
        console.error('Error loading teams:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTeams();
  }, []);
  
  // Refresh teams when navigating back to this screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        setIsLoading(true);
        const storedTeams = await getTeams();
        setTeams(storedTeams);
        
        // Refresh player counts
        const storedPlayers = await getPlayers();
        const counts = {};
        storedPlayers.forEach(player => {
          if (player.teamId) {
            counts[player.teamId] = (counts[player.teamId] || 0) + 1;
          }
        });
        setPlayerCounts(counts);
      } catch (error) {
        console.error('Error refreshing teams:', error);
      } finally {
        setIsLoading(false);
      }
    });
    
    return unsubscribe;
  }, [navigation]);

  const renderTeamItem = ({ item }) => {
    const playerCount = playerCounts[item.id] || 0;
    const maxPlayers = 16; // Assuming max team size is 16 players
    const fillPercentage = Math.min(playerCount / maxPlayers, 1);
    
    return (
      <PaperCard 
        style={styles.teamCard} 
        onPress={() => navigation.navigate('TeamDetails', { teamId: item.id })}
        elevation={4}
      >
        <View style={styles.teamCardContent}>
          <View style={styles.teamHeader}>
            <View style={styles.teamNameContainer}>
              <Text style={styles.teamName}>{item.name}</Text>
              <Chip 
                style={[styles.categoryChip, { 
                  backgroundColor: item.category === 'Men' ? Colors.primary : Colors.secondary 
                }]}
                textStyle={styles.categoryChipText}
              >
                {item.category}
              </Chip>
            </View>
            <View style={styles.teamDivision}>
              <FontAwesome5 name="trophy" size={16} color={Colors.accent} solid />
              <Text style={styles.divisionText}>{item.division} Division</Text>
            </View>
          </View>
          
          <View style={styles.teamStatsContainer}>
            <View style={styles.playerCountContainer}>
              <View style={styles.playerCountCircle}>
                <Text style={styles.playerCountNumber}>{playerCount}</Text>
                <Text style={styles.playerCountLabel}>Players</Text>
              </View>
            </View>
            
            <View style={styles.teamStatsRight}>
              <View style={styles.progressContainer}>
                <Text style={styles.progressLabel}>Roster Fill</Text>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: `${fillPercentage * 100}%` }]} />
                </View>
                <Text style={styles.progressPercentage}>{Math.round(fillPercentage * 100)}%</Text>
              </View>
              
              <View style={styles.teamActions}>
                <Button
                  mode="text"
                  icon="account-plus"
                  title="Add Player"
                  onPress={() => navigation.navigate('PlayerRegistration', { teamId: item.id })}
                  style={styles.teamActionButton}
                  textStyle={styles.teamActionButtonText}
                />
                <Button
                  mode="text"
                  icon="information"
                  title="Details"
                  onPress={() => navigation.navigate('TeamDetails', { teamId: item.id })}
                  style={styles.teamActionButton}
                  textStyle={styles.teamActionButtonText}
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
            <Text style={styles.title}>Teams</Text>
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
          <Text style={styles.subtitle}>Manage your hockey teams</Text>
        </View>
      </Surface>
      
      {/* Teams List */}
      {isLoading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading teams...</Text>
        </View>
      ) : (
        <FlatList
          data={teams}
          keyExtractor={item => item.id}
          renderItem={renderTeamItem}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderTitle}>Your Teams</Text>
              <Text style={styles.listHeaderCount}>{teams.length} Teams</Text>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <FontAwesome5 name="users-slash" size={50} color={Colors.textLight} />
              <Text style={styles.emptyTitle}>No Teams Found</Text>
              <Text style={styles.emptyText}>You haven't registered any teams yet</Text>
              <Button
                title="Register New Team"
                icon="plus"
                onPress={() => navigation.navigate('TeamRegistration')}
                mode="contained"
                style={styles.emptyButton}
              />
            </View>
          }
        />
      )}
      
      {/* Add Team FAB */}
      <FAB
        icon="plus"
        style={styles.fab}
        color={Colors.text}
        onPress={() => navigation.navigate('TeamRegistration')}
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
  
  // Team card styles
  list: {
    padding: 16,
    paddingBottom: 80, // Extra padding for FAB
  },
  teamCard: {
    marginBottom: 16,
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  teamCardContent: {
    padding: 16,
  },
  teamHeader: {
    marginBottom: 16,
  },
  teamNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  teamName: {
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
  teamDivision: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divisionText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.textLight,
  },
  
  // Team stats styles
  teamStatsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    paddingTop: 16,
  },
  playerCountContainer: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerCountCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 8,
    borderColor: Colors.progressForeground,
    backgroundColor: Colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerCountNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  playerCountLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  teamStatsRight: {
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
  teamActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teamActionButton: {
    marginVertical: 0,
    flex: 1,
  },
  teamActionButtonText: {
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

export default TeamsScreen;
