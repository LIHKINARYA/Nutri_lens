module.exports = {
  expo: {
    name: 'NutriLens',
    slug: 'nutrilens',
    version: '1.0.5',
    orientation: 'portrait',
    userInterfaceStyle: 'automatic',
    scheme: 'nutrilens',
    platforms: ['ios', 'android'],
    description: 'AI-powered nutrition tracking app that helps you scan and log your meals instantly.',
    splash: {
      resizeMode: 'contain',
      backgroundColor: '#1D9E75',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.nutrilens.app',
      buildNumber: '1',
      infoPlist: {
        NSCameraUsageDescription:
          'NutriLens needs camera access to scan your food and analyze nutrition.',
        NSPhotoLibraryUsageDescription:
          'NutriLens needs photo library access to select food photos for analysis.',
      },
    },
    android: {
      package: 'com.nutrilens.app',
      versionCode: 6,
      permissions: ['CAMERA', 'READ_EXTERNAL_STORAGE', 'WRITE_EXTERNAL_STORAGE'],
      adaptiveIcon: {
        backgroundColor: '#1D9E75',
      },
    },
    web: {},
    plugins: [
      'expo-router',
      'expo-camera',
      'expo-sqlite',
      'expo-audio',
      [
        'expo-image-picker',
        {
          photosPermission:
            'NutriLens needs access to your photos to analyze food images.',
        },
      ],
    ],
    extra: {
      eas: {
        projectId: 'ae8e5b68-8fce-46af-8f86-697b08c84229',
      },
      EXPO_PUBLIC_ANTHROPIC_API_KEY: process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY,
      EXPO_PUBLIC_FIREBASE_API_KEY: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      EXPO_PUBLIC_FIREBASE_PROJECT_ID: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      EXPO_PUBLIC_FIREBASE_APP_ID: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
      EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
    },
  },
};
