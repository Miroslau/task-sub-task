import { TaskEntity } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { Pagination } from '../paginate/pagination';
import { TaskDto } from '../dto/task.dto';
export declare class TaskService {
    private readonly taskRepository;
    constructor(taskRepository: Repository<TaskEntity>);
    getAllTasks(options: PaginationOptionInterface): Promise<Pagination<TaskEntity>>;
    getTaskById(id: number): Promise<TaskEntity>;
    createTask(dto: TaskDto): Promise<TaskEntity>;
    deleteTask(id: number): Promise<number>;
    updateTask(id: number, dto: TaskDto): Promise<TaskEntity>;
    updateStatusTask(id: number, newStatus: string): Promise<TaskEntity>;
}
