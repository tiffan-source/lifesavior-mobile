import React from 'react';
import { View } from 'react-native';
import { HelperText, TextInput as PaperTextInput } from 'react-native-paper';

interface TextInputProps {
  /** Libellé affiché au-dessus du champ. */
  label: string;
  /** Valeur actuelle du champ. */
  value: string;
  /** Callback déclenché à chaque changement de texte. */
  onChangeText: (text: string) => void;
  /** Texte indicatif affiché quand le champ est vide. */
  placeholder?: string;
  /** Message d'erreur de validation. */
  errorMessage?: string;
  /** Désactive le champ si true. */
  disabled?: boolean;
}

/**
 * Wrapper agnostique autour d'un champ de saisie texte.
 * Affiche optionnellement un message d'erreur de validation.
 */
export const TextInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  errorMessage,
  disabled = false,
}: TextInputProps) => {
  const hasError = !!errorMessage;

  return (
    <View>
      <PaperTextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        disabled={disabled}
        error={hasError}
        mode="outlined"
      />
      {hasError && (
        <HelperText type="error" visible={hasError}>
          {errorMessage}
        </HelperText>
      )}
    </View>
  );
};
