import { Todo } from '../entities/todo.entity';
import { IIdGenerator } from '../ports/id-generator.port';
import { ITodoRepository } from '../ports/todo.repository.port';

interface CreateTodoInput {
  title: string;
}

/**
 * Crée un nouveau Todo après validation du titre et le persiste via le repository.
 * @throws {InvalidTodoTitleError} si le titre est invalide.
 */
export class CreateTodoUseCase {
  constructor(
    private readonly repository: ITodoRepository,
    private readonly idGenerator: IIdGenerator,
  ) {}

  async execute(input: CreateTodoInput): Promise<Todo> {
    const id = this.idGenerator.generate();
    const todo = new Todo(id, input.title);
    await this.repository.save(todo);
    return todo;
  }
}
