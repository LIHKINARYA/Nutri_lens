import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useDiaryStore } from '@/store/diaryStore';
import { useUserStore } from '@/store/userStore';
import { getGreeting, formatDate } from '@/lib/goals';
import { macroColors } from '@/lib/nutrition';
import CalorieRing from '@/components/CalorieRing';
import MacroBar from '@/components/MacroBar';
import ScanButton from '@/components/ScanButton';
import MealGroup from '@/components/MealGroup';

export default function HomeScreen() {
  const router = useRouter();
  const { todayEntries, todayTotals, streak, loadToday, isLoading } = useDiaryStore();
  const { goals } = useUserStore();

  useEffect(() => {
    loadToday();
  }, []);

  const mealGroups = {
    breakfast: todayEntries.filter((e) => e.mealType === 'breakfast'),
    lunch: todayEntries.filter((e) => e.mealType === 'lunch'),
    dinner: todayEntries.filter((e) => e.mealType === 'dinner'),
    snack: todayEntries.filter((e) => e.mealType === 'snack'),
  };

  const getMealCalories = (mealType: keyof typeof mealGroups) => {
    return mealGroups[mealType].reduce((sum, entry) => sum + entry.calories, 0);
  };

  const defaultGoals = goals || {
    dailyCalories: 2000,
    carbsG: 250,
    proteinG: 150,
    fatG: 67,
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={loadToday} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              {getGreeting()} {goals?.name || 'there'}
            </Text>
            <View style={styles.dateRow}>
              <Text style={styles.date}>{formatDate(new Date())}</Text>
              {streak > 0 && (
                <View style={styles.streakBadge}>
                  <Text style={styles.streakText}>{streak}-day streak 🔥</Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(goals?.name || 'U').charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Calorie Ring Card */}
        <View style={styles.card}>
          <View style={styles.ringContainer}>
            <CalorieRing
              consumed={todayTotals.calories}
              goal={defaultGoals.dailyCalories}
              burned={0}
              size={180}
            />
            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Goal</Text>
                <Text style={styles.statValue}>{defaultGoals.dailyCalories}</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Remaining</Text>
                <Text style={[styles.statValue, { color: Colors.green }]}>
                  {Math.max(0, defaultGoals.dailyCalories - todayTotals.calories)}
                </Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Burned</Text>
                <Text style={styles.statValue}>0</Text>
              </View>
            </View>
          </View>

          {/* Macro Bars */}
          <View style={styles.macros}>
            <MacroBar
              label="Carbs"
              consumed={todayTotals.carbs}
              goal={defaultGoals.carbsG}
              color={macroColors.carbs}
              icon="🌾"
            />
            <MacroBar
              label="Protein"
              consumed={todayTotals.protein}
              goal={defaultGoals.proteinG}
              color={macroColors.protein}
              icon="💪"
            />
            <MacroBar
              label="Fat"
              consumed={todayTotals.fat}
              goal={defaultGoals.fatG}
              color={macroColors.fat}
              icon="🥑"
            />
          </View>
        </View>

        {/* Scan CTA */}
        <View style={styles.scanSection}>
          <ScanButton onPress={() => router.push('/scan/camera')} />
        </View>

        {/* Today's Meals */}
        <View style={styles.mealsSection}>
          <Text style={styles.sectionTitle}>Today's Meals</Text>

          <MealGroup
            mealType="breakfast"
            entries={mealGroups.breakfast}
            totalCalories={getMealCalories('breakfast')}
            onAdd={() => router.push('/scan/camera')}
          />

          <MealGroup
            mealType="lunch"
            entries={mealGroups.lunch}
            totalCalories={getMealCalories('lunch')}
            onAdd={() => router.push('/scan/camera')}
          />

          <MealGroup
            mealType="dinner"
            entries={mealGroups.dinner}
            totalCalories={getMealCalories('dinner')}
            onAdd={() => router.push('/scan/camera')}
          />

          <MealGroup
            mealType="snack"
            entries={mealGroups.snack}
            totalCalories={getMealCalories('snack')}
            onAdd={() => router.push('/scan/camera')}
          />
        </View>

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
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  streakBadge: {
    marginLeft: 12,
    backgroundColor: Colors.amberLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.amber,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.card,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ringContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stats: {
    flex: 1,
    marginLeft: 20,
  },
  stat: {
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    fontFamily: 'monospace',
  },
  macros: {
    marginTop: 8,
  },
  scanSection: {
    marginBottom: 24,
  },
  mealsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
});
