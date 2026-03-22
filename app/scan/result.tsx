import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useDiaryStore } from '@/store/diaryStore';
import { useUserStore } from '@/store/userStore';
import { scaleNutrition, dailyRecommended } from '@/lib/nutrition';
import NutrientGrid from '@/components/NutrientGrid';
import AIInsightBanner from '@/components/AIInsightBanner';
import AlternativesList from '@/components/AlternativesList';

const mealTypes = [
  { key: 'breakfast', label: 'Breakfast', icon: '🌅' },
  { key: 'lunch', label: 'Lunch', icon: '☀️' },
  { key: 'dinner', label: 'Dinner', icon: '🌙' },
  { key: 'snack', label: 'Snack', icon: '🍎' },
];

export default function ResultScreen() {
  const router = useRouter();
  const { currentScan, scannedImageUri, logEntry, clearScan } = useDiaryStore();
  const { goals } = useUserStore();

  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('lunch');
  const [servingMultiplier, setServingMultiplier] = useState(1);
  const [isLogging, setIsLogging] = useState(false);

  useEffect(() => {
    if (!currentScan || !scannedImageUri) {
      router.replace('/(tabs)');
    }
  }, [currentScan, scannedImageUri, router]);

  if (!currentScan || !scannedImageUri) {
    return null;
  }

  const scaledNutrition = scaleNutrition(currentScan, servingMultiplier);

  const handleServingChange = (delta: number) => {
    const newValue = Math.max(0.5, Math.min(5, servingMultiplier + delta));
    setServingMultiplier(newValue);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleLog = async () => {
    try {
      setIsLogging(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      await logEntry({
        date: new Date().toISOString().split('T')[0],
        mealType: selectedMeal,
        foodName: scaledNutrition.foodName,
        calories: scaledNutrition.calories,
        carbs: scaledNutrition.carbs,
        protein: scaledNutrition.protein,
        fat: scaledNutrition.fat,
        fiber: scaledNutrition.fiber,
        sugar: scaledNutrition.sugar,
        saturatedFat: scaledNutrition.saturatedFat,
        sodium: scaledNutrition.sodium,
        potassium: scaledNutrition.potassium,
        cholesterol: scaledNutrition.cholesterol,
        calcium: scaledNutrition.calcium,
        iron: scaledNutrition.iron,
        vitaminC: scaledNutrition.vitaminC,
        servingMultiplier,
        loggedAt: new Date().toISOString(),
        imageUri: scannedImageUri,
        aiData: JSON.stringify(currentScan),
        isAiScanned: true,
      });

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      clearScan();

      Alert.alert(
        'Success!',
        'Food logged to your diary',
        [{ text: 'OK', onPress: () => router.push('/(tabs)') }]
      );
    } catch (error) {
      console.error('Log error:', error);
      Alert.alert('Error', 'Failed to log food entry');
      setIsLogging(false);
    }
  };

  const handleRescan = () => {
    clearScan();
    router.back();
  };

  const defaultGoals = goals || {
    carbsG: 250,
    proteinG: 150,
    fatG: 67,
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Image Header */}
        <View style={styles.imageHeader}>
          <Image source={{ uri: scannedImageUri }} style={styles.image} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.gradient}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.imageInfo}>
            <Text style={styles.foodName}>{currentScan.foodName}</Text>
            <View style={styles.confidenceBadge}>
              <Ionicons name="sparkles" size={14} color="#fff" />
              <Text style={styles.confidenceText}>
                AI identified · {currentScan.confidence}% confidence
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          {/* Meal Selector */}
          <View style={styles.mealSelector}>
            {mealTypes.map((meal) => (
              <TouchableOpacity
                key={meal.key}
                style={[
                  styles.mealChip,
                  selectedMeal === meal.key && styles.mealChipSelected,
                ]}
                onPress={() => setSelectedMeal(meal.key as any)}
              >
                <Text style={styles.mealIcon}>{meal.icon}</Text>
                <Text
                  style={[
                    styles.mealLabel,
                    selectedMeal === meal.key && styles.mealLabelSelected,
                  ]}
                >
                  {meal.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Calorie Hero Card */}
          <View style={styles.calorieCard}>
            <Text style={styles.calorieValue}>{scaledNutrition.calories}</Text>
            <Text style={styles.calorieLabel}>kcal per serving</Text>

            <View style={styles.servingAdjuster}>
              <TouchableOpacity
                style={styles.servingButton}
                onPress={() => handleServingChange(-0.5)}
              >
                <Ionicons name="remove" size={20} color={Colors.text} />
              </TouchableOpacity>

              <View style={styles.servingDisplay}>
                <Text style={styles.servingValue}>{servingMultiplier}</Text>
                <Text style={styles.servingText}>serving{servingMultiplier !== 1 ? 's' : ''}</Text>
              </View>

              <TouchableOpacity
                style={styles.servingButton}
                onPress={() => handleServingChange(0.5)}
              >
                <Ionicons name="add" size={20} color={Colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Macro Grid */}
          <NutrientGrid
            carbs={scaledNutrition.carbs}
            protein={scaledNutrition.protein}
            fat={scaledNutrition.fat}
            fiber={scaledNutrition.fiber}
            carbsGoal={defaultGoals.carbsG}
            proteinGoal={defaultGoals.proteinG}
            fatGoal={defaultGoals.fatG}
            fiberGoal={dailyRecommended.fiber}
          />

          {/* Full Nutrition Table */}
          <View style={styles.nutritionTable}>
            <Text style={styles.tableTitle}>Detailed Nutrition</Text>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Sugar</Text>
              <Text style={styles.tableValue}>{Math.round(scaledNutrition.sugar)}g</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Saturated Fat</Text>
              <Text style={styles.tableValue}>{scaledNutrition.saturatedFat.toFixed(1)}g</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Sodium</Text>
              <Text style={styles.tableValue}>{scaledNutrition.sodium}mg</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Potassium</Text>
              <Text style={styles.tableValue}>{scaledNutrition.potassium}mg</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Cholesterol</Text>
              <Text style={styles.tableValue}>{scaledNutrition.cholesterol}mg</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Calcium</Text>
              <Text style={styles.tableValue}>{scaledNutrition.calcium}mg</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Iron</Text>
              <Text style={styles.tableValue}>{scaledNutrition.iron.toFixed(1)}mg</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Vitamin C</Text>
              <Text style={styles.tableValue}>{scaledNutrition.vitaminC}mg</Text>
            </View>
          </View>

          {/* AI Insight */}
          <AIInsightBanner insight={currentScan.insight} />

          {/* Alternatives */}
          <AlternativesList alternatives={currentScan.alternatives} />

          <View style={{ height: 140 }} />
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.rescanButton} onPress={handleRescan}>
          <Ionicons name="camera-outline" size={24} color={Colors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.logButton, isLogging && styles.logButtonDisabled]}
          onPress={handleLog}
          disabled={isLogging}
          activeOpacity={0.8}
        >
          <Text style={styles.logButtonText}>
            {isLogging ? 'Logging...' : 'Log to Diary'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
  imageHeader: {
    height: 220,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  foodName: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  confidenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.green,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 4,
  },
  content: {
    padding: 16,
  },
  mealSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  mealChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  mealChipSelected: {
    backgroundColor: Colors.greenLight,
    borderColor: Colors.green,
  },
  mealIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  mealLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  mealLabelSelected: {
    color: Colors.greenDark,
  },
  calorieCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  calorieValue: {
    fontSize: 64,
    fontWeight: '600',
    color: Colors.green,
    fontFamily: 'monospace',
  },
  calorieLabel: {
    fontSize: 16,
    color: Colors.textMuted,
    marginBottom: 20,
  },
  servingAdjuster: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  servingButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  servingDisplay: {
    alignItems: 'center',
  },
  servingValue: {
    fontSize: 32,
    fontWeight: '600',
    color: Colors.text,
    fontFamily: 'monospace',
  },
  servingText: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  nutritionTable: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tableLabel: {
    fontSize: 14,
    color: Colors.text,
  },
  tableValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    fontFamily: 'monospace',
  },
  actionBar: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 32,
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 12,
  },
  rescanButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  logButton: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logButtonDisabled: {
    opacity: 0.6,
  },
  logButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});
