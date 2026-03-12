import { Todo } from '../domain/entities/todo.entity';
import { StorageFailureError } from '../domain/errors/storage-failure.error';
import { ITodoRepository } from '../domain/ports/todo.repository.port';

/**
 * Implémentation en mémoire du ITodoRepository.
 * Utilisée uniquement pour les tests unitaires (Real Fake).
 * @throws {StorageFailureError} si une opération de persistance échoue.
 */
export class InMemoryTodoRepository implements ITodoRepository {
  private todos: Todo[] = [];

  async save(todo: Todo): Promise<void> {
    try {
      this.todos.push(todo);
    } catch (err) {
      throw new StorageFailureError('Impossible de sauvegarder le Todo.', { cause: err });
    }
  }

  async findById(id: string): Promise<Todo | null> {
    try {
      return this.todos.find((t) => t.id === id) ?? null;
    } catch (err) {
      throw new StorageFailureError('Impossible de récupérer le Todo.', { cause: err });
    }
  }

  async findAll(): Promise<Todo[]> {
    try {
      // Return a shallow copy to avoid external mutation
      return [...this.todos];
    } catch (err) {
      throw new StorageFailureError('Impossible de récupérer les Todos.', { cause: err });
    }
  }
}
