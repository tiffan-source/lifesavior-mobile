import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ShowcaseCardProps {
  /** Titre de la carte. */
  title: string;
  /** Description optionnelle affichée sous le titre. */
  description?: string;
}

/**
 * Carte de mise en avant (showcase) avec titre et description optionnelle.
 */
export const ShowcaseCard = ({ title, description }: ShowcaseCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E8F4FD',
    borderRadius: 12,
    padding: 20,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#11181C',
  },
  description: {
    fontSize: 14,
    color: '#687076',
    lineHeight: 20,
  },
});
