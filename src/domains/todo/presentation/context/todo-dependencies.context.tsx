import { createContext, useContext } from 'react';
import { CreateTodoUseCase } from '../../domain/usecases/create-todo.usecase';
import { GetAllTodosUseCase } from '../../domain/usecases/get-all-todos.usecase';
import { GenericStore } from '../ports/generic-store';
import { TodoState } from '../ports/todo-state';

/**
 * Contrat des dépendances injectées pour le domaine Todo.
 */
export interface TodoDependencies {
  createTodoUseCase: CreateTodoUseCase;
  getAllTodosUseCase: GetAllTodosUseCase;
  todoStore: GenericStore<TodoState>
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
