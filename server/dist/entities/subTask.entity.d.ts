import { ITask } from '../interfaces/ITask';
import { TaskEntity } from './task.entity';
export declare class SubTaskEntity implements ITask {
    id: number;
    title: string;
    description: string;
    task: TaskEntity;
    status: string;
}
