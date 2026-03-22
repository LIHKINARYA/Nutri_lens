import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { analyzeFood } from '@/lib/claude';
import { useDiaryStore } from '@/store/diaryStore';

const steps = [
  { label: 'Food detection', desc: 'Recognizing dishes & ingredients' },
  { label: 'Portion estimation', desc: 'Estimating serving size' },
  { label: 'Nutrition calculation', desc: 'Computing macros & calories' },
];

function StepCard({ step, isActive, isComplete, delay }: any) {
  return (
    <View style={[styles.stepCard, { opacity: (isActive || isComplete) ? 1 : 0.3 }]}>
      <View
        style={[
          styles.stepIcon,
          (isActive || isComplete) && styles.stepIconActive,
        ]}
      >
        {isComplete ? (
          <Ionicons name="checkmark" size={20} color={Colors.green} />
        ) : isActive ? (
          <ActivityIndicator size="small" color={Colors.green} />
        ) : (
          <View style={styles.stepDot} />
        )}
      </View>
      <View style={styles.stepContent}>
        <Text style={styles.stepLabel}>{step.label}</Text>
        <Text style={styles.stepDesc}>{step.desc}</Text>
      </View>
    </View>
  );
}

export default function AnalyzingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const imageUri = params.imageUri as string;

  const [currentStep, setCurrentStep] = useState(0);
  const setCurrentScan = useDiaryStore((state) => state.setCurrentScan);
  const setAnalyzing = useDiaryStore((state) => state.setAnalyzing);

  useEffect(() => {
    // Progress through steps
    const timer1 = setTimeout(() => setCurrentStep(1), 1200);
    const timer2 = setTimeout(() => setCurrentStep(2), 2500);

    // Analyze food
    analyzeImage();

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const analyzeImage = async () => {
    try {
      const result = await analyzeFood(imageUri);
      setCurrentScan(result, imageUri);
      setAnalyzing(false);

      // Navigate to result screen after a short delay
      setTimeout(() => {
        router.replace({
          pathname: '/scan/result',
        });
      }, 800);
    } catch (error) {
      setAnalyzing(false);
      console.error('Analysis error:', error);

      Alert.alert(
        'Analysis Failed',
        'Could not analyze the food. Please try again with better lighting or a clearer photo.',
        [
          {
            text: 'Try Again',
            onPress: () => router.back(),
          },
          {
            text: 'Cancel',
            onPress: () => router.push('/(tabs)'),
            style: 'cancel',
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Food Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <View style={styles.overlay} />
      </View>

      {/* Analysis Status */}
      <View style={styles.content}>
        <View style={styles.statusRow}>
          <View style={styles.pulsingDot} />
          <Text style={styles.statusText}>Analyzing with AI</Text>
        </View>

        <Text style={styles.title}>Identifying your food…</Text>
        <Text style={styles.subtitle}>
          Claude Vision is detecting ingredients and estimating nutrition
        </Text>

        {/* Step Cards */}
        <View style={styles.steps}>
          {steps.map((step, index) => (
            <StepCard
              key={index}
              step={step}
              isActive={currentStep === index}
              isComplete={currentStep > index}
              delay={index * 200}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  imageContainer: {
    height: 220,
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.green + '40',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  pulsingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.green,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.green,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textMuted,
    lineHeight: 24,
    marginBottom: 32,
  },
  steps: {
    gap: 12,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepIconActive: {
    backgroundColor: Colors.greenLight,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  stepContent: {
    flex: 1,
  },
  stepLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: 13,
    color: Colors.textMuted,
  },
});
