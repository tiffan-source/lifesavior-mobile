import { useSyncExternalStore } from "react";
import { useTodoDependencies } from "../context/todo-dependencies.context";
import { TodoState } from "../ports/todo-state";

export function useTodoStore<T>(selector: (state: TodoState) => T): T {
  const { todoStore } = useTodoDependencies();
  
  const state = useSyncExternalStore(
    todoStore.subscribe,
    todoStore.getState
  );

  return selector(state);
}