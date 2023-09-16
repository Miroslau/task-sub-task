import { ITask } from '../interfaces/ITask';
export declare class TaskDto implements ITask {
    title: string;
    description: string;
}
export declare class SubTaskDto extends TaskDto {
    constructor();
    taskId: number;
}
