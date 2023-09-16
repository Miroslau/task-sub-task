import { SubTaskDto, TaskDto } from '../dto/task.dto';
import { SubTaskService } from '../services/sub-task.service';
import { SubTaskEntity } from '../entities/subTask.entity';
import { Pagination } from '../paginate/pagination';
import { UpdateStatusDto } from '../dto/status.dto';
export declare class SubTasksController {
    private readonly _subTaskService;
    constructor(_subTaskService: SubTaskService);
    getAllSubTasks(request: any): Promise<Pagination<SubTaskEntity>>;
    getTaskById(id: number): Promise<SubTaskEntity>;
    findByTaskId(taskId: number): Promise<SubTaskEntity[]>;
    createTask(dto: SubTaskDto): Promise<SubTaskEntity>;
    deleteTask(id: number): Promise<number>;
    updateTask(id: number, dto: TaskDto): Promise<SubTaskEntity>;
    updateStatus(id: number, dto: UpdateStatusDto): Promise<SubTaskEntity>;
}
