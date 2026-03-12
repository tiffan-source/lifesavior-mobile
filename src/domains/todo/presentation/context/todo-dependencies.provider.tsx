import React from 'react';
import { CreateTodoUseCase } from '../../domain/usecases/create-todo.usecase';
import { GetAllTodosUseCase } from '../../domain/usecases/get-all-todos.usecase';
import { InMemoryTodoRepository } from '../../infrastructure/in-memory-todo.repository';
import { UuidIdGenerator } from '../../infrastructure/uuid-id.generator';
import { TodoDependenciesContext } from './todo-dependencies.context';

const repository = new InMemoryTodoRepository();
const idGenerator = new UuidIdGenerator();
const createTodoUseCase = new CreateTodoUseCase(repository, idGenerator);
const getAllTodosUseCase = new GetAllTodosUseCase(repository);

interface TodoDependenciesProviderProps {
  children: React.ReactNode;
}

/**
 * Fournit les dépendances concrètes du domaine Todo à l'arbre React.
 * Seul point de câblage entre l'infrastructure et la présentation.
 */
export const TodoDependenciesProvider = ({ children }: TodoDependenciesProviderProps) => {
  return (
    <TodoDependenciesContext.Provider value={{ createTodoUseCase, getAllTodosUseCase }}>
      {children}
    </TodoDependenciesContext.Provider>
  );
};
