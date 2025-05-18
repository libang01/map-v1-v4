import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { Text, Surface, Divider, Card as PaperCard, Avatar, ActivityIndicator } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

import Button from '../components/Button';
import Colors from '../constants/colors';
import { getCurrentUser } from '../utils/storage';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { user, signOut } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut();
      // No need to navigate - the AuthContext will handle updating the auth state
      // which will cause the app to show the login screen
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to logout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  // Use the user data from context or fallback to default values
  const userData = user || {
    username: 'Guest User',
    email: 'guest@example.com',
    phone: 'Not available',
    team: 'Not assigned',
    position: 'Not assigned',
    memberSince: new Date().getFullYear().toString(),
    profileImage: null, // We'll use a placeholder
  };

  return (
    <ScrollView style={styles.screen}>
      <Surface style={styles.headerSection} elevation={2}>
        <View style={styles.headerContent}>
          <Text variant="headlineMedium" style={styles.title}>Profile</Text>
          <Text variant="bodyMedium" style={styles.subtitle}>Manage your account</Text>
        </View>
      </Surface>

      <View style={styles.container}>
        <Surface style={styles.profileHeader} elevation={1}>
          <View style={styles.profileImageContainer}>
            {userData.profileImage ? (
              <Avatar.Image size={100} source={{ uri: userData.profileImage }} />
            ) : (
              <Avatar.Icon size={100} icon="account" color={Colors.background} style={styles.avatar} />
            )}
          </View>
          <Text variant="titleLarge" style={styles.userName}>{userData.username || userData.name || 'User'}</Text>
          <Text variant="bodyMedium" style={styles.userTeam}>{userData.team}</Text>
        </Surface>

        <PaperCard style={styles.infoCard} elevation={2}>
          <PaperCard.Content>
            <Text variant="titleMedium" style={styles.cardTitle}>Contact Information</Text>
            <Divider style={styles.divider} />
            <View style={styles.infoRow}>
              <FontAwesome5 name="envelope" size={18} color={Colors.primary} solid />
              <Text style={styles.infoText}>{userData.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <FontAwesome5 name="phone" size={18} color={Colors.primary} solid />
              <Text style={styles.infoText}>{userData.phone}</Text>
            </View>
          </PaperCard.Content>
        </PaperCard>

        <PaperCard style={styles.infoCard} elevation={2}>
          <PaperCard.Content>
            <Text variant="titleMedium" style={styles.cardTitle}>Hockey Information</Text>
            <Divider style={styles.divider} />
            <View style={styles.infoRow}>
              <FontAwesome5 name="users" size={18} color={Colors.primary} solid />
              <Text style={styles.infoText}>Team: {userData.team}</Text>
            </View>
            <View style={styles.infoRow}>
              <FontAwesome5 name="running" size={18} color={Colors.primary} solid />
              <Text style={styles.infoText}>Position: {userData.position}</Text>
            </View>
            <View style={styles.infoRow}>
              <FontAwesome5 name="calendar-alt" size={18} color={Colors.primary} solid />
              <Text style={styles.infoText}>Member since: {userData.memberSince}</Text>
            </View>
          </PaperCard.Content>
        </PaperCard>

        <View style={styles.buttonContainer}>
          <Button
            title="Edit Profile"
            onPress={() => {}}
            mode="contained"
            style={styles.button}
          />
          <Button
            title="Change Password"
            onPress={() => {}}
            mode="outlined"
            style={styles.button}
          />
          <Button
            title="Logout"
            onPress={handleLogout}
            mode="contained"
            style={[styles.button, styles.logoutButton]}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  headerSection: {
    backgroundColor: Colors.primary,
    paddingVertical: 32,
    paddingHorizontal: 20,
    marginBottom: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: Colors.background,
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.lightBlue,
    fontSize: 16,
  },
  container: {
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
    padding: 24,
    borderRadius: 16,
    backgroundColor: Colors.background,
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: Colors.accent,
  },
  userName: {
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  userTeam: {
    color: Colors.textLight,
  },
  infoCard: {
    marginBottom: 16,
    backgroundColor: Colors.background,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent,
  },
  cardTitle: {
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  divider: {
    marginBottom: 16,
    backgroundColor: Colors.border,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
  button: {
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: Colors.error,
  },
});

export default ProfileScreen;
