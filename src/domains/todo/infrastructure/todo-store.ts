import { Result } from '@/src/shared/result/result';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../domain/entities/todo.entity';
import { GenericStore } from '../presentation/ports/generic-store';
import { TodoState } from '../presentation/ports/todo-state';

const todoState$ = new BehaviorSubject<TodoState>({
    todos: [],
    initialiseTodos: (result: Todo[]) => {
        const todos = result.map(todo => ({
            id: todo.id,
            title: todo.title,
            isCompleted: todo.isCompleted,
        }));
        todoState$.next({
            ...todoState$.value,
            todos,
        });
    },
    addTodo: (result: Todo) => {
        const todo = result;
        todoState$.next({
            ...todoState$.value,
            todos: [
                ...todoState$.value.todos,
                {
                    id: todo.id,
                    title: todo.title,
                    isCompleted: todo.isCompleted,
                }
            ],
        });
    },
    removeTodo: (id: string) => {
        todoState$.next({
            ...todoState$.value,
            todos: todoState$.value.todos.filter(todo => todo.id !== id),
        });
    },
});

export const todoStoreAdapter: GenericStore<TodoState> = {
  getState: () => todoState$.getValue(),
  
  subscribe: (listener: () => void) => {
    const subscription = todoState$.subscribe(() => {
      listener();
    });

    return () => subscription.unsubscribe();
  },
};