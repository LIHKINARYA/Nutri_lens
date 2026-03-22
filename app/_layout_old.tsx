import { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ActivityIndicator } from 'react-native';
import { useDiaryStore } from '@/store/diaryStore';
import { useUserStore } from '@/store/userStore';
import { useAuthStore } from '@/store/authStore';
import '../global.css';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [appReady, setAppReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { initialize: initializeDiary, reset: resetDiary } = useDiaryStore();
  const { loadGoals, reset: resetUserStore } = useUserStore();
  const { isAuthenticated, isLoading, initialize } = useAuthStore();

  useEffect(() => {
    // Initialize auth listener with error handling
    let unsubscribe: (() => void) | undefined;

    const initializeApp = async () => {
      try {
        unsubscribe = initialize();
        setAppReady(true);
      } catch (err) {
        console.error('App initialization error:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize app');
        setAppReady(true); // Still set ready to show error
      }
    };

    initializeApp();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Show loading screen while initializing
  if (!appReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A0E14' }}>
        <ActivityIndicator size="large" color="#1D9E75" />
        <Text style={{ color: '#fff', marginTop: 16, fontSize: 16 }}>Loading NutriLens...</Text>
      </View>
    );
  }

  // Show error if initialization failed
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A0E14', padding: 24 }}>
        <Text style={{ color: '#ff4444', fontSize: 18, fontWeight: '600', marginBottom: 12 }}>Initialization Error</Text>
        <Text style={{ color: '#aaa', fontSize: 14, textAlign: 'center' }}>{error}</Text>
        <Text style={{ color: '#666', fontSize: 12, marginTop: 20, textAlign: 'center' }}>
          Please check your Firebase configuration in app.config.js
        </Text>
      </View>
    );
  }

  useEffect(() => {
    if (isLoading) return; // Wait for auth state to be determined

    const inAuthGroup = segments[0] === 'auth';
    const inTabsGroup = segments[0] === '(tabs)';

    if (!isAuthenticated) {
      // User is not authenticated - clear all data
      resetDiary();
      resetUserStore();
      if (inTabsGroup || segments[0] === 'scan') {
        // Redirect from tabs or scan to login
        router.replace('/auth/login');
      }
    } else if (isAuthenticated) {
      // User is authenticated - redirect to tabs if in auth screens or index
      if (inAuthGroup || segments[0] === 'index' || segments[0] === undefined) {
        router.replace('/(tabs)');
      }
    }
  }, [isAuthenticated, isLoading, segments]);

  useEffect(() => {
    // Initialize database and load data only if authenticated
    if (isAuthenticated) {
      initializeDiary();
      loadGoals();
    }
  }, [isAuthenticated]);

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
        <Stack.Screen name="auth/phone" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="scan/camera"
          options={{
            presentation: 'fullScreenModal',
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="scan/analyzing"
          options={{
            presentation: 'fullScreenModal',
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="scan/result"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
    </>
  );
}
