/**
 * Explore Screen (Tab 2)
 *
 * Screen for exploring content, search, etc.
 */

import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native';
import Card from '@components/common/Card';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#8E8E93"
        />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Trending</Text>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Item 1</Text>
          <Text style={styles.cardDescription}>Description for item 1</Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Item 2</Text>
          <Text style={styles.cardDescription}>Description for item 2</Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Item 3</Text>
          <Text style={styles.cardDescription}>Description for item 3</Text>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
  },
});
