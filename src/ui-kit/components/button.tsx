import React from 'react';
import { Button as PaperButton } from 'react-native-paper';

interface ButtonProps {
  /** Texte affiché sur le bouton. */
  label: string;
  /** Callback déclenché au clic. */
  onPress: () => void;
  /** Désactive le bouton si true. */
  disabled?: boolean;
  /** Affiche un indicateur de chargement si true. */
  loading?: boolean;
}

/**
 * Wrapper agnostique autour d'un bouton d'action.
 */
export const Button = ({
  label,
  onPress,
  disabled = false,
  loading = false,
}: ButtonProps) => {
  return (
    <PaperButton
      mode="contained"
      onPress={onPress}
      disabled={disabled}
      loading={loading}
    >
      {label}
    </PaperButton>
  );
};
