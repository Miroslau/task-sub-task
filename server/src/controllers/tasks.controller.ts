import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UseFilters,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { AllExceptionsFilter } from '../filters/http-exception.filter';
import { TaskDto } from '../dto/task.dto';
import { Pagination } from '../paginate/pagination';
import { TaskEntity } from '../entities/task.entity';
import { Status, UpdateStatusDto } from '../dto/status.dto';

@ApiTags('Task')
@Controller('/tasks')
export class TasksController {
  constructor(private readonly _taskService: TaskService) {}

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ type: [TaskDto] })
  @Get()
  @UseFilters(AllExceptionsFilter)
  async getAllTasks(@Request() request): Promise<Pagination<TaskEntity>> {
    return await this._taskService.getAllTasks({
      limit: request.query.hasOwnProperty('limit') ? request.query.limit : 10,
      page: request.query.hasOwnProperty('page') ? request.query.page : 0,
    });
  }

  @ApiOperation({ summary: 'Get task by Id' })
  @ApiResponse({ type: TaskEntity })
  @Get(':id')
  @UseFilters(AllExceptionsFilter)
  async getTaskById(@Param('id') id: number): Promise<TaskEntity> {
    return await this._taskService.getTaskById(id);
  }

  @ApiOperation({ summary: 'Create task' })
  @ApiBody({ type: TaskDto })
  @ApiResponse({ status: 200, type: TaskDto })
  @Post()
  @HttpCode(200)
  @UseFilters(AllExceptionsFilter)
  async createTask(@Body() dto: TaskDto): Promise<TaskEntity> {
    return await this._taskService.createTask(dto);
  }

  @ApiOperation({ summary: 'Delete task' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  @UseFilters(AllExceptionsFilter)
  async deleteTask(@Param('id') id: number): Promise<number> {
    return await this._taskService.deleteTask(id);
  }

  @ApiOperation({ summary: 'Update task' })
  @ApiBody({ type: TaskDto })
  @ApiResponse({ status: 200, type: TaskEntity })
  @Put(':id')
  @UseFilters(AllExceptionsFilter)
  async updateTask(
    @Param('id') id: number,
    @Body() dto: TaskDto,
  ): Promise<TaskEntity> {
    return await this._taskService.updateTask(id, dto);
  }

  @ApiOperation({ summary: 'Update status of task' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({
    type: UpdateStatusDto,
    schema: {
      example: { status: Status.InProgress },
      properties: {
        status: {
          type: 'string',
          enum: [Status.Todo, Status.InProgress, Status.Done],
          description: 'Status of task (Todo, InProgress, Done)',
        },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Wrong status' })
  @ApiResponse({ status: 200, type: TaskEntity })
  @Patch(':id/status')
  @UseFilters(AllExceptionsFilter)
  async updateStatus(@Param('id') id: number, @Body() dto: UpdateStatusDto) {
    return this._taskService.updateStatusTask(id, dto.status);
  }
}
