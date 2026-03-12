import { Todo } from '../../entities/todo.entity';
import { StorageFailureError } from '../../errors/storage-failure.error';
import { ITodoRepository } from '../../ports/todo.repository.port';
import { GetAllTodosUseCase } from '../get-all-todos.usecase';
import { InMemoryTodoRepository } from './mock/in-memory-todo.repository';

describe('GetAllTodosUseCase', () => {
  it('retourne tous les todos existants', async () => {
    const repository = new InMemoryTodoRepository();

    // Préparer des todos
    const t1 = new Todo('id-1', 'Task 1');
    const t2 = new Todo('id-2', 'Task 2');
    await repository.save(t1);
    await repository.save(t2);

    const useCase = new GetAllTodosUseCase(repository);
    const result = await useCase.execute();

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.length).toBe(2);
      expect(result.data.map((t) => t.title)).toEqual(['Task 1', 'Task 2']);
    }
  });

  it('retourne une erreur typée quand la persistence échoue', async () => {
    // Fake repository qui jette une StorageFailureError
    class FailingRepo implements ITodoRepository {
      async save(): Promise<void> { throw new StorageFailureError('fail'); }
      async findById(): Promise<null> { throw new StorageFailureError('fail'); }
      async findAll(): Promise<Todo[]> { throw new StorageFailureError('fail'); }
    }

    const repository = new FailingRepo();
    const useCase = new GetAllTodosUseCase(repository as any);

    const result = await useCase.execute();

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.code).toBe('TODO_STORAGE_FAILURE');
    }
  });
});
