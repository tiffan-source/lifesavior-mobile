import { InvalidTodoTitleError } from '../../errors/invalid-todo-title.error';
import { Todo } from '../todo.entity';

describe('Todo Entity', () => {
  it('doit créer un Todo avec un id et un titre valides', () => {
    const todo = new Todo('1', 'Acheter du lait');

    expect(todo.id).toBe('1');
    expect(todo.title).toBe('Acheter du lait');
    expect(todo.isCompleted).toBe(false);
  });

  it('doit lever une InvalidTodoTitleError si le titre est vide', () => {
    expect(() => new Todo('1', '')).toThrow(InvalidTodoTitleError);
  });

  it('doit lever une InvalidTodoTitleError si le titre ne contient que des espaces', () => {
    expect(() => new Todo('1', '   ')).toThrow(InvalidTodoTitleError);
  });
});
