---
applyTo: "**"
excludeAgent: ["code-review"]
---

# Instructions Copilot - Error Handling & Mapping Strategy (Expo)

Tu es un architecte logiciel senior garant de la robustesse et du découplage de l'application. Ce document définit la stratégie stricte de gestion typée des erreurs. L'objectif absolu est de garantir qu'aucune erreur technique (issue de l'infrastructure ou de librairies tierces) ne fuite vers la couche UI ou la logique métier sans avoir été préalablement traduite dans le langage du Domaine.

## 1. Philosophie : "Domain-Defined Errors"
Les erreurs font partie du contrat métier. Le dossier `domain/` d'un concept doit définir toutes les classes d'erreurs qu'il est susceptible de lever.
L'UI (Présentation) doit pouvoir attraper (`catch`) une erreur métier connue sans jamais se soucier de l'implémentation technique sous-jacente.

## 2. Hiérarchie des Erreurs (Taxonomie)

### A. Base Commune (`src/shared/errors/`)
Toutes les erreurs personnalisées de l'application doivent hériter d'une classe de base `CoreError` (ou étendre l'`Error` native proprement) :
- **message :** Description claire (pour les logs et le debug).
- **code :** Chaîne de caractères unique pour le parsing (ex: `TODO_TITLE_EMPTY`).
- **metadata :** Objet optionnel pour le contexte (ex: `{ todoId: '123' }`).

### B. Erreurs d'Entité (dans `src/domains/[concept]/domain/errors/`)
Elles sont liées à la validité intrinsèque de la donnée.
- *Exemples :* `InvalidTodoTitleError`, `PastDueDateError`.
- *Levées par :* Les Entités (dans leurs constructeurs ou setters).

### C. Erreurs de Ports / Orchestration (dans `src/domains/[concept]/domain/errors/`)
Elles sont liées à l'échec d'une dépendance externe (base de données, réseau) ou à une règle de flux métier.
- *Exemples :* `TodoNotFoundError`, `UserNotAuthorizedError`, `StorageFailureError`.
- *Définies par :* Le Domaine.
- *Levées par :* Les Use Cases ou **l'Infrastructure**.

## 3. Mécanisme de "Catch & Map" (Conversion Obligatoire)
L'Infrastructure (ex: un Repository Firebase ou Axios) DOIT catcher ses propres erreurs techniques et les relancer sous forme d'erreurs définies par le Domaine.

**Exemple Interdit (Fuite d'Infra) :**
```typescript
// infrastructure/firebase-todo.repository.ts
async save(todo: Todo): Promise<void> {
  await firebase.firestore().collection('todos').add(todo); // Si ça plante, ça jette une FirebaseError à l'UI !
}

```

**Exemple Obligatoire (Catch & Map) :**

```typescript
// infrastructure/firebase-todo.repository.ts
async save(todo: Todo): Promise<void> {
  try {
    await firebase.firestore().collection('todos').add(todo);
  } catch (err) {
    // Conversion : FirebaseError -> StorageFailureError (définie dans domain/errors/)
    throw new StorageFailureError('Impossible de sauvegarder le Todo.', { cause: err });
  }
}
```

## 4. Consommation par la Présentation (UI / React Native)

Les Custom Hooks ou les ViewModels de la couche `presentation/` sont les seuls autorisés à attraper ces erreurs typées pour les transformer en état React (feedback utilisateur).

```typescript
// presentation/hooks/useCreateTodo.ts
const createTodo = async (title: string) => {
  try {
    await createTodoUseCase.execute(title);
  } catch (e) {
    if (e instanceof InvalidTodoTitleError) {
      setErrorState('Le titre ne peut pas être vide.');
    } else if (e instanceof StorageFailureError) {
      Alert.alert('Erreur réseau', 'Impossible de joindre le serveur. Réessayez plus tard.');
    } else {
      Alert.alert('Erreur inconnue', 'Une erreur inattendue est survenue.');
    }
  }
}
```

## 5. Instructions de Génération

Lorsque tu génères une Entité, un Use Case ou une implémentation d'Infrastructure :

1. **Analyse des risques :** Demande-toi systématiquement : "Qu'est-ce qui peut échouer ici ?".
2. **Création :** Génère les classes d'erreurs correspondantes dans `src/domains/[concept]/domain/errors/`.
3. **Documentation :** Utilise le tag `@throws {NomDeLErreur}` dans la JSDoc de l'interface ou de la méthode pour expliciter le contrat d'erreur.