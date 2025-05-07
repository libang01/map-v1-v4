import React from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';

import AppNavigator from './src/navigation/AppNavigator';
import Colors from './src/constants/colors';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
  'Non-serializable values were found in the navigation state',
]);

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <StatusBar style="light" backgroundColor={Colors.primary} />
        <AppNavigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
