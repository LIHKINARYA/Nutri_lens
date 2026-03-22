import { NutritionResult } from '@/types/nutrition';

export function calculateMacroCalories(carbs: number, protein: number, fat: number): number {
  return carbs * 4 + protein * 4 + fat * 9;
}

export function scaleNutrition(
  nutrition: NutritionResult,
  multiplier: number
): NutritionResult {
  return {
    ...nutrition,
    calories: Math.round(nutrition.calories * multiplier),
    carbs: Math.round(nutrition.carbs * multiplier),
    protein: Math.round(nutrition.protein * multiplier),
    fat: Math.round(nutrition.fat * multiplier),
    fiber: Math.round(nutrition.fiber * multiplier),
    sugar: Math.round(nutrition.sugar * multiplier),
    saturatedFat: parseFloat((nutrition.saturatedFat * multiplier).toFixed(1)),
    sodium: Math.round(nutrition.sodium * multiplier),
    potassium: Math.round(nutrition.potassium * multiplier),
    cholesterol: Math.round(nutrition.cholesterol * multiplier),
    calcium: Math.round(nutrition.calcium * multiplier),
    iron: parseFloat((nutrition.iron * multiplier).toFixed(1)),
    vitaminC: Math.round(nutrition.vitaminC * multiplier),
  };
}

export function getMacroPercentage(
  consumed: number,
  goal: number
): number {
  if (goal === 0) return 0;
  return Math.min((consumed / goal) * 100, 100);
}

export function getCaloriePercentage(
  consumed: number,
  goal: number
): number {
  if (goal === 0) return 0;
  return (consumed / goal) * 100;
}

export function getRemainingCalories(
  consumed: number,
  goal: number,
  burned: number = 0
): number {
  return Math.max(0, goal + burned - consumed);
}

export const macroColors = {
  carbs: '#EF9F27',
  protein: '#1D9E75',
  fat: '#E24B4A',
  fiber: '#378ADD',
};

export const macroIcons = {
  carbs: '🌾',
  protein: '💪',
  fat: '🥑',
  fiber: '🌿',
};

export const macroLabels = {
  carbs: 'Carbs',
  protein: 'Protein',
  fat: 'Fat',
  fiber: 'Fiber',
};

// Daily recommended values for micronutrients
export const dailyRecommended = {
  fiber: 30, // g
  sugar: 50, // g
  saturatedFat: 20, // g
  sodium: 2300, // mg
  potassium: 3500, // mg
  cholesterol: 300, // mg
  calcium: 1000, // mg
  iron: 18, // mg
  vitaminC: 90, // mg
};
