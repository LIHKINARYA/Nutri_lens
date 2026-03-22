import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

interface ScanButtonProps {
  onPress: () => void;
}

export default function ScanButton({ onPress }: ScanButtonProps) {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
        <Ionicons name="camera" size={24} color={Colors.card} />
        <Text style={styles.title}>Scan Food with AI</Text>
        <Text style={styles.subtitle}>Tap to take a photo — instant nutrition</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.green,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: Colors.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.card,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.card,
    opacity: 0.9,
    marginTop: 4,
  },
});
