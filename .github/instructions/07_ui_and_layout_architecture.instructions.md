---
applyTo: "**"
excludeAgent: ["code-review"]
---

# Instructions Copilot - Agnostic UI & Design System Strategy (Expo)

Tu es un architecte logiciel senior et un expert React Native. Ce document définit la stratégie de découplage absolu entre nos vues métier (Screens) et les librairies de composants UI (Design System). Ton rôle est de garantir que l'application reste totalement agnostique des bibliothèques de style tierces.

## 1. Philosophie : "UI Kit" & Wrappers
Nos écrans métier ne doivent JAMAIS dépendre directement d'une librairie de composants externe (ex: Tamagui, Gluestack, React Native Paper).
Nous utilisons le pattern "Wrapper" pour créer notre propre Design System interne.

## 2. Structure de l'UI Kit (`src/ui-kit/`)
Ce dossier est global et totalement indépendant de `src/domains/`. Il contient des composants "Dumb" (stupides, sans logique métier).

- `src/ui-kit/components/` : Les éléments atomiques (`Button`, `Input`, `Text`, `Card`).
- `src/ui-kit/layouts/` : Les structures de pages (`ScreenLayout`, `FormLayout`, `ModalLayout`).
- `src/ui-kit/containers/` : Les conteneurs de composants (`CardGrid`, `ListContainer`). Ces conteneurs définissent uniquement le layout ou la disposition de leurs enfants, sans logique métier ni contenu propre.

### Règle de création d'un composant UI :
1. **L'Interface (Props) :** Le composant doit exposer sa propre interface de Props, indépendante de la librairie sous-jacente.
2. **L'Implémentation :** C'est à l'intérieur de ce composant que tu importes la librairie tierce et que tu mappes tes Props vers celles de la librairie.

```tsx
// ❌ INTERDIT DANS UN ÉCRAN MÉTIER :
import { Button } from 'librairie-tierce';

// ✅ OBLIGATOIRE : Créer notre wrapper dans src/ui-kit/components/Button.tsx
import { Button as ExternalButton } from 'librairie-tierce';

interface MyButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ label, onPress, variant = 'primary' }: MyButtonProps) => {
  // Mapping interne vers la lib tierce
  return <ExternalButton title={label} onClick={onPress} color={variant === 'primary' ? 'blue' : 'gray'} />;
};
```

### Règle de création d'un container component :
1. **Responsabilité unique :** Un container ne doit gérer que la disposition de ses enfants (layout). Il ne connaît pas leur contenu ni leur logique.
2. **Props :** Les enfants sont passés via `children`. Aucun autre contenu ou logique ne doit être inclus.
3. **Exemple :**

```tsx
// src/ui-kit/containers/CardGrid.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CardGridProps {
  children: React.ReactNode;
}

export const CardGrid = ({ children }: CardGridProps) => {
  return <View style={styles.grid}>{children}</View>;
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
```

## 3. Système de Layouts (Templates)

Tout écran métier doit être enveloppé dans un composant de Layout provenant de `src/ui-kit/layouts/`. Cela garantit que les comportements globaux (KeyboardAvoidingView, SafeAreaView, ScrollView, Headers) sont gérés de manière centralisée.

## 4. Isolation & Storybook

Chaque composant créé dans `src/ui-kit/` doit être pensé pour pouvoir être rendu dans **Storybook** sans aucun contexte applicatif (pas de Provider Redux/Zustand, pas de React Navigation, pas d'appels API).

- Les données lui sont passées à 100% via des Props.
- Les actions (clics) remontent à 100% via des callbacks (`onPress`, `onChange`).

## 5. Flux de Génération (Écrans Métier)

Si je te demande "Crée l'écran de création d'un Todo" (`src/domains/todo/presentation/screens/`) :

1. Tu utilises exclusivement les composants de notre `src/ui-kit/` pour construire l'interface.
2. Tu enveloppes le tout dans un `<ScreenLayout>`.
3. Tu branches l'UI sur un Custom Hook (le "Controller") qui gère l'état et appelle le Use Case, de manière à ce que l'écran React Native ne contienne aucune logique métier complexe.