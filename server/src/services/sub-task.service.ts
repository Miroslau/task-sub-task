import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubTaskEntity } from '../entities/subTask.entity';
import { Repository } from 'typeorm';
import { TaskEntity } from '../entities/task.entity';
import { SubTaskDto, TaskDto } from '../dto/task.dto';
import { Pagination } from '../paginate/pagination';

@Injectable()
export class SubTaskService {
  constructor(
    @InjectRepository(SubTaskEntity)
    private readonly subTaskRepository: Repository<SubTaskEntity>,
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async getAllSubTasks(
    options: PaginationOptionInterface,
  ): Promise<Pagination<SubTaskEntity>> {
    const [results, total] = await this.subTaskRepository.findAndCount({
      take: options.limit,
      skip: options.page,
      relations: {
        task: true,
      },
    });

    return new Pagination<SubTaskEntity>({
      results,
      total,
    });
  }

  async getSubTaskById(id: number): Promise<SubTaskEntity> {
    return await this.subTaskRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        task: true,
      },
    });
  }

  async findAllByTaskId(taskId: number): Promise<SubTaskEntity[]> {
    return this.subTaskRepository.find({ where: { task: { id: taskId } } });
  }

  async createSubTask(dto: SubTaskDto): Promise<SubTaskEntity> {
    const { title, description, taskId } = dto;
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      throw new Error(`Task with ID ${taskId} not found`);
    }

    const subTask = new SubTaskEntity();

    subTask.title = title;
    subTask.description = description;
    subTask.task = task;

    return await this.subTaskRepository.save(subTask);
  }

  async deleteSubTask(id: number): Promise<number> {
    await this.subTaskRepository.delete({ id });
    return id;
  }

  async updateSubTask(id: number, dto: TaskDto): Promise<SubTaskEntity> {
    await this.subTaskRepository.update(
      {
        id,
      },
      { ...dto },
    );

    return await this.getSubTaskById(id);
  }

  async updateStatusSubTask(
    id: number,
    newStatus: string,
  ): Promise<SubTaskEntity> {
    const subTask = await this.getSubTaskById(id);

    if (!subTask) {
      throw new Error(`SubTask with ID ${id} not found`);
    }

    subTask.status = newStatus;

    return await this.subTaskRepository.save(subTask);
  }
}
