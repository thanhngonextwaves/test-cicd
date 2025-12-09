/**
 * Modal Screen
 *
 * Example modal screen using expo-router.
 * Navigate here with: router.push('/modal')
 */

import { StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '@components/common/Button';

export default function ModalScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>This is a Modal</Text>
        <Text style={styles.description}>
          Modals are configured in the root layout with presentation: 'modal'
        </Text>
        <Button
          title="Close Modal"
          onPress={() => router.back()}
          style={styles.closeButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  closeButton: {
    width: '100%',
  },
});
