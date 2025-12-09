/**
 * Home Screen (Tab 1)
 *
 * Main landing screen of the app.
 */

import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useApp } from '@contexts/AppContext';
import { useAuth } from '@contexts/AuthContext';
import Button from '@components/common/Button';
import Card from '@components/common/Card';

export default function HomeScreen() {
  const { theme } = useApp();
  const { user, isAuthenticated } = useAuth();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.title}>Welcome to Expo Mobile App</Text>
        <Text style={styles.subtitle}>
          {isAuthenticated ? `Hello, ${user?.name || 'User'}!` : 'Please sign in'}
        </Text>
      </View>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Getting Started</Text>
        <Text style={styles.cardText}>
          This is a production-ready Expo app structure with:
        </Text>
        <Text style={styles.cardText}>• expo-router for navigation</Text>
        <Text style={styles.cardText}>• React Context for state management</Text>
        <Text style={styles.cardText}>• EAS Build configuration</Text>
        <Text style={styles.cardText}>• Clean architecture</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.buttonContainer}>
          <Button title="Primary Action" onPress={() => console.log('Action 1')} />
          <Button
            title="Secondary Action"
            variant="secondary"
            onPress={() => console.log('Action 2')}
          />
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    padding: 16,
  },
  hero: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    color: '#3C3C43',
    marginBottom: 8,
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 12,
  },
});
