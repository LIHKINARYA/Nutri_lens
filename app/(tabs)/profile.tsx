import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useUserStore } from '@/store/userStore';
import { useAuthStore } from '@/store/authStore';
import { createDefaultGoals } from '@/lib/goals';
import { UserGoals } from '@/types/nutrition';

const activityLevels = [
  { key: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
  { key: 'light', label: 'Light', desc: 'Exercise 1-3 days/week' },
  { key: 'moderate', label: 'Moderate', desc: 'Exercise 3-5 days/week' },
  { key: 'active', label: 'Active', desc: 'Exercise 6-7 days/week' },
  { key: 'very_active', label: 'Very Active', desc: 'Hard exercise daily' },
];

const goalTypes = [
  { key: 'lose', label: 'Lose Weight', icon: '📉', desc: 'Create calorie deficit' },
  { key: 'maintain', label: 'Maintain', icon: '⚖️', desc: 'Stay at current weight' },
  { key: 'gain', label: 'Gain Muscle', icon: '💪', desc: 'Create calorie surplus' },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { goals, updateGoals, loadGoals } = useUserStore();
  const { signOut, user } = useAuthStore();

  const [name, setName] = useState(goals?.name || '');
  const [age, setAge] = useState(goals?.age.toString() || '');
  const [weight, setWeight] = useState(goals?.weightKg.toString() || '');
  const [height, setHeight] = useState(goals?.heightCm.toString() || '');
  const [activityLevel, setActivityLevel] = useState<UserGoals['activityLevel']>(
    goals?.activityLevel || 'moderate'
  );
  const [goalType, setGoalType] = useState<UserGoals['goalType']>(
    goals?.goalType || 'maintain'
  );

  useEffect(() => {
    loadGoals();
  }, []);

  useEffect(() => {
    if (goals) {
      setName(goals.name || '');
      setAge(goals.age.toString());
      setWeight(goals.weightKg.toString());
      setHeight(goals.heightCm.toString());
      setActivityLevel(goals.activityLevel);
      setGoalType(goals.goalType);
    }
  }, [goals]);

  const handleSave = async () => {
    if (!name || !age || !weight || !height) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }

    const ageNum = parseInt(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseInt(height);

    if (isNaN(ageNum) || isNaN(weightNum) || isNaN(heightNum)) {
      Alert.alert('Invalid Input', 'Please enter valid numbers');
      return;
    }

    try {
      const newGoals = createDefaultGoals(
        weightNum,
        heightNum,
        ageNum,
        activityLevel,
        goalType,
        name
      );

      await updateGoals(newGoals);
      Alert.alert('Success', 'Profile saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
              // Navigation is handled automatically by root layout
            } catch (error) {
              Alert.alert('Error', 'Failed to logout');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Profile & Goals</Text>
            {user?.email && (
              <Text style={styles.emailText}>{user.email}</Text>
            )}
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color={Colors.red} />
          </TouchableOpacity>
        </View>

        {/* Personal Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Personal Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor={Colors.textFaint}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                placeholder="25"
                keyboardType="number-pad"
                placeholderTextColor={Colors.textFaint}
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Weight (kg)</Text>
              <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                placeholder="70"
                keyboardType="decimal-pad"
                placeholderTextColor={Colors.textFaint}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
              style={styles.input}
              value={height}
              onChangeText={setHeight}
              placeholder="170"
              keyboardType="number-pad"
              placeholderTextColor={Colors.textFaint}
            />
          </View>
        </View>

        {/* Activity Level Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Activity Level</Text>
          {activityLevels.map((level) => (
            <TouchableOpacity
              key={level.key}
              style={[
                styles.option,
                activityLevel === level.key && styles.optionSelected,
              ]}
              onPress={() => setActivityLevel(level.key as UserGoals['activityLevel'])}
            >
              <View style={styles.optionContent}>
                <Text
                  style={[
                    styles.optionLabel,
                    activityLevel === level.key && styles.optionLabelSelected,
                  ]}
                >
                  {level.label}
                </Text>
                <Text style={styles.optionDesc}>{level.desc}</Text>
              </View>
              {activityLevel === level.key && (
                <Ionicons name="checkmark-circle" size={24} color={Colors.green} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Goal Type Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Goal</Text>
          <View style={styles.goalGrid}>
            {goalTypes.map((goal) => (
              <TouchableOpacity
                key={goal.key}
                style={[
                  styles.goalCard,
                  goalType === goal.key && styles.goalCardSelected,
                ]}
                onPress={() => setGoalType(goal.key as UserGoals['goalType'])}
              >
                <Text style={styles.goalIcon}>{goal.icon}</Text>
                <Text
                  style={[
                    styles.goalLabel,
                    goalType === goal.key && styles.goalLabelSelected,
                  ]}
                >
                  {goal.label}
                </Text>
                <Text style={styles.goalDesc}>{goal.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Calculated Goals Display */}
        {goals && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Daily Targets</Text>
            <View style={styles.targetGrid}>
              <View style={styles.targetItem}>
                <Text style={styles.targetValue}>{goals.dailyCalories}</Text>
                <Text style={styles.targetLabel}>Calories</Text>
              </View>
              <View style={styles.targetItem}>
                <Text style={styles.targetValue}>{goals.carbsG}g</Text>
                <Text style={styles.targetLabel}>Carbs</Text>
              </View>
              <View style={styles.targetItem}>
                <Text style={styles.targetValue}>{goals.proteinG}g</Text>
                <Text style={styles.targetLabel}>Protein</Text>
              </View>
              <View style={styles.targetItem}>
                <Text style={styles.targetValue}>{goals.fatG}g</Text>
                <Text style={styles.targetLabel}>Fat</Text>
              </View>
            </View>
          </View>
        )}

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>

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
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: Colors.text,
  },
  emailText: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 4,
  },
  logoutButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.redLight,
    justifyContent: 'center',
    alignItems: 'center',
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
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.bg,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  row: {
    flexDirection: 'row',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.bg,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: {
    backgroundColor: Colors.greenLight,
    borderColor: Colors.green,
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  optionLabelSelected: {
    color: Colors.greenDark,
  },
  optionDesc: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  goalGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  goalCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  goalCardSelected: {
    backgroundColor: Colors.greenLight,
    borderColor: Colors.green,
  },
  goalIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  goalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  goalLabelSelected: {
    color: Colors.greenDark,
  },
  goalDesc: {
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  targetGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  targetItem: {
    alignItems: 'center',
  },
  targetValue: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.green,
    fontFamily: 'monospace',
  },
  targetLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: Colors.green,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    shadowColor: Colors.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.card,
  },
});
