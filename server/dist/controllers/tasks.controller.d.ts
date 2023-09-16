import { TaskService } from '../services/task.service';
import { TaskDto } from '../dto/task.dto';
import { Pagination } from '../paginate/pagination';
import { TaskEntity } from '../entities/task.entity';
import { UpdateStatusDto } from '../dto/status.dto';
export declare class TasksController {
    private readonly _taskService;
    constructor(_taskService: TaskService);
    getAllTasks(request: any): Promise<Pagination<TaskEntity>>;
    getTaskById(id: number): Promise<TaskEntity>;
    createTask(dto: TaskDto): Promise<TaskEntity>;
    deleteTask(id: number): Promise<number>;
    updateTask(id: number, dto: TaskDto): Promise<TaskEntity>;
    updateStatus(id: number, dto: UpdateStatusDto): Promise<TaskEntity>;
}
