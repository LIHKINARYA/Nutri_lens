import { create } from 'zustand';
import { FoodEntry, DailyTotals, NutritionResult } from '@/types/nutrition';
import { useAuthStore } from './authStore';
import {
  getDailyEntry,
  addFoodEntryToDay,
  getStreakFromFirestore,
} from '@/lib/firestore';

interface DiaryStore {
  todayEntries: FoodEntry[];
  todayTotals: DailyTotals;
  streak: number;
  isAnalyzing: boolean;
  currentScan: NutritionResult | null;
  scannedImageUri: string | null;
  isLoading: boolean;

  // Actions
  loadToday: () => Promise<void>;
  logEntry: (entry: FoodEntry) => Promise<void>;
  setCurrentScan: (result: NutritionResult, imageUri: string) => void;
  clearScan: () => void;
  setAnalyzing: (analyzing: boolean) => void;
  initialize: () => Promise<void>;
  reset: () => void;
}

export const useDiaryStore = create<DiaryStore>((set, get) => ({
  todayEntries: [],
  todayTotals: {
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
  },
  streak: 0,
  isAnalyzing: false,
  currentScan: null,
  scannedImageUri: null,
  isLoading: false,

  initialize: async () => {
    try {
      await get().loadToday();
    } catch (error) {
      console.error('Failed to initialize diary store:', error);
    }
  },

  loadToday: async () => {
    try {
      set({ isLoading: true });

      // Get current user ID
      const userId = useAuthStore.getState().user?.uid;
      if (!userId) {
        set({ isLoading: false });
        return;
      }

      const today = new Date().toISOString().split('T')[0];
      const dailyEntry = await getDailyEntry(userId, today);

      if (dailyEntry) {
        set({
          todayEntries: dailyEntry.meals,
          todayTotals: {
            calories: dailyEntry.totalCalories,
            carbs: dailyEntry.totalCarbs,
            protein: dailyEntry.totalProtein,
            fat: dailyEntry.totalFat,
            fiber: dailyEntry.totalFiber,
            sugar: dailyEntry.totalSugar,
            sodium: dailyEntry.totalSodium,
          },
          isLoading: false,
        });
      } else {
        set({
          todayEntries: [],
          todayTotals: {
            calories: 0,
            carbs: 0,
            protein: 0,
            fat: 0,
            fiber: 0,
            sugar: 0,
            sodium: 0,
          },
          isLoading: false,
        });
      }

      // Get streak
      const streak = await getStreakFromFirestore(userId);
      set({ streak });
    } catch (error) {
      console.error('Failed to load today data:', error);
      set({ isLoading: false });
    }
  },

  logEntry: async (entry: FoodEntry) => {
    try {
      const userId = useAuthStore.getState().user?.uid;
      if (!userId) throw new Error('User not authenticated');

      const today = new Date().toISOString().split('T')[0];
      await addFoodEntryToDay(userId, today, entry);
      await get().loadToday();
    } catch (error) {
      console.error('Failed to log entry:', error);
      throw error;
    }
  },

  setCurrentScan: (result: NutritionResult, imageUri: string) => {
    set({ currentScan: result, scannedImageUri: imageUri });
  },

  clearScan: () => {
    set({ currentScan: null, scannedImageUri: null, isAnalyzing: false });
  },

  setAnalyzing: (analyzing: boolean) => {
    set({ isAnalyzing: analyzing });
  },

  reset: () => {
    set({
      todayEntries: [],
      todayTotals: {
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,
        sodium: 0,
      },
      streak: 0,
      isAnalyzing: false,
      currentScan: null,
      scannedImageUri: null,
      isLoading: false,
    });
  },
}));
