import { ModelTodo } from '../model/Todo';

export interface ITodoRepository {
  insert(todo: ModelTodo): Promise<void>;
  findAll(): Promise<ModelTodo[]>;
  findById(id: number): Promise<ModelTodo>;
  updateContent(id: number, isDone: boolean): Promise<void>;
  deleteById(id: number): Promise<void>;
}
