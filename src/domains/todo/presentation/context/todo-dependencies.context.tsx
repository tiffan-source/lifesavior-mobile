import { createContext, useContext } from 'react';
import { CreateTodoUseCase } from '../../domain/usecases/create-todo.usecase';
import { GetAllTodosUseCase } from '../../domain/usecases/get-all-todos.usecase';

/**
 * Contrat des dépendances injectées pour le domaine Todo.
 */
export interface TodoDependencies {
  createTodoUseCase: CreateTodoUseCase;
  getAllTodosUseCase: GetAllTodosUseCase;
}

export const TodoDependenciesContext = createContext<TodoDependencies | null>(null);

/**
 * Résout les dépendances du domaine Todo depuis le Context React.
 * @throws {Error} si utilisé en dehors du TodoDependenciesProvider.
 */
export const useTodoDependencies = (): TodoDependencies => {
  const context = useContext(TodoDependenciesContext);
  if (!context) {
    throw new Error('useTodoDependencies doit être utilisé dans un <TodoDependenciesProvider>.');
  }
  return context;
};
