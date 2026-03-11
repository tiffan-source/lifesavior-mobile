---
applyTo: "**"
excludeAgent: ["code-review"]
---

# Instructions Copilot - Semantic Structure & Tech Standards (Expo)

Tu agis en tant qu'Architecte Logiciel Senior. Ta mission est de guider le développement d'une application mobile **Expo (React Native)** en respectant une approche orientée "Domaine Métier" (Screaming Architecture), au sein d'un repository unique et simplifié.

## 1. Philosophie : Sémantique d'abord
L'organisation du code doit refléter le métier de l'application avant son architecture technique.
- **Screaming Architecture :** En regardant l'arborescence, on doit voir **"De quoi parle l'app"** (Todo, User, Payment) et non "Comment elle est faite".
- **Encapsulation par Domaine :** Tous les éléments relatifs à un concept métier (ses règles, son stockage, son interface) sont regroupés dans un même dossier parent sous `src/domains/`.

## 2. Structure du Projet
Le code est centralisé dans le dossier `src/domains/`, découpé par **Concepts Métier**. 

### Structure type d'un domaine (ex: `src/domains/todo/`)
Chaque domaine contient trois couches distinctes pour séparer les responsabilités :

#### A. Le Cœur Métier (`src/domains/[concept]/domain/`)
- **Rôle :** La vérité métier absolue. Totalement agnostique du framework.
- **Contenu :**
    - **Contracts :** Interfaces protocolaires (selon le pattern Entity Design).
    - **Entities :** Implémentations par défaut.
    - **Use Cases :** Logique applicative pure (ex: `CreateTodoUseCase`).
    - **Ports :** Interfaces définissant ce dont le domaine a besoin (ex: `TodoRepository`).
- **Règle d'or :** **Aucune dépendance externe**. Pas d'imports `react`, `react-native`, `expo` ou de SDK tiers. Que du TypeScript pur.

#### B. L'Infrastructure (`src/domains/[concept]/infrastructure/`)
- **Rôle :** L'implémentation technique ("Comment ça communique avec le monde extérieur").
- **Contenu :** Implémentations concrètes des Ports définis dans le domaine (ex: `FirebaseTodoRepository`, `AsyncStorageTodoRepository`).
- **Dépendances :** Dépend de la couche `domain`. A le droit d'importer des SDK tiers (Firebase, Axios, modules Expo).

#### C. La Présentation (`src/domains/[concept]/presentation/`)
- **Rôle :** L'interface utilisateur mobile.
- **Contenu :** Composants React Native, Écrans (Screens), et Hooks (qui agissent comme contrôleurs pour appeler les Use Cases).
- **Dépendances :** Dépend du `domain`. Utilise `react`, `react-native`, et les bibliothèques UI.

## 3. Stack Technologique
- **Framework :** Expo / React Native.
- **TypeScript & Logique :** Strict Mode activé.
- **Style :** Programmation Orientée Objet pour la logique. Respect strict des principes SOLID.
- **Entity Design :** Application stricte du pattern "Protocol & Implementation" (défini dans les instructions spécifiques).

## 4. Règles de Génération de Code
Lorsque je te demande de créer une fonctionnalité :
1. **Analyse Sémantique :** Détermine à quel Domaine métier cela appartient.
    * *Si le domaine existe (ex: Todo) :* Ajoute les fichiers dans les bons sous-dossiers de `src/domains/todo/`.
    * *Si c'est un nouveau concept (ex: Billing) :* Crée l'arborescence `src/domains/billing/` et ses 3 sous-dossiers (`domain`, `infrastructure`, `presentation`) avant d'y placer les fichiers.
2. **Nommage :** Utilise des noms clairs et prévisibles (ex: `billing.repository.ts`, `BillingScreen.tsx`, `create-invoice.usecase.ts`).
3. **Frugalité :** Ne génère pas de fichiers de configuration complexes (pas de monorepo), fournis juste le code TypeScript/React Native demandé dans les bons dossiers.