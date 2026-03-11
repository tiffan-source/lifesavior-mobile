import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenLayoutProps {
  /** Contenu de l'écran. */
  children: React.ReactNode;
  /** Style additionnel appliqué au conteneur scrollable. */
  contentStyle?: ViewStyle;
  /** Désactive le scroll si true. */
  scrollEnabled?: boolean;
}

/**
 * Layout global enveloppant tous les écrans métier.
 * Gère le SafeAreaView et le ScrollView de manière centralisée.
 */
export const ScreenLayout = ({
  children,
  contentStyle,
  scrollEnabled = true,
}: ScreenLayoutProps) => {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, contentStyle]}
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 24,
  },
});
