import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { FoodEntry } from '@/types/nutrition';

interface FoodCardProps {
  entry: FoodEntry;
  onDelete?: (id: number) => void;
}

export default function FoodCard({ entry, onDelete }: FoodCardProps) {
  return (
    <View style={styles.container}>
      {entry.imageUri && (
        <Image source={{ uri: entry.imageUri }} style={styles.image} />
      )}
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.name} numberOfLines={1}>
              {entry.foodName}
            </Text>
            {entry.isAiScanned && (
              <View style={styles.badge}>
                <Ionicons name="sparkles" size={10} color={Colors.green} />
                <Text style={styles.badgeText}>AI</Text>
              </View>
            )}
          </View>
          {onDelete && entry.id && (
            <TouchableOpacity
              onPress={() => onDelete(entry.id!)}
              style={styles.deleteButton}
            >
              <Ionicons name="close-circle" size={20} color={Colors.textFaint} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.details}>
          <Text style={styles.calories}>{entry.calories} kcal</Text>
          <Text style={styles.macros}>
            C: {Math.round(entry.carbs)}g · P: {Math.round(entry.protein)}g · F:{' '}
            {Math.round(entry.fat)}g
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.greenLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 10,
    color: Colors.green,
    fontWeight: '600',
    marginLeft: 2,
  },
  deleteButton: {
    marginLeft: 8,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calories: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.green,
    marginRight: 12,
    fontFamily: 'monospace',
  },
  macros: {
    fontSize: 12,
    color: Colors.textMuted,
    fontFamily: 'monospace',
  },
});
