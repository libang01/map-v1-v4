import React, { useState, useContext } from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, TextInput, Surface, Divider, TouchableRipple } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import Button from '../components/Button';
import Colors from '../constants/colors';
import { loginUser } from '../utils/storage';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    // Reset error
    setError('');
    
    // Validate input
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Attempt to login
      const user = await loginUser(username, password);
      
      // Use the signIn function from AuthContext to update authentication state
      signIn(user);
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Surface style={styles.logoSurface}>
              <Ionicons name="football-outline" size={60} color={Colors.primary} />
            </Surface>
            <Text variant="headlineMedium" style={styles.appTitle}>Namibia Hockey</Text>
            <Text variant="titleMedium" style={styles.appSubtitle}>Team Management</Text>
          </View>
          
          <Surface style={styles.loginCard} elevation={2}>
            <Text variant="headlineSmall" style={styles.cardTitle}>Welcome Back</Text>
            
            {error ? (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={20} color={Colors.error} />
                <Text variant="bodyMedium" style={styles.errorText}>{error}</Text>
              </View>
            ) : null}
            
            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              mode="outlined"
              left={<TextInput.Icon icon="account" color={Colors.primary} />}
              style={styles.textInput}
              outlineStyle={styles.inputOutline}
            />
            
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              mode="outlined"
              left={<TextInput.Icon icon="lock" color={Colors.primary} />}
              style={styles.textInput}
              outlineStyle={styles.inputOutline}
            />
            
            <Button
              title={isLoading ? "Logging in..." : "Login"}
              onPress={handleLogin}
              disabled={isLoading}
              loading={isLoading}
              style={styles.loginButton}
            />
            
            <Divider style={styles.divider} />
            
            <View style={styles.signupContainer}>
              <Text variant="bodyMedium" style={styles.signupText}>Don't have an account?</Text>
              <TouchableRipple onPress={() => navigation.navigate('Signup')} style={styles.signupButton}>
                <Text variant="bodyMedium" style={styles.signupLink}>Sign up</Text>
              </TouchableRipple>
            </View>
          </Surface>
          
          <View style={styles.helpContainer}>
            <Text variant="bodySmall" style={styles.helpText}>Default admin credentials:</Text>
            <Text variant="bodySmall" style={styles.credentials}>Username: admin123</Text>
            <Text variant="bodySmall" style={styles.credentials}>Password: 12345</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoSurface: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    backgroundColor: Colors.background,
    marginBottom: 16,
  },
  appTitle: {
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 8,
  },
  appSubtitle: {
    color: Colors.textLight,
    marginTop: 4,
  },
  loginCard: {
    padding: 24,
    marginBottom: 24,
    borderRadius: 16,
  },
  cardTitle: {
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.error + '15', // 15% opacity
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: Colors.error,
    marginLeft: 8,
    flex: 1,
  },
  textInput: {
    marginBottom: 16,
    backgroundColor: Colors.background,
  },
  inputOutline: {
    borderRadius: 8,
  },
  loginButton: {
    marginTop: 8,
  },
  divider: {
    marginVertical: 24,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: Colors.textLight,
  },
  signupButton: {
    marginLeft: 8,
    padding: 4,
  },
  signupLink: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  helpContainer: {
    alignItems: 'center',
    marginTop: 24,
    backgroundColor: Colors.primary + '10', // 10% opacity
    padding: 12,
    borderRadius: 8,
  },
  helpText: {
    color: Colors.textLight,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  credentials: {
    color: Colors.primary,
    marginBottom: 4,
  },
});

export default LoginScreen;
