import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, mealTypeLabels, mealTypeIcons } from '@/constants/theme';
import { FoodEntry } from '@/types/nutrition';
import FoodCard from './FoodCard';

interface MealGroupProps {
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  entries: FoodEntry[];
  totalCalories: number;
  onAdd?: () => void;
  onDeleteEntry?: (id: number) => void;
}

export default function MealGroup({
  mealType,
  entries,
  totalCalories,
  onAdd,
  onDeleteEntry,
}: MealGroupProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <View style={styles.titleRow}>
          <Text style={styles.icon}>{mealTypeIcons[mealType]}</Text>
          <Text style={styles.title}>{mealTypeLabels[mealType]}</Text>
          <Text style={styles.calories}>{totalCalories} kcal</Text>
        </View>
        <Ionicons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={Colors.textMuted}
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.content}>
          {entries.length === 0 ? (
            <TouchableOpacity style={styles.emptyState} onPress={onAdd}>
              <Ionicons name="add-circle-outline" size={32} color={Colors.textFaint} />
              <Text style={styles.emptyText}>No items logged</Text>
              <Text style={styles.emptySubtext}>Tap to add food</Text>
            </TouchableOpacity>
          ) : (
            <>
              {entries.map((entry, index) => (
                <FoodCard
                  key={entry.id || `entry-${index}-${entry.foodName}`}
                  entry={entry}
                  onDelete={onDeleteEntry}
                />
              ))}
              {onAdd && (
                <TouchableOpacity style={styles.addButton} onPress={onAdd}>
                  <Ionicons name="add-circle" size={20} color={Colors.green} />
                  <Text style={styles.addText}>Add more</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  calories: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.green,
    fontFamily: 'monospace',
    marginRight: 8,
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 8,
  },
  emptySubtext: {
    fontSize: 12,
    color: Colors.textFaint,
    marginTop: 2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  addText: {
    fontSize: 14,
    color: Colors.green,
    fontWeight: '600',
    marginLeft: 6,
  },
});
