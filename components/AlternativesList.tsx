import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

interface Alternative {
  name: string;
  calories: number;
  diff: number;
}

interface AlternativesListProps {
  alternatives: Alternative[];
}

function AlternativeCard({ alternative }: { alternative: Alternative }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name} numberOfLines={2}>
        {alternative.name}
      </Text>
      <Text style={styles.calories}>{alternative.calories} kcal</Text>
      <View style={styles.diffRow}>
        <Ionicons name="arrow-down" size={14} color={Colors.green} />
        <Text style={styles.diff}>{Math.abs(alternative.diff)} kcal less</Text>
      </View>
    </View>
  );
}

export default function AlternativesList({ alternatives }: AlternativesListProps) {
  if (!alternatives || alternatives.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Healthier Alternatives</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {alternatives.map((alt, index) => (
          <AlternativeCard key={index} alternative={alt} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  scroll: {
    gap: 12,
  },
  card: {
    width: 160,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
    height: 40,
  },
  calories: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    fontFamily: 'monospace',
    marginBottom: 6,
  },
  diffRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  diff: {
    fontSize: 12,
    color: Colors.green,
    fontWeight: '500',
    marginLeft: 4,
  },
});
