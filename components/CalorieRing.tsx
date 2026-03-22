import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors } from '@/constants/theme';

interface CalorieRingProps {
  consumed: number;
  goal: number;
  burned?: number;
  size?: number;
}

export default function CalorieRing({
  consumed,
  goal,
  burned = 0,
  size = 200,
}: CalorieRingProps) {
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const consumedPercent = Math.min((consumed / goal) * 100, 100);
  const burnedPercent = Math.min((burned / goal) * 100, 100);

  const consumedOffset = circumference - (consumedPercent / 100) * circumference;
  const burnedOffset = circumference - (burnedPercent / 100) * circumference;

  const remaining = Math.max(0, goal + burned - consumed);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={Colors.border}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Burned calories (inner ring) */}
        {burned > 0 && (
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius - strokeWidth / 2 - 4}
            stroke={Colors.amber}
            strokeWidth={8}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={burnedOffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        )}

        {/* Consumed calories (outer ring) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={Colors.green}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={consumedOffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      <View style={styles.center}>
        <Text style={styles.consumed}>{consumed}</Text>
        <Text style={styles.label}>kcal</Text>
        <Text style={styles.remaining}>{remaining} remaining</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
  },
  consumed: {
    fontSize: 48,
    fontWeight: '600',
    color: Colors.text,
    fontFamily: 'monospace',
  },
  label: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: -4,
  },
  remaining: {
    fontSize: 14,
    color: Colors.green,
    fontWeight: '500',
    marginTop: 4,
  },
});
