---
applyTo: "**/*.tsx, **/*.ts"
excludeAgent: ["code-review"]
---

# Instructions Copilot - Presentation Layer, Agnostic Store & Presenter Strategy (React/Expo)

Tu es un architecte logiciel senior, expert en React/React Native et en Clean Architecture. Ce document définit la stratégie d'implémentation de la couche de présentation. Ton rôle est de garantir le découplage total entre l'UI, le domaine métier et la librairie de gestion d'état, tout en appliquant le pattern "Store as Presenter" (transformation des Entités en ViewModels).

## 1. Philosophie : Le Store est un Détail ET un Presenter
La couche de présentation React utilise des hooks "Orchestrateurs" (Controllers) pour lier l'UI, les Use Cases (Domaine) et l'état global (Store).
- **Agnosticisme strict :** Les hooks et composants n'importent JAMAIS Zustand, Redux ou RxJS.
- **Le Store comme Presenter :** Le Store est responsable de recevoir les Entités du domaine (ex: `Todo`) et de les transformer en données prêtes pour l'UI (`TodoViewModel`). Le Store ne stocke QUE des ViewModels.
- **Performance :** L'accès à l'état doit obligatoirement utiliser un pattern de "Selector" couplé à `useSyncExternalStore`.

## 2. Contrats de la Couche Présentation (ViewModels & State)
Les données stockées pour l'UI doivent être de purs objets (ViewModels). Le Store expose des actions qui consomment des Entités du Domaine.

```typescript
// Exemple attendu : src/domains/todo/presentation/ports/todo-state.ts
import { Todo } from "../../domain/entities/todo.entity";

export type TodoViewModel = {
    id: string;
    title: string;
    isCompleted: boolean;
};

export type TodoState = {
    todos: TodoViewModel[];
    initialiseTodos: (todos: Todo[]) => void;
    addTodo: (todo: Todo) => void;
    removeTodo: (id: string) => void;
};
```

Le contrat d'abstraction du store reste immuable :

```typescript
// src/shared/ports/store.ts
export interface GenericStore<T> {
  getState: () => T;
  subscribe: (listener: () => void) => () => void;
}
```

## 3. Injection de Dépendances (React Context)

Les Use Cases et le Store abstrait sont injectés dans l'arbre React via un Context spécifique au domaine (ex: Todo).

```typescript
// Exemple attendu : src/domains/todo/presentation/todo-dependencies.context.ts
export interface TodoDependencies {
  createTodoUseCase: CreateTodoUseCase;
  todoStore: GenericStore<TodoState>;
}
export const TodoDependenciesContext = createContext<TodoDependencies | null>(null);

export const useTodoDependencies = (): TodoDependencies => {
  const context = useContext(TodoDependenciesContext);
  if (!context) throw new Error('Doit être dans <TodoDependenciesProvider>.');
  return context;
};
```

## 4. Le Hook d'Accès à l'État (Sélecteur Obligatoire)

**TU DOIS** générer un hook d'accès spécifique au domaine utilisant `useSyncExternalStore` pour lier le Store abstrait à React sans provoquer de re-rendus massifs.

```typescript
export function useTodoStore<T>(selector: (state: TodoState) => T): T {
  const { todoStore } = useTodoDependencies();
  const state = useSyncExternalStore(todoStore.subscribe, todoStore.getState);
  return selector(state);
}
```

## 5. Les Hooks Orchestrateurs (Controllers)

Les orchestrateurs gèrent l'état local de l'UI (loading, form errors), gèrent les flux de données (Success/Failure) via le pattern Result, appellent les Use Cases, et délèguent la mise à jour (et le formatage ViewModel) au Store.

### Règles d'implémentation

1.  **Gestion des erreurs :** Les Use Cases retournent toujours un objet `Result<T>`. L'orchestrateur ne doit PAS utiliser `try/catch` pour la logique métier, mais vérifier `result.success`.
2.  **Récupération via Sélecteur :** Utiliser exclusivement le hook à sélecteur (ex: `useTodoStore((state) => state.addTodo)`).
3.  **Flux de données :** L'orchestrateur passe l'Entité brute retournée par le Use Case (via `result.data`) directement au Store.

```typescript
// Exemple attendu : src/domains/todo/presentation/hooks/useCreateTodo.ts
import { useState } from 'react';
import { useTodoDependencies, useTodoStore } from '../todo-dependencies.context';

export const useCreateTodo = () => {
  const { createTodoUseCase } = useTodoDependencies();
  const addTodo = useTodoStore((state) => state.addTodo);

  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    setError(null);
    setIsSubmitting(true);

    // 1. Appel du Use Case (retourne un Result<Entité>)
    const result = await createTodoUseCase.execute({ title });

    if (result.success) {
      // 2. Délégation au Store/Presenter (qui transformera en TodoViewModel)
      addTodo(result.data);
      setTitle('');
    } else {
      // 3. Gestion des erreurs métiers
      setError(result.error.message);
    }
    
    setIsSubmitting(false);
  };

  return { title, setTitle, error, isSubmitting, submit };
};
```

## 6. Flux de Génération

Si je te demande "Crée le hook pour afficher la liste des Todos" :

1.  **Vérification :** Assure-toi que l'état `todos` (ViewModel) et `initialiseTodos` existent dans `TodoState`.
2.  **Génération du Hook :** Crée `useGetTodos.ts`. Expose l'état local (`isLoading`, `error`), la donnée issue du store (`useTodoStore(state => state.todos)`), et la fonction de fetch.
3.  **Logique de Fetch :** Appelle `getAllTodosUseCase.execute()` et gère le Result retourné. En cas de succès, passe le tableau d'Entités `Todo[]` à `initialiseTodos` pour que le store fasse la conversion en `TodoViewModel[]`.
