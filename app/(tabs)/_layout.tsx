/**
 * Tab Layout
 *
 * Bottom tab navigation using expo-router tabs.
 * Customize icons, labels, and behavior here.
 */

import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

// You can import icons from @expo/vector-icons or use custom icons
// import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          height: Platform.OS === 'ios' ? 88 : 60,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: 'Home',
          tabBarLabel: 'Home',
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="home" size={size} color={color} />
          // ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          headerTitle: 'Explore',
          tabBarLabel: 'Explore',
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="search" size={size} color={color} />
          // ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerTitle: 'Profile',
          tabBarLabel: 'Profile',
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="person" size={size} color={color} />
          // ),
        }}
      />
    </Tabs>
  );
}
