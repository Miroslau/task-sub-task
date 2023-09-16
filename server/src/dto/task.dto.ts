import { ITask } from '../interfaces/ITask';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TaskDto implements ITask {
  @ApiProperty({ example: 'Shopping', description: 'string' })
  @IsString({ message: 'The title of task must be only string' })
  title: string;

  @ApiProperty({ example: 'Need to go shop', description: 'string' })
  @IsString({ message: 'The description of task must be only string' })
  description: string;
}

export class SubTaskDto extends TaskDto {
  constructor() {
    super();
  }
  @ApiProperty({ example: '1', description: 'number' })
  @IsNumber()
  taskId: number;
}
