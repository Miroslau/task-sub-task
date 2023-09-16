import { SubTaskEntity } from '../entities/subTask.entity';
import { Repository } from 'typeorm';
import { TaskEntity } from '../entities/task.entity';
import { SubTaskDto, TaskDto } from '../dto/task.dto';
import { Pagination } from '../paginate/pagination';
export declare class SubTaskService {
    private readonly subTaskRepository;
    private readonly taskRepository;
    constructor(subTaskRepository: Repository<SubTaskEntity>, taskRepository: Repository<TaskEntity>);
    getAllSubTasks(options: PaginationOptionInterface): Promise<Pagination<SubTaskEntity>>;
    getSubTaskById(id: number): Promise<SubTaskEntity>;
    findAllByTaskId(taskId: number): Promise<SubTaskEntity[]>;
    createSubTask(dto: SubTaskDto): Promise<SubTaskEntity>;
    deleteSubTask(id: number): Promise<number>;
    updateSubTask(id: number, dto: TaskDto): Promise<SubTaskEntity>;
    updateStatusSubTask(id: number, newStatus: string): Promise<SubTaskEntity>;
}
