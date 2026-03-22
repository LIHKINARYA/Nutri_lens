import { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ActivityIndicator } from 'react-native';
import '../global.css';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [appReady, setAppReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeApp = async () => {
      try {
        // Dynamically import stores to catch errors
        const { useAuthStore } = await import('@/store/authStore');
        const { useDiaryStore } = await import('@/store/diaryStore');
        const { useUserStore } = await import('@/store/userStore');

        if (!mounted) return;

        // Initialize auth
        const unsubscribe = useAuthStore.getState().initialize();

        if (!mounted) return;

        setAppReady(true);
        setIsLoading(false);

        return () => {
          if (unsubscribe) unsubscribe();
        };
      } catch (err) {
        console.error('Initialization error:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Unknown initialization error');
          setAppReady(true);
          setIsLoading(false);
        }
      }
    };

    initializeApp();

    return () => {
      mounted = false;
    };
  }, []);

  // Navigation logic
  useEffect(() => {
    if (!appReady || isLoading) return;

    const inAuthGroup = segments[0] === 'auth';
    const inTabsGroup = segments[0] === '(tabs)';

    if (error) {
      // If there's an error, just show index page
      if (segments[0] !== 'index') {
        router.replace('/');
      }
      return;
    }

    try {
      const { useAuthStore } = require('@/store/authStore');
      const authState = useAuthStore.getState();

      if (!authState.isAuthenticated) {
        const { useDiaryStore } = require('@/store/diaryStore');
        const { useUserStore } = require('@/store/userStore');
        useDiaryStore.getState().reset();
        useUserStore.getState().reset();

        if (inTabsGroup || segments[0] === 'scan') {
          router.replace('/auth/login');
        }
      } else if (authState.isAuthenticated) {
        if (inAuthGroup || segments[0] === 'index' || segments[0] === undefined) {
          router.replace('/(tabs)');
        }
      }
    } catch (navError) {
      console.error('Navigation error:', navError);
    }
  }, [appReady, isLoading, segments, error]);

  // Initialize data when authenticated
  useEffect(() => {
    if (!appReady || error) return;

    try {
      const { useAuthStore } = require('@/store/authStore');
      const { useDiaryStore } = require('@/store/diaryStore');
      const { useUserStore } = require('@/store/userStore');

      const authState = useAuthStore.getState();
      if (authState.isAuthenticated) {
        useDiaryStore.getState().initialize();
        useUserStore.getState().loadGoals();
      }
    } catch (dataError) {
      console.error('Data initialization error:', dataError);
    }
  }, [appReady, error]);

  // Show loading screen
  if (!appReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A0E14' }}>
        <ActivityIndicator size="large" color="#1D9E75" />
        <Text style={{ color: '#fff', marginTop: 16, fontSize: 16 }}>Loading NutriLens...</Text>
      </View>
    );
  }

  // Show error screen
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A0E14', padding: 24 }}>
        <Text style={{ color: '#ff4444', fontSize: 18, fontWeight: '600', marginBottom: 12 }}>⚠️ Initialization Error</Text>
        <Text style={{ color: '#aaa', fontSize: 14, textAlign: 'center', marginBottom: 20 }}>{error}</Text>
        <Text style={{ color: '#666', fontSize: 12, textAlign: 'center', lineHeight: 18 }}>
          This is a demo build. The app works in development mode but may have issues in production builds without proper configuration.
        </Text>
      </View>
    );
  }

  // Render app
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
