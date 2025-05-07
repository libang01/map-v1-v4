import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Button from '../components/Button';
import Card from '../components/Card';
import Colors from '../constants/colors';

const ProfileScreen = () => {
  // Mock user data
  const user = {
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+264 81 123 4567',
    team: 'Windhoek Hockey Club',
    position: 'Forward',
    memberSince: '2023',
    profileImage: null, // We'll use a placeholder
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            {user.profileImage ? (
              <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Ionicons name="person" size={60} color={Colors.gray} />
              </View>
            )}
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userTeam}>{user.team}</Text>
        </View>

        <Card style={styles.infoCard}>
          <Text style={styles.cardTitle}>Contact Information</Text>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={20} color={Colors.primary} />
            <Text style={styles.infoText}>{user.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={20} color={Colors.primary} />
            <Text style={styles.infoText}>{user.phone}</Text>
          </View>
        </Card>

        <Card style={styles.infoCard}>
          <Text style={styles.cardTitle}>Hockey Information</Text>
          <View style={styles.infoRow}>
            <Ionicons name="people-outline" size={20} color={Colors.primary} />
            <Text style={styles.infoText}>Team: {user.team}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="football-outline" size={20} color={Colors.primary} />
            <Text style={styles.infoText}>Position: {user.position}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
            <Text style={styles.infoText}>Member since: {user.memberSince}</Text>
          </View>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            title="Edit Profile"
            onPress={() => {}}
            style={styles.button}
          />
          <Button
            title="Change Password"
            onPress={() => {}}
            style={[styles.button, styles.secondaryButton]}
            textStyle={styles.secondaryButtonText}
          />
          <Button
            title="Logout"
            onPress={() => {}}
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
    backgroundColor: Colors.lightGray,
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
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: 4,
  },
  userTeam: {
    fontSize: 16,
    color: Colors.primary,
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
  buttonContainer: {
    marginTop: 8,
  },
  button: {
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  secondaryButtonText: {
    color: Colors.primary,
  },
  logoutButton: {
    backgroundColor: Colors.error,
  },
});

export default ProfileScreen;
