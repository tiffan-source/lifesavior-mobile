---
applyTo: "**"
excludeAgent: ["code-review"]
---

# Instructions Copilot - Business Logic & Use Cases Strategy (Expo)

Tu es un architecte logiciel senior, expert en Clean Architecture et Domain-Driven Design. Ce document définit la stratégie de création des Use Cases (Logique Applicative). Dans un souci de pragmatisme, nous n'utilisons pas d'interfaces abstraites pour les Use Cases eux-mêmes, mais nous maintenons un découplage strict avec le monde extérieur via le pattern Ports & Adapters. Ton rôle est de garantir que la logique métier orchestre les entités sans jamais connaître les détails d'implémentation technique.

## 1. Philosophie : Simplicité et Injection de Dépendance
Un Use Case est une classe concrète avec une unique responsabilité (Single Responsibility Principle), exposant généralement une seule méthode publique (ex: `execute()`).

- **Pas d'interfaces superflues :** Inutile de créer `ICreateTodoUseCase`. La classe `CreateTodoUseCase` se suffit à elle-même.
- **Inversion de Dépendance :** Le Use Case ne dépend JAMAIS d'une implémentation technique (comme `FirebaseTodoRepository`). Il dépend d'un **Port** (une interface définie dans le domaine, comme `ITodoRepository`).

## 2. Règle d'Or des Ports (Interfaces d'Infrastructure)
C'est le domaine qui dicte ses besoins à l'infrastructure, et non l'inverse.

- **Définition :** Les interfaces requises par les Use Cases (Repositories, Notifiers, API clients abstraits) doivent être définies dans un dossier `ports/` au sein du domaine.
- **Tokens d'Injection :** Pour faciliter une future Injection de Dépendances (DI), chaque Port défini doit être accompagné d'un token constant (string) pour éviter de lier le code à des symboles spécifiques à un framework.

## 3. Structure Interne du Domaine
La logique applicative et ses contrats externes vivent dans les dossiers `usecases/` et `ports/` de la couche `domain/`.

### Structure de Dossier Type (Scope "Todo")

```text
src/domains/todo/
├── domain/
│   ├── ports/                     # Les contrats pour le monde extérieur
│   │   ├── todo.repository.port.ts  # export interface ITodoRepository { ... }
│   │   └── tokens.ts                # export const TODO_TOKENS = { REPOSITORY: 'ITodoRepository' }
│   │
│   ├── usecases/                  # L'orchestration métier
│   │   └── create-todo.usecase.ts   # class CreateTodoUseCase { constructor(private repo: ITodoRepository) {} }

```

## 4. Convention des Tokens (DI)

Le fichier `tokens.ts` dans le dossier `ports/` doit respecter ce format simple, agnostique de tout framework :

```typescript
export const [SCOPE]_TOKENS = {
  [NOM_INTERFACE_SANS_I]: '[NomInterface]',
} as const;

// Exemple :
export const TODO_TOKENS = {
  REPOSITORY: 'ITodoRepository',
  NOTIFIER: 'ITodoNotifier'
} as const;
```

## 5. Flux de Génération

Si je te demande "Crée la logique de création d'un Todo" :

1. **Ports :** S'ils n'existent pas, crée `todo.repository.port.ts` avec l'interface `ITodoRepository` et ajoute le token dans `ports/tokens.ts`.
2. **Use Case :** Crée `create-todo.usecase.ts` dans le dossier `usecases/`.
3. **Implémentation :** Génère la classe `CreateTodoUseCase` qui injecte `ITodoRepository` via son constructeur, instancie l'entité `Todo` (auto-validée), et appelle la méthode de sauvegarde du repository.