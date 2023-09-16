import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Status {
  Todo = 'Todo',
  InProgress = 'InProgress',
  Done = 'Done',
}

export class UpdateStatusDto {
  @IsEnum(Status)
  @ApiProperty({
    type: String,
    enum: Status,
    description: 'Status of task (Todo, InProgress, Done)',
  })
  status: Status;
}
