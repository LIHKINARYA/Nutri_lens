import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, mealTypeLabels } from '@/constants/theme';
import { useDiaryStore } from '@/store/diaryStore';
import { useAuthStore } from '@/store/authStore';
import { deleteFoodEntryFromDay } from '@/lib/firestore';
import MealGroup from '@/components/MealGroup';
import { Ionicons } from '@expo/vector-icons';

const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'] as const;

export default function MealsScreen() {
  const router = useRouter();
  const { todayEntries, loadToday } = useDiaryStore();
  const { user } = useAuthStore();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    loadToday();
  }, []);

  const handleDeleteEntry = async (id: number) => {
    Alert.alert(
      'Delete Food Entry',
      'Are you sure you want to delete this entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              if (!user?.uid) return;
              const today = new Date().toISOString().split('T')[0];
              await deleteFoodEntryFromDay(user.uid, today, id);
              await loadToday();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete entry');
            }
          },
        },
      ]
    );
  };

  const mealGroups = {
    breakfast: todayEntries.filter((e) => e.mealType === 'breakfast'),
    lunch: todayEntries.filter((e) => e.mealType === 'lunch'),
    dinner: todayEntries.filter((e) => e.mealType === 'dinner'),
    snack: todayEntries.filter((e) => e.mealType === 'snack'),
  };

  const getMealCalories = (mealType: keyof typeof mealGroups) => {
    return mealGroups[mealType].reduce((sum, entry) => sum + entry.calories, 0);
  };

  const totalCalories = todayEntries.reduce((sum, entry) => sum + entry.calories, 0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Meals</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push('/scan/camera')}
          >
            <Ionicons name="add-circle" size={32} color={Colors.green} />
          </TouchableOpacity>
        </View>

        {/* Daily Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryDate}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{totalCalories}</Text>
              <Text style={styles.summaryLabel}>Total Calories</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{todayEntries.length}</Text>
              <Text style={styles.summaryLabel}>Items Logged</Text>
            </View>
          </View>
        </View>

        {/* Meal Groups */}
        <View style={styles.mealsSection}>
          {mealTypes.map((mealType) => (
            <MealGroup
              key={mealType}
              mealType={mealType}
              entries={mealGroups[mealType]}
              totalCalories={getMealCalories(mealType)}
              onAdd={() => router.push('/scan/camera')}
              onDeleteEntry={handleDeleteEntry}
            />
          ))}
        </View>

        {todayEntries.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="restaurant-outline" size={64} color={Colors.textFaint} />
            <Text style={styles.emptyTitle}>No meals logged today</Text>
            <Text style={styles.emptySubtitle}>
              Tap the camera button to scan your first meal
            </Text>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: Colors.text,
  },
  addButton: {
    padding: 4,
  },
  summaryCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryDate: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: '600',
    color: Colors.green,
    fontFamily: 'monospace',
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 4,
  },
  mealsSection: {
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textMuted,
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textFaint,
    marginTop: 8,
    textAlign: 'center',
  },
});
