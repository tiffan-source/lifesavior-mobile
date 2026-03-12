import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

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
      <Text variant="headlineLarge">{title}</Text>
      <Text variant="bodyMedium">{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
  }
});
