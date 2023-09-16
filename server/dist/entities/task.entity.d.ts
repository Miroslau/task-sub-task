import { ITask } from '../interfaces/ITask';
import { SubTaskEntity } from './subTask.entity';
export declare class TaskEntity implements ITask {
    id: number;
    title: string;
    description: string;
    subTasks: SubTaskEntity[];
    status: string;
}
