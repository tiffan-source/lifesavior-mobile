import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SectionHeaderProps {
  /** Titre principal affiché en gros. */
  title: string;
  /** Sous-titre affiché juste en dessous, plus discret. */
  subtitle: string;
}

/**
 * Groupe titre / sous-titre pour introduire une section d'écran.
 */
export const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#11181C',
  },
  subtitle: {
    fontSize: 16,
    color: '#687076',
  },
});
