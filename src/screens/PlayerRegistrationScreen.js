import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import Button from '../components/Button';
import Colors from '../constants/colors';

const PlayerRegistrationScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState('Male');
  const [team, setTeam] = useState('');
  const [position, setPosition] = useState('Forward');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for teams
  const teams = [
    { id: '1', name: 'Windhoek Hockey Club' },
    { id: '2', name: 'Coastal Hockey Club' },
    { id: '3', name: 'University of Namibia' },
    { id: '4', name: 'Namibia Defense Force' },
    { id: '5', name: 'Swakopmund Hockey Club' },
  ];

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };

  const handleSubmit = () => {
    if (!firstName || !lastName || !team || !email || !phone) {
      Alert.alert('Validation Error', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Success',
        'Player registration submitted successfully!',
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
        <Text style={styles.title}>Player Registration</Text>
        <Text style={styles.subtitle}>Register as a player in the Namibia Hockey Union</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>First Name *</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter first name"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Last Name *</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter last name"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Date of Birth *</Text>
          <Button
            title={dateOfBirth.toLocaleDateString()}
            onPress={() => setShowDatePicker(true)}
            style={styles.dateButton}
          />
          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Gender *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Team *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={team}
              onValueChange={(itemValue) => setTeam(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select a team" value="" />
              {teams.map(team => (
                <Picker.Item key={team.id} label={team.name} value={team.id} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Position *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={position}
              onValueChange={(itemValue) => setPosition(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Forward" value="Forward" />
              <Picker.Item label="Midfielder" value="Midfielder" />
              <Picker.Item label="Defender" value="Defender" />
              <Picker.Item label="Goalkeeper" value="Goalkeeper" />
            </Picker>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Contact Information</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email address"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Phone Number *</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />
        </View>

        <Button
          title="Register Player"
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
  dateButton: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
});

export default PlayerRegistrationScreen;
