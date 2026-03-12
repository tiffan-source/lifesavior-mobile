import React from 'react';
import { Text } from 'react-native-paper';
import { SurfaceContainer } from '../containers/surface-container';

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
    <SurfaceContainer>
        <Text>{title}</Text>
        <Text>{description}</Text>
    </SurfaceContainer>
  );
};
