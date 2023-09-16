import { ITask } from '../interfaces/ITask';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SubTaskEntity } from './subTask.entity';

@Entity({ name: 'tasks' })
export class TaskEntity implements ITask {
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

  @OneToMany(() => SubTaskEntity, (subTask) => subTask.task)
  subTasks: SubTaskEntity[];

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
