export interface GenericStore<T> {
  getState: () => T;
  subscribe: (listener: () => void) => () => void;
}