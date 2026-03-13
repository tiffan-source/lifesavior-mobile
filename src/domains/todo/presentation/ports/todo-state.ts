import { Todo } from "../../domain/entities/todo.entity";

export type TodoViewModel = {
    id: string;
    title: string;
    isCompleted: boolean;
};

export type TodoState = {
    todos: TodoViewModel[];

    initialiseTodos: (result: Todo[]) => void;
    addTodo: (result: Todo) => void;
    removeTodo: (id: string) => void;
};