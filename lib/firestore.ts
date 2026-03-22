import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  updateDoc,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { FoodEntry, UserGoals, DailyTotals } from '@/types/nutrition';

// User Profile
export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  createdAt: Date;
}

export async function createUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  try {
    const userRef = doc(db, 'users', uid, 'profile', 'data');
    await setDoc(userRef, {
      ...data,
      uid,
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, 'users', uid, 'profile', 'data');
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        uid: data.uid,
        name: data.name,
        email: data.email,
        photoURL: data.photoURL,
        createdAt: data.createdAt.toDate(),
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
}

// User Goals
export async function saveUserGoalsToFirestore(uid: string, goals: UserGoals): Promise<void> {
  try {
    const goalsRef = doc(db, 'users', uid, 'profile', 'goals');
    await setDoc(goalsRef, {
      ...goals,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error saving user goals:', error);
    throw error;
  }
}

export async function getUserGoalsFromFirestore(uid: string): Promise<UserGoals | null> {
  try {
    const goalsRef = doc(db, 'users', uid, 'profile', 'goals');
    const docSnap = await getDoc(goalsRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        dailyCalories: data.dailyCalories,
        carbsG: data.carbsG,
        proteinG: data.proteinG,
        fatG: data.fatG,
        weightKg: data.weightKg,
        heightCm: data.heightCm,
        age: data.age,
        activityLevel: data.activityLevel,
        goalType: data.goalType,
        name: data.name,
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting user goals:', error);
    throw error;
  }
}

// Daily Entries
export interface DailyEntry {
  date: string; // YYYY-MM-DD
  totalCalories: number;
  totalCarbs: number;
  totalProtein: number;
  totalFat: number;
  totalFiber: number;
  totalSugar: number;
  totalSodium: number;
  meals: FoodEntry[];
  createdAt: Date;
  updatedAt: Date;
}

export async function saveDailyEntry(uid: string, date: string, entry: DailyEntry): Promise<void> {
  try {
    const entryRef = doc(db, 'users', uid, 'daily_entries', date);
    await setDoc(entryRef, {
      ...entry,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error saving daily entry:', error);
    throw error;
  }
}

export async function getDailyEntry(uid: string, date: string): Promise<DailyEntry | null> {
  try {
    const entryRef = doc(db, 'users', uid, 'daily_entries', date);
    const docSnap = await getDoc(entryRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        date: data.date,
        totalCalories: data.totalCalories,
        totalCarbs: data.totalCarbs,
        totalProtein: data.totalProtein,
        totalFat: data.totalFat,
        totalFiber: data.totalFiber,
        totalSugar: data.totalSugar,
        totalSodium: data.totalSodium,
        meals: data.meals,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting daily entry:', error);
    throw error;
  }
}

export async function getDateRangeEntries(
  uid: string,
  startDate: string,
  endDate: string
): Promise<DailyEntry[]> {
  try {
    const entriesRef = collection(db, 'users', uid, 'daily_entries');
    const q = query(
      entriesRef,
      where('date', '>=', startDate),
      where('date', '<=', endDate),
      orderBy('date', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const entries: DailyEntry[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      entries.push({
        date: data.date,
        totalCalories: data.totalCalories,
        totalCarbs: data.totalCarbs,
        totalProtein: data.totalProtein,
        totalFat: data.totalFat,
        totalFiber: data.totalFiber,
        totalSugar: data.totalSugar,
        totalSodium: data.totalSodium,
        meals: data.meals,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      });
    });

    return entries;
  } catch (error) {
    console.error('Error getting date range entries:', error);
    throw error;
  }
}

// Add Food Entry to Daily Entry
export async function addFoodEntryToDay(uid: string, date: string, foodEntry: FoodEntry): Promise<void> {
  try {
    const entryRef = doc(db, 'users', uid, 'daily_entries', date);
    const docSnap = await getDoc(entryRef);

    let dailyEntry: DailyEntry;

    if (docSnap.exists()) {
      // Update existing entry
      const data = docSnap.data();
      dailyEntry = {
        date,
        totalCalories: data.totalCalories + foodEntry.calories,
        totalCarbs: data.totalCarbs + foodEntry.carbs,
        totalProtein: data.totalProtein + foodEntry.protein,
        totalFat: data.totalFat + foodEntry.fat,
        totalFiber: data.totalFiber + foodEntry.fiber,
        totalSugar: data.totalSugar + foodEntry.sugar,
        totalSodium: data.totalSodium + foodEntry.sodium,
        meals: [...data.meals, foodEntry],
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: new Date(),
      };
    } else {
      // Create new entry
      dailyEntry = {
        date,
        totalCalories: foodEntry.calories,
        totalCarbs: foodEntry.carbs,
        totalProtein: foodEntry.protein,
        totalFat: foodEntry.fat,
        totalFiber: foodEntry.fiber,
        totalSugar: foodEntry.sugar,
        totalSodium: foodEntry.sodium,
        meals: [foodEntry],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    await saveDailyEntry(uid, date, dailyEntry);
  } catch (error) {
    console.error('Error adding food entry:', error);
    throw error;
  }
}

// Delete Food Entry from Daily Entry
export async function deleteFoodEntryFromDay(
  uid: string,
  date: string,
  entryId: number
): Promise<void> {
  try {
    const entryRef = doc(db, 'users', uid, 'daily_entries', date);
    const docSnap = await getDoc(entryRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const meals = data.meals.filter((meal: FoodEntry) => meal.id !== entryId);

      // Recalculate totals
      const totals = meals.reduce(
        (acc: any, meal: FoodEntry) => ({
          totalCalories: acc.totalCalories + meal.calories,
          totalCarbs: acc.totalCarbs + meal.carbs,
          totalProtein: acc.totalProtein + meal.protein,
          totalFat: acc.totalFat + meal.fat,
          totalFiber: acc.totalFiber + meal.fiber,
          totalSugar: acc.totalSugar + meal.sugar,
          totalSodium: acc.totalSodium + meal.sodium,
        }),
        {
          totalCalories: 0,
          totalCarbs: 0,
          totalProtein: 0,
          totalFat: 0,
          totalFiber: 0,
          totalSugar: 0,
          totalSodium: 0,
        }
      );

      if (meals.length === 0) {
        // Delete the entire daily entry if no meals left
        await deleteDoc(entryRef);
      } else {
        // Update with recalculated totals
        await updateDoc(entryRef, {
          ...totals,
          meals,
          updatedAt: Timestamp.now(),
        });
      }
    }
  } catch (error) {
    console.error('Error deleting food entry:', error);
    throw error;
  }
}

// Get streak (days with logged entries)
export async function getStreakFromFirestore(uid: string): Promise<number> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let streak = 0;
    let currentDate = new Date(today);

    while (true) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const entry = await getDailyEntry(uid, dateStr);

      if (entry && entry.totalCalories > 0) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  } catch (error) {
    console.error('Error getting streak:', error);
    return 0;
  }
}
