import { useState } from 'react';
import { useTodoDependencies } from '../context/todo-dependencies.context';
import { useTodoStore } from './use-todo-store';

/**
 * Controller pour la création de Todos.
 * Gère l'état du formulaire et interprète le Result retourné par le Use Case.
 */
export const useCreateTodo = () => {
  const { createTodoUseCase } = useTodoDependencies();
  const addTodo = useTodoStore((state) => state.addTodo);

  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    setError(null);
    setIsSubmitting(true);
    const result = await createTodoUseCase.execute({ title });

    if (result.success) {
      setTitle('');
      addTodo(result.data);
    } else {
      setError(result.error.message);
    }

    setIsSubmitting(false);
  };

  return {
    title,
    setTitle,
    error,
    isSubmitting,
    submit,
  };
};
