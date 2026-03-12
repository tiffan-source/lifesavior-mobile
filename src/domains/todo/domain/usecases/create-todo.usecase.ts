import { failure, Result, success } from '../../../../shared/result/result';
import { Todo } from '../entities/todo.entity';
import { InvalidTodoTitleError } from '../errors/invalid-todo-title.error';
import { StorageFailureError } from '../errors/storage-failure.error';
import { IIdGenerator } from '../ports/id-generator.port';
import { ITodoRepository } from '../ports/todo.repository.port';

interface CreateTodoInput {
  title: string;
}

/**
 * Crée un nouveau Todo après validation du titre et le persiste via le repository.
 * Retourne un Result<Todo> : jamais d'exception propagée.
 */
export class CreateTodoUseCase {
  constructor(
    private readonly repository: ITodoRepository,
    private readonly idGenerator: IIdGenerator,
  ) {}

  async execute(input: CreateTodoInput): Promise<Result<Todo>> {
    try {
      const id = this.idGenerator.generate();
      const todo = new Todo(id, input.title);
      await this.repository.save(todo);
      return success(todo);
    } catch (e) {
      if (e instanceof InvalidTodoTitleError) {
        return failure(e.code, e.message);
      }
      if (e instanceof StorageFailureError) {
        return failure(e.code, e.message);
      }
      return failure('UNKNOWN_ERROR', 'Une erreur inattendue est survenue.');
    }
  }
}
