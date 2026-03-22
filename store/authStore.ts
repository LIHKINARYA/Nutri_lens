import { create } from 'zustand';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signOutUser,
  resetPassword,
  AuthUser,
} from '@/lib/firebaseAuth';
import {
  createUserProfile,
  getUserProfile,
  UserProfile,
} from '@/lib/firestore';

interface AuthStore {
  user: AuthUser | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;

  // Actions
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  initialize: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  profile: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,

  initialize: () => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const authUser: AuthUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          phoneNumber: firebaseUser.phoneNumber,
        };

        // Fetch user profile
        try {
          const profile = await getUserProfile(firebaseUser.uid);
          set({
            user: authUser,
            profile,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Error fetching user profile:', error);
          set({
            user: authUser,
            profile: null,
            isAuthenticated: true,
            isLoading: false,
          });
        }
      } else {
        set({
          user: null,
          profile: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    });

    return unsubscribe;
  },

  signUp: async (email: string, password: string, name: string) => {
    try {
      set({ isLoading: true, error: null });

      const authUser = await signUpWithEmail(email, password, name);

      // Create user profile in Firestore
      await createUserProfile(authUser.uid, {
        uid: authUser.uid,
        name,
        email,
        createdAt: new Date(),
      });

      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      await signInWithEmail(email, password);
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  signInWithGoogle: async () => {
    try {
      set({ isLoading: true, error: null });
      const authUser = await signInWithGoogle();

      // Create/update profile
      const existingProfile = await getUserProfile(authUser.uid);
      if (!existingProfile) {
        await createUserProfile(authUser.uid, {
          uid: authUser.uid,
          name: authUser.displayName || 'User',
          email: authUser.email || '',
          photoURL: authUser.photoURL || undefined,
          createdAt: new Date(),
        });
      }

      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      await signOutUser();
      set({ user: null, profile: null, isAuthenticated: false, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  resetPassword: async (email: string) => {
    try {
      set({ isLoading: true, error: null });
      await resetPassword(email);
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
