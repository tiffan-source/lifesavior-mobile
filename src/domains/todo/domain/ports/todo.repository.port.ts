import { Todo } from '../entities/todo.entity';

/**
 * Port définissant les opérations de persistance pour les Todos.
 * @throws {StorageFailureError} si une opération de persistance échoue.
 */
export interface ITodoRepository {
  /** Sauvegarde un nouveau Todo. */
  save(todo: Todo): Promise<void>;

  /** Retourne un Todo par son id, ou null s'il n'existe pas. */
  findById(id: string): Promise<Todo | null>;
}
