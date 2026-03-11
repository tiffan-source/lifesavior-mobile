import { InvalidTodoTitleError } from '../errors/invalid-todo-title.error';

export class Todo {
  private _id: string;
  private _title: string;
  private _isCompleted: boolean = false;

  constructor(id: string, title: string) {
    if (!title || title.trim().length === 0) {
      throw new InvalidTodoTitleError({ title });
    }
    this._id = id;
    this._title = title;
  }

  get id(): string { return this._id; }
  get title(): string { return this._title; }
  get isCompleted(): boolean { return this._isCompleted; }
}
