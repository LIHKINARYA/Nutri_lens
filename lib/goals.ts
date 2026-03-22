import { UserGoals } from '@/types/nutrition';

const activityMultipliers = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

const goalAdjustments = {
  lose: -500,
  maintain: 0,
  gain: 500,
};

export function calculateBMR(weightKg: number, heightCm: number, age: number, isMale: boolean = true): number {
  // Mifflin-St Jeor Equation
  if (isMale) {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
}

export function calculateTDEE(
  weightKg: number,
  heightCm: number,
  age: number,
  activityLevel: UserGoals['activityLevel'],
  isMale: boolean = true
): number {
  const bmr = calculateBMR(weightKg, heightCm, age, isMale);
  const multiplier = activityMultipliers[activityLevel];
  return Math.round(bmr * multiplier);
}

export function calculateDailyCalorieGoal(
  weightKg: number,
  heightCm: number,
  age: number,
  activityLevel: UserGoals['activityLevel'],
  goalType: UserGoals['goalType'],
  isMale: boolean = true
): number {
  const tdee = calculateTDEE(weightKg, heightCm, age, activityLevel, isMale);
  const adjustment = goalAdjustments[goalType];
  return Math.max(1200, tdee + adjustment); // Minimum 1200 calories
}

export function calculateMacroSplit(
  dailyCalories: number,
  goalType: UserGoals['goalType']
): { carbsG: number; proteinG: number; fatG: number } {
  let carbsPercent: number;
  let proteinPercent: number;
  let fatPercent: number;

  switch (goalType) {
    case 'lose':
      // Higher protein for weight loss
      carbsPercent = 0.35;
      proteinPercent = 0.4;
      fatPercent = 0.25;
      break;
    case 'gain':
      // Higher carbs for muscle gain
      carbsPercent = 0.45;
      proteinPercent = 0.3;
      fatPercent = 0.25;
      break;
    case 'maintain':
    default:
      // Balanced macros
      carbsPercent = 0.4;
      proteinPercent = 0.3;
      fatPercent = 0.3;
      break;
  }

  return {
    carbsG: Math.round((dailyCalories * carbsPercent) / 4),
    proteinG: Math.round((dailyCalories * proteinPercent) / 4),
    fatG: Math.round((dailyCalories * fatPercent) / 9),
  };
}

export function createDefaultGoals(
  weightKg: number,
  heightCm: number,
  age: number,
  activityLevel: UserGoals['activityLevel'],
  goalType: UserGoals['goalType'],
  name?: string
): UserGoals {
  const dailyCalories = calculateDailyCalorieGoal(
    weightKg,
    heightCm,
    age,
    activityLevel,
    goalType
  );

  const macros = calculateMacroSplit(dailyCalories, goalType);

  return {
    dailyCalories,
    carbsG: macros.carbsG,
    proteinG: macros.proteinG,
    fatG: macros.fatG,
    weightKg,
    heightCm,
    age,
    activityLevel,
    goalType,
    name,
  };
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export function formatDate(date: Date): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
}
