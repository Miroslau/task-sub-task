import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { Pagination } from '../paginate/pagination';
import { TaskDto } from '../dto/task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}
  async getAllTasks(
    options: PaginationOptionInterface,
  ): Promise<Pagination<TaskEntity>> {
    const [results, total] = await this.taskRepository.findAndCount({
      take: options.limit,
      skip: options.page,
    });

    return new Pagination<TaskEntity>({
      results,
      total,
    });
  }

  async getTaskById(id: number): Promise<TaskEntity> {
    return await this.taskRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async createTask(dto: TaskDto): Promise<TaskEntity> {
    return await this.taskRepository.save({ ...dto });
  }

  async deleteTask(id: number): Promise<number> {
    await this.taskRepository.delete({ id });
    return id;
  }

  async updateTask(id: number, dto: TaskDto): Promise<TaskEntity> {
    await this.taskRepository.update(
      {
        id,
      },
      { ...dto },
    );

    return await this.getTaskById(id);
  }

  async updateStatusTask(id: number, newStatus: string): Promise<TaskEntity> {
    const task = await this.getTaskById(id);

    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }

    task.status = newStatus;

    return await this.taskRepository.save(task);
  }
}
