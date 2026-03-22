import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';
import { macroColors, macroIcons } from '@/lib/nutrition';

interface NutrientGridProps {
  carbs: number;
  protein: number;
  fat: number;
  fiber: number;
  carbsGoal: number;
  proteinGoal: number;
  fatGoal: number;
  fiberGoal: number;
}

interface NutrientCardProps {
  icon: string;
  label: string;
  value: number;
  goal: number;
  color: string;
}

function NutrientCard({ icon, label, value, goal, color }: NutrientCardProps) {
  const percentage = Math.min((value / goal) * 100, 100);

  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color }]}>{Math.round(value)}g</Text>
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressBar,
            { width: `${percentage}%`, backgroundColor: color },
          ]}
        />
      </View>
      <Text style={styles.goal}>of {goal}g</Text>
    </View>
  );
}

export default function NutrientGrid({
  carbs,
  protein,
  fat,
  fiber,
  carbsGoal,
  proteinGoal,
  fatGoal,
  fiberGoal,
}: NutrientGridProps) {
  return (
    <View style={styles.grid}>
      <NutrientCard
        icon={macroIcons.carbs}
        label="Carbs"
        value={carbs}
        goal={carbsGoal}
        color={macroColors.carbs}
      />
      <NutrientCard
        icon={macroIcons.protein}
        label="Protein"
        value={protein}
        goal={proteinGoal}
        color={macroColors.protein}
      />
      <NutrientCard
        icon={macroIcons.fat}
        label="Fat"
        value={fat}
        goal={fatGoal}
        color={macroColors.fat}
      />
      <NutrientCard
        icon={macroIcons.fiber}
        label="Fiber"
        value={fiber}
        goal={fiberGoal}
        color={macroColors.fiber}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  icon: {
    fontSize: 24,
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'monospace',
    marginBottom: 8,
  },
  progressTrack: {
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  goal: {
    fontSize: 12,
    color: Colors.textFaint,
  },
});
