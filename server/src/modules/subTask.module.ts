import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/task.entity';
import { SubTaskEntity } from '../entities/subTask.entity';
import { SubTasksController } from '../controllers/sub-tasks.controller';
import { SubTaskService } from '../services/sub-task.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubTaskEntity, TaskEntity])],
  controllers: [SubTasksController],
  providers: [SubTaskService],
  exports: [TypeOrmModule],
})
export class SubTaskModule {}
