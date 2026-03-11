import { Todo } from '../../entities/todo.entity';
import { ITodoRepository } from '../../ports/todo.repository.port';

/**
 * Implémentation en mémoire du ITodoRepository.
 * Utilisée uniquement pour les tests unitaires (Real Fake).
 */
export class InMemoryTodoRepository implements ITodoRepository {
  private todos: Todo[] = [];

  async save(todo: Todo): Promise<void> {
    this.todos.push(todo);
  }

  async findById(id: string): Promise<Todo | null> {
    return this.todos.find((t) => t.id === id) ?? null;
  }
}
