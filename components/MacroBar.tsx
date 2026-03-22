import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

interface MacroBarProps {
  label: string;
  consumed: number;
  goal: number;
  color: string;
  icon?: string;
}

export default function MacroBar({ label, consumed, goal, color, icon }: MacroBarProps) {
  const percent = Math.min((consumed / goal) * 100, 100);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>
          {icon} {label}
        </Text>
        <Text style={styles.value}>
          {Math.round(consumed)}g / {goal}g
        </Text>
      </View>
      <View style={styles.track}>
        <View
          style={[
            styles.bar,
            { backgroundColor: color, width: `${percent}%` },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: Colors.textMuted,
    fontFamily: 'monospace',
  },
  track: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
});
