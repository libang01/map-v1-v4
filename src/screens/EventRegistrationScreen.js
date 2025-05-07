import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'react-native-paper';

import Button from '../components/Button';
import Colors from '../constants/colors';

const EventRegistrationScreen = ({ route, navigation }) => {
  const { eventId } = route.params || {};
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock event data
  const [event, setEvent] = useState({
    id: eventId,
    title: 'National Championship',
    date: '2025-06-15',
    location: 'Windhoek Stadium',
    registrationFee: 'N$500',
    description: 'The annual National Hockey Championship brings together the best teams from across Namibia to compete for the national title.',
  });
  
  // Mock teams data
  const [teams, setTeams] = useState([
    { id: '1', name: 'Windhoek Hockey Club' },
    { id: '2', name: 'Coastal Hockey Club' },
    { id: '3', name: 'University of Namibia' },
    { id: '4', name: 'Namibia Defense Force' },
    { id: '5', name: 'Swakopmund Hockey Club' },
  ]);
  
  // Mock players data
  const [players, setPlayers] = useState([
    { id: '1', name: 'John Smith', teamId: '1' },
    { id: '2', name: 'Sarah Johnson', teamId: '2' },
    { id: '3', name: 'Michael Brown', teamId: '3' },
    { id: '4', name: 'Emma Williams', teamId: '4' },
    { id: '5', name: 'David Miller', teamId: '5' },
    { id: '6', name: 'Lisa Davis', teamId: '1' },
    { id: '7', name: 'Robert Wilson', teamId: '1' },
    { id: '8', name: 'Jennifer Taylor', teamId: '2' },
    { id: '9', name: 'Thomas Anderson', teamId: '3' },
    { id: '10', name: 'Patricia Martinez', teamId: '4' },
  ]);
  
  // Filter players based on selected team
  const teamPlayers = players.filter(player => player.teamId === selectedTeam);
  
  const togglePlayerSelection = (playerId) => {
    setSelectedPlayers(prevSelected => {
      if (prevSelected.includes(playerId)) {
        return prevSelected.filter(id => id !== playerId);
      } else {
        return [...prevSelected, playerId];
      }
    });
  };
  
  const handleSubmit = () => {
    if (!selectedTeam) {
      Alert.alert('Validation Error', 'Please select a team');
      return;
    }
    
    if (selectedPlayers.length === 0) {
      Alert.alert('Validation Error', 'Please select at least one player');
      return;
    }
    
    if (!acceptedTerms) {
      Alert.alert('Validation Error', 'Please accept the terms and conditions');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Success',
        'Event registration submitted successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }, 1500);
  };
  
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Event Registration</Text>
        <Text style={styles.subtitle}>Register for {event.title}</Text>
        
        <View style={styles.eventInfoCard}>
          <Text style={styles.eventInfoTitle}>Event Details</Text>
          <View style={styles.eventInfoRow}>
            <Text style={styles.eventInfoLabel}>Date:</Text>
            <Text style={styles.eventInfoValue}>{new Date(event.date).toLocaleDateString()}</Text>
          </View>
          <View style={styles.eventInfoRow}>
            <Text style={styles.eventInfoLabel}>Location:</Text>
            <Text style={styles.eventInfoValue}>{event.location}</Text>
          </View>
          <View style={styles.eventInfoRow}>
            <Text style={styles.eventInfoLabel}>Registration Fee:</Text>
            <Text style={styles.eventInfoValue}>{event.registrationFee}</Text>
          </View>
          <Text style={styles.eventDescription}>{event.description}</Text>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Select Team *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedTeam}
              onValueChange={(itemValue) => {
                setSelectedTeam(itemValue);
                setSelectedPlayers([]);
              }}
              style={styles.picker}
            >
              <Picker.Item label="Select a team" value="" />
              {teams.map(team => (
                <Picker.Item key={team.id} label={team.name} value={team.id} />
              ))}
            </Picker>
          </View>
        </View>
        
        {selectedTeam && (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Select Players *</Text>
            <View style={styles.playersContainer}>
              {teamPlayers.map(player => (
                <View key={player.id} style={styles.playerCheckbox}>
                  <Checkbox
                    status={selectedPlayers.includes(player.id) ? 'checked' : 'unchecked'}
                    onPress={() => togglePlayerSelection(player.id)}
                    color={Colors.primary}
                  />
                  <Text style={styles.playerName}>{player.name}</Text>
                </View>
              ))}
              {teamPlayers.length === 0 && (
                <Text style={styles.noPlayersText}>No players found for this team</Text>
              )}
            </View>
          </View>
        )}
        
        <View style={styles.termsContainer}>
          <Checkbox
            status={acceptedTerms ? 'checked' : 'unchecked'}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
            color={Colors.primary}
          />
          <Text style={styles.termsText}>
            I accept the terms and conditions for this event and confirm that all registered players are eligible to participate.
          </Text>
        </View>
        
        <Button
          title="Submit Registration"
          onPress={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.secondary,
    marginBottom: 24,
  },
  eventInfoCard: {
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  eventInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: 12,
  },
  eventInfoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  eventInfoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.secondary,
    width: 120,
  },
  eventInfoValue: {
    fontSize: 14,
    color: Colors.secondary,
    flex: 1,
  },
  eventDescription: {
    fontSize: 14,
    color: Colors.secondary,
    marginTop: 12,
    fontStyle: 'italic',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: Colors.secondary,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 5,
    backgroundColor: Colors.background,
  },
  picker: {
    height: 50,
  },
  playersContainer: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 5,
    padding: 8,
    backgroundColor: Colors.background,
  },
  playerCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  playerName: {
    fontSize: 16,
    color: Colors.secondary,
    marginLeft: 8,
  },
  noPlayersText: {
    fontSize: 14,
    color: Colors.gray,
    fontStyle: 'italic',
    padding: 8,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  termsText: {
    fontSize: 14,
    color: Colors.secondary,
    flex: 1,
    marginLeft: 8,
  },
});

export default EventRegistrationScreen;
