import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// Firebase configuration - read from multiple sources with fallbacks
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_API_KEY ||
          process.env.EXPO_PUBLIC_FIREBASE_API_KEY ||
          'AIzaSyC1sjmAXZr53gs4Y6JDYz4389poFG54QG8',
  authDomain: Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ||
              process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ||
              'nurti-cal.firebaseapp.com',
  projectId: Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_PROJECT_ID ||
             process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ||
             'nurti-cal',
  storageBucket: Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ||
                 process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ||
                 'nurti-cal.firebasestorage.app',
  messagingSenderId: Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
                     process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
                     '424306301064',
  appId: Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_APP_ID ||
         process.env.EXPO_PUBLIC_FIREBASE_APP_ID ||
         '1:424306301064:web:cf3cdb83bc005548ad673d',
  measurementId: Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID ||
                 process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID ||
                 'G-1P36L2F57S',
};

// Log configuration for debugging (without exposing full keys)
console.log('Firebase Config Check:', {
  hasApiKey: !!firebaseConfig.apiKey,
  hasProjectId: !!firebaseConfig.projectId,
  projectId: firebaseConfig.projectId,
  hasAuthDomain: !!firebaseConfig.authDomain,
  hasStorageBucket: !!firebaseConfig.storageBucket,
});

// Validate config
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  const errorMsg = 'Firebase configuration is incomplete. Missing: ' +
    (!firebaseConfig.apiKey ? 'API Key ' : '') +
    (!firebaseConfig.projectId ? 'Project ID' : '');
  console.error(errorMsg);
  throw new Error(errorMsg);
}

// Initialize Firebase
let app;
try {
  if (getApps().length === 0) {
    console.log('Initializing Firebase app...');
    app = initializeApp(firebaseConfig);
    console.log('Firebase app initialized successfully');
  } else {
    console.log('Firebase app already initialized');
    app = getApp();
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw new Error(`Failed to initialize Firebase: ${error instanceof Error ? error.message : 'Unknown error'}`);
}

// Initialize Auth with AsyncStorage persistence
let auth;
try {
  console.log('Initializing Firebase Auth...');
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  console.log('Firebase Auth initialized successfully');
} catch (error) {
  console.log('Auth already initialized, getting existing instance');
  auth = getAuth(app);
}

// Initialize Firestore
let db;
try {
  console.log('Initializing Firestore...');
  db = getFirestore(app);
  console.log('Firestore initialized successfully');
} catch (error) {
  console.error('Firestore initialization error:', error);
  throw new Error(`Failed to initialize Firestore: ${error instanceof Error ? error.message : 'Unknown error'}`);
}

export { auth, db };
export default app;
