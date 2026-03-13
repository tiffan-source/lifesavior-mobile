import { useEffect } from "react";
import { useTodoDependencies } from "../context/todo-dependencies.context";
import { useTodoStore } from "./use-todo-store";

export const useGetTodos = () => {
    const { getAllTodosUseCase } = useTodoDependencies();
    const todos = useTodoStore((state) => state.todos);
    const setTodos = useTodoStore((state) => state.initialiseTodos);

    const fetchTodos = async () => {
        const result = await getAllTodosUseCase.execute();

        if (result.success) {
            setTodos(result.data);
        } else {
            // Gérer l'erreur (par exemple, en affichant un message d'erreur)
            console.error(result.error.message);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return {
        todos,
        fetchTodos,
    };

}