import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ITask } from '../interfaces/ITask';
import { ApiProperty } from '@nestjs/swagger';
import { TaskEntity } from './task.entity';

@Entity({ name: 'sub-tasks' })
export class SubTaskEntity implements ITask {
  @ApiProperty({ example: 1, description: 'number', required: true })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Buy products',
    description: 'string',
    required: true,
  })
  @Column()
  title: string;

  @ApiProperty({
    example: 'You need to go shop and buy',
    description: 'string',
    nullable: true,
  })
  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => TaskEntity, (task) => task.subTasks, {
    onDelete: 'CASCADE',
  })
  task: TaskEntity;

  @ApiProperty({
    example: 'Todo',
    description: 'string',
  })
  @Column({
    type: 'enum',
    enum: ['Todo', 'InProgress', 'Done'],
    default: 'Todo',
  })
  status: string;
}
