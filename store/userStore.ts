import { create } from 'zustand';
import { UserGoals } from '@/types/nutrition';
import { getUserGoalsFromFirestore, saveUserGoalsToFirestore } from '@/lib/firestore';
import { createDefaultGoals } from '@/lib/goals';
import { useAuthStore } from './authStore';

interface UserStore {
  goals: UserGoals | null;
  isLoading: boolean;

  // Actions
  loadGoals: () => Promise<void>;
  updateGoals: (goals: UserGoals) => Promise<void>;
  hasCompletedOnboarding: () => boolean;
  reset: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  goals: null,
  isLoading: false,

  loadGoals: async () => {
    try {
      set({ isLoading: true });

      const userId = useAuthStore.getState().user?.uid;
      if (!userId) {
        set({ isLoading: false });
        return;
      }

      const goals = await getUserGoalsFromFirestore(userId);
      set({ goals, isLoading: false });
    } catch (error) {
      console.error('Failed to load goals:', error);
      set({ isLoading: false });
    }
  },

  updateGoals: async (goals: UserGoals) => {
    try {
      const userId = useAuthStore.getState().user?.uid;
      if (!userId) throw new Error('User not authenticated');

      await saveUserGoalsToFirestore(userId, goals);
      set({ goals });
    } catch (error) {
      console.error('Failed to save goals:', error);
      throw error;
    }
  },

  hasCompletedOnboarding: () => {
    return get().goals !== null;
  },

  reset: () => {
    set({ goals: null, isLoading: false });
  },
}));
