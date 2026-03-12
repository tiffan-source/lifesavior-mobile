import { failure, Result, success } from '../../../../shared/result/result';
import { Todo } from '../entities/todo.entity';
import { StorageFailureError } from '../errors/storage-failure.error';
import { ITodoRepository } from '../ports/todo.repository.port';

/**
 * Use Case : Récupère tous les Todos persistés.
 * Retourne un `Result<Todo[]>` et ne propage jamais d'exception.
 */
export class GetAllTodosUseCase {
  constructor(private readonly repository: ITodoRepository) {}

  async execute(): Promise<Result<Todo[]>> {
    try {
      const todos = await this.repository.findAll();
      return success(todos);
    } catch (e) {
      if (e instanceof StorageFailureError) {
        return failure(e.code, e.message);
      }
      return failure('UNKNOWN_ERROR', 'Une erreur inattendue est survenue.');
    }
  }
}
