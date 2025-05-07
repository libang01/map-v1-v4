import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import Button from '../components/Button';
import Colors from '../constants/colors';

const TeamRegistrationScreen = ({ navigation }) => {
  const [teamName, setTeamName] = useState('');
  const [category, setCategory] = useState('Men');
  const [division, setDivision] = useState('Premier');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!teamName || !contactName || !contactEmail || !contactPhone) {
      Alert.alert('Validation Error', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Success',
        'Team registration submitted successfully!',
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
        <Text style={styles.title}>Team Registration</Text>
        <Text style={styles.subtitle}>Register your team for the upcoming season</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Team Name *</Text>
          <TextInput
            style={styles.input}
            value={teamName}
            onChangeText={setTeamName}
            placeholder="Enter team name"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Category *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Men" value="Men" />
              <Picker.Item label="Women" value="Women" />
              <Picker.Item label="Boys U18" value="Boys U18" />
              <Picker.Item label="Girls U18" value="Girls U18" />
              <Picker.Item label="Boys U16" value="Boys U16" />
              <Picker.Item label="Girls U16" value="Girls U16" />
              <Picker.Item label="Boys U14" value="Boys U14" />
              <Picker.Item label="Girls U14" value="Girls U14" />
            </Picker>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Division *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={division}
              onValueChange={(itemValue) => setDivision(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Premier" value="Premier" />
              <Picker.Item label="First" value="First" />
              <Picker.Item label="Second" value="Second" />
              <Picker.Item label="Development" value="Development" />
            </Picker>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Contact Information</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Contact Person *</Text>
          <TextInput
            style={styles.input}
            value={contactName}
            onChangeText={setContactName}
            placeholder="Enter contact person's name"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            value={contactEmail}
            onChangeText={setContactEmail}
            placeholder="Enter email address"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Phone Number *</Text>
          <TextInput
            style={styles.input}
            value={contactPhone}
            onChangeText={setContactPhone}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />
        </View>

        <Button
          title="Register Team"
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginTop: 24,
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: Colors.secondary,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    backgroundColor: Colors.background,
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
});

export default TeamRegistrationScreen;
