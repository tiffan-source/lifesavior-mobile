import { CreateTodoUseCase } from '../create-todo.usecase';
import { FixedIdGenerator } from './mock/fixed-id.generator';
import { InMemoryTodoRepository } from './mock/in-memory-todo.repository';

describe('CreateTodoUseCase', () => {
  it('doit créer un Todo et le sauvegarder dans le repository', async () => {
    const repository = new InMemoryTodoRepository();
    const useCase = new CreateTodoUseCase(repository, new FixedIdGenerator('default-id'));

    const todo = await useCase.execute({ title: 'Faire les courses' });

    expect(todo.title).toBe('Faire les courses');
    expect(todo.isCompleted).toBe(false);

    const saved = await repository.findById(todo.id);
    expect(saved).not.toBeNull();
    expect(saved!.id).toBe(todo.id);
  });

  it("doit utiliser le générateur d'id fourni", async () => {
    const repository = new InMemoryTodoRepository();
    const idGenerator = new FixedIdGenerator('abc-123');
    const useCase = new CreateTodoUseCase(repository, idGenerator);

    const todo = await useCase.execute({ title: 'Faire les courses' });

    expect(todo.id).toBe('abc-123');
  });
});
