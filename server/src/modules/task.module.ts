import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/task.entity';
import { TasksController } from '../controllers/tasks.controller';
import { TaskService } from '../services/task.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TasksController],
  providers: [TaskService],
  exports: [TypeOrmModule],
})
export class TaskModule {}
