import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

interface AIInsightBannerProps {
  insight: string;
}

export default function AIInsightBanner({ insight }: AIInsightBannerProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="sparkles" size={20} color={Colors.green} style={styles.icon} />
      <View style={styles.content}>
        <Text style={styles.title}>AI Insight</Text>
        <Text style={styles.text}>{insight}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.greenLight,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.green + '20',
  },
  icon: {
    marginRight: 12,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.greenDark,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
});
