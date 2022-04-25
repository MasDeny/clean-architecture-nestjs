import { Module } from '@nestjs/common';
import { TypeormConfigModule } from '../config/typeorm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '../entities/todo.entity';
import { TodoRepository } from './todo.repository';

@Module({
  imports: [TypeormConfigModule, TypeOrmModule.forFeature([Todo])],
  providers: [TodoRepository],
  exports: [TodoRepository],
})
export class RepositoriesModule {}
