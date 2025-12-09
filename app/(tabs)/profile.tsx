/**
 * Profile Screen (Tab 3)
 *
 * User profile, settings, and account management.
 */

import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import { useAuth } from '@contexts/AuthContext';
import Button from '@components/common/Button';
import Card from '@components/common/Card';

export default function ProfileScreen() {
  const { user, isAuthenticated, signIn, signOut } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn({ email: 'user@example.com', password: 'password' });
      Alert.alert('Success', 'Signed in successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      Alert.alert('Success', 'Signed out successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Sign in to access your profile</Text>
          <Button
            title="Sign In"
            onPress={handleSignIn}
            style={styles.signInButton}
          />
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={styles.userName}>{user?.name || 'User'}</Text>
        <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
      </View>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Account Settings</Text>
        <Button
          title="Edit Profile"
          variant="secondary"
          onPress={() => console.log('Edit profile')}
        />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Preferences</Text>
        <Button
          title="Notifications"
          variant="secondary"
          onPress={() => console.log('Notifications')}
        />
      </Card>

      <Button
        title="Sign Out"
        variant="danger"
        onPress={handleSignOut}
        style={styles.signOutButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  content: {
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#8E8E93',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 32,
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
  signInButton: {
    minWidth: 200,
  },
  signOutButton: {
    marginTop: 16,
  },
});
