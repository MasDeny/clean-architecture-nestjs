import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModelTodo } from 'src/domain/model/Todo';
import { ITodoRepository } from '../../domain/repositories/todoRepository.interface';
import { Todo } from '../entities/todo.entity';

@Injectable()
export class TodoRepository implements ITodoRepository {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  private toModelTodo(todoEntity: Todo): ModelTodo {
    const todo: ModelTodo = new Todo();

    todo.id = todoEntity.id;
    todo.content = todoEntity.content;
    todo.isDone = todoEntity.isDone;
    todo.created_at = todoEntity.created_at;
    todo.updated_at = todoEntity.updated_at;

    return todo;
  }

  private toEntityTodo(todo: ModelTodo): Todo {
    const todoEntity: Todo = new Todo();

    todoEntity.id = todo.id;
    todoEntity.content = todo.content;
    todo.isDone = todo.isDone;

    return todoEntity;
  }

  async insert(todo: ModelTodo): Promise<void> {
    const todoEntity = this.toEntityTodo(todo);
    await this.todoRepository.insert(todoEntity);
  }
  async findAll(): Promise<ModelTodo[]> {
    const todosEntity = await this.todoRepository.find();
    return todosEntity.map((todoEntity) => this.toModelTodo(todoEntity));
  }
  async findById(id: number): Promise<ModelTodo> {
    const todoEntity = await this.todoRepository
      .createQueryBuilder('todo')
      .where('todo.id = :id', { id })
      .getOne();
    return this.toModelTodo(todoEntity);
  }
  async updateContent(id: number, isDone: boolean): Promise<void> {
    await this.todoRepository.update({ id }, { isDone });
  }
  async deleteById(id: number): Promise<void> {
    await this.todoRepository.softDelete(id);
  }
}
