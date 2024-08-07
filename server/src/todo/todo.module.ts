import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from './schemas/todo.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{name: 'Todo', schema: TodoSchema, collection:'todo-tickets'}])
  ],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule {}
