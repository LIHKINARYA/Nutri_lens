import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { getDateRangeEntries } from '@/lib/firestore';
import { useUserStore } from '@/store/userStore';
import { useAuthStore } from '@/store/authStore';
import { FoodEntry } from '@/types/nutrition';

const { width } = Dimensions.get('window');

export default function ProgressScreen() {
  const [weekEntries, setWeekEntries] = useState<FoodEntry[]>([]);
  const { goals } = useUserStore();
  const { user } = useAuthStore();

  useEffect(() => {
    loadWeekData();
  }, []);

  const loadWeekData = async () => {
    if (!user?.uid) return;

    // Get last 7 days
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 6);

    const startDate = weekAgo.toISOString().split('T')[0];
    const endDate = today.toISOString().split('T')[0];

    const dailyEntries = await getDateRangeEntries(user.uid, startDate, endDate);

    // Flatten all meals from daily entries into a single array
    const allEntries: FoodEntry[] = [];
    dailyEntries.forEach((dailyEntry) => {
      allEntries.push(...dailyEntry.meals);
    });

    setWeekEntries(allEntries);
  };

  // Group entries by date
  const dailyTotals = weekEntries.reduce((acc, entry) => {
    const date = entry.date;
    if (!acc[date]) {
      acc[date] = { calories: 0, carbs: 0, protein: 0, fat: 0 };
    }
    acc[date].calories += entry.calories;
    acc[date].carbs += entry.carbs;
    acc[date].protein += entry.protein;
    acc[date].fat += entry.fat;
    return acc;
  }, {} as Record<string, { calories: number; carbs: number; protein: number; fat: number }>);

  // Get last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const weekData = last7Days.map((date) => ({
    date,
    dayLabel: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
    ...dailyTotals[date] || { calories: 0, carbs: 0, protein: 0, fat: 0 },
  }));

  const avgCalories = weekData.reduce((sum, day) => sum + day.calories, 0) / 7;
  const totalCalories = weekData.reduce((sum, day) => sum + day.calories, 0);
  const maxCalories = Math.max(...weekData.map(d => d.calories), goals?.dailyCalories || 2000);

  // Get most logged foods
  const foodCounts = weekEntries.reduce((acc, entry) => {
    acc[entry.foodName] = (acc[entry.foodName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topFoods = Object.entries(foodCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Progress</Text>

        {/* Weekly Summary Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>This Week</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{Math.round(avgCalories)}</Text>
              <Text style={styles.summaryLabel}>Avg. Daily</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{totalCalories}</Text>
              <Text style={styles.summaryLabel}>Total kcal</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{weekEntries.length}</Text>
              <Text style={styles.summaryLabel}>Meals Logged</Text>
            </View>
          </View>
        </View>

        {/* Weekly Calorie Chart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Calories</Text>
          <View style={styles.chartContainer}>
            {weekData.map((day, index) => {
              const height = maxCalories > 0 ? (day.calories / maxCalories) * 150 : 0;
              const isToday = day.date === new Date().toISOString().split('T')[0];

              return (
                <View key={day.date} style={styles.barContainer}>
                  <View style={styles.barWrapper}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: Math.max(height, 4),
                          backgroundColor: isToday ? Colors.green : Colors.greenLight,
                        },
                      ]}
                    />
                    {goals && day.calories >= goals.dailyCalories && (
                      <View style={styles.goalIndicator} />
                    )}
                  </View>
                  <Text style={styles.barLabel}>{day.dayLabel}</Text>
                  <Text style={styles.barValue}>{day.calories}</Text>
                </View>
              );
            })}
          </View>
          {goals && (
            <View style={styles.goalLine}>
              <View style={styles.goalLineDash} />
              <Text style={styles.goalLineText}>Goal: {goals.dailyCalories}</Text>
            </View>
          )}
        </View>

        {/* Macro Breakdown */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Average Macros</Text>
          <View style={styles.macroGrid}>
            <View style={styles.macroItem}>
              <View style={[styles.macroCircle, { backgroundColor: Colors.amberLight }]}>
                <Text style={styles.macroEmoji}>🌾</Text>
              </View>
              <Text style={styles.macroValue}>
                {Math.round(weekData.reduce((sum, d) => sum + d.carbs, 0) / 7)}g
              </Text>
              <Text style={styles.macroLabel}>Carbs</Text>
            </View>
            <View style={styles.macroItem}>
              <View style={[styles.macroCircle, { backgroundColor: Colors.greenLight }]}>
                <Text style={styles.macroEmoji}>💪</Text>
              </View>
              <Text style={styles.macroValue}>
                {Math.round(weekData.reduce((sum, d) => sum + d.protein, 0) / 7)}g
              </Text>
              <Text style={styles.macroLabel}>Protein</Text>
            </View>
            <View style={styles.macroItem}>
              <View style={[styles.macroCircle, { backgroundColor: Colors.redLight }]}>
                <Text style={styles.macroEmoji}>🥑</Text>
              </View>
              <Text style={styles.macroValue}>
                {Math.round(weekData.reduce((sum, d) => sum + d.fat, 0) / 7)}g
              </Text>
              <Text style={styles.macroLabel}>Fat</Text>
            </View>
          </View>
        </View>

        {/* Most Scanned Foods */}
        {topFoods.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Most Logged Foods</Text>
            {topFoods.map(([food, count], index) => (
              <View key={food} style={styles.foodItem}>
                <Text style={styles.foodRank}>#{index + 1}</Text>
                <Text style={styles.foodName}>{food}</Text>
                <Text style={styles.foodCount}>{count}x</Text>
              </View>
            ))}
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
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 20,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: '600',
    color: Colors.green,
    fontFamily: 'monospace',
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 4,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 180,
    marginBottom: 12,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  barWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 150,
    position: 'relative',
  },
  bar: {
    width: '70%',
    borderRadius: 8,
    minHeight: 4,
  },
  goalIndicator: {
    position: 'absolute',
    top: 0,
    width: '70%',
    height: 3,
    backgroundColor: Colors.green,
    borderRadius: 2,
  },
  barLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 8,
  },
  barValue: {
    fontSize: 10,
    color: Colors.textFaint,
    fontFamily: 'monospace',
    marginTop: 2,
  },
  goalLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  goalLineDash: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.green,
    opacity: 0.3,
    marginRight: 8,
  },
  goalLineText: {
    fontSize: 12,
    color: Colors.green,
  },
  macroGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  macroEmoji: {
    fontSize: 28,
  },
  macroValue: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    fontFamily: 'monospace',
  },
  macroLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  foodRank: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.green,
    width: 32,
  },
  foodName: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  foodCount: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textMuted,
    fontFamily: 'monospace',
  },
});
