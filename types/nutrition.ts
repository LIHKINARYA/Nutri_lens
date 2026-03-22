export interface NutritionResult {
  foodName: string;
  confidence: number;
  calories: number;
  servingSize: string;
  carbs: number;
  protein: number;
  fat: number;
  fiber: number;
  sugar: number;
  saturatedFat: number;
  sodium: number;
  potassium: number;
  cholesterol: number;
  calcium: number;
  iron: number;
  vitaminC: number;
  insight: string;
  alternatives: Array<{ name: string; calories: number; diff: number }>;
}

export interface FoodEntry {
  id?: number;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foodName: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  fiber: number;
  sugar: number;
  saturatedFat: number;
  sodium: number;
  potassium: number;
  cholesterol: number;
  calcium: number;
  iron: number;
  vitaminC: number;
  servingMultiplier: number;
  loggedAt: string;
  imageUri?: string;
  aiData?: string;
  isAiScanned?: boolean;
}

export interface UserGoals {
  id?: number;
  dailyCalories: number;
  carbsG: number;
  proteinG: number;
  fatG: number;
  weightKg: number;
  heightCm: number;
  age: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goalType: 'lose' | 'maintain' | 'gain';
  name?: string;
}

export interface DailyTotals {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

export interface MealGroup {
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  entries: FoodEntry[];
  totalCalories: number;
}
