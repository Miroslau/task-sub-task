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
import { AllExceptionsFilter } from '../filters/http-exception.filter';
import { SubTaskDto, TaskDto } from '../dto/task.dto';
import { SubTaskService } from '../services/sub-task.service';
import { SubTaskEntity } from '../entities/subTask.entity';
import { Pagination } from '../paginate/pagination';
import { Status, UpdateStatusDto } from '../dto/status.dto';

@ApiTags('Sub Tasks')
@Controller('/sub-tasks')
export class SubTasksController {
  constructor(private readonly _subTaskService: SubTaskService) {}

  @ApiOperation({ summary: 'Get all sub-tasks by id task' })
  @ApiResponse({ type: [SubTaskDto] })
  @Get()
  @UseFilters(AllExceptionsFilter)
  async getAllSubTasks(@Request() request): Promise<Pagination<SubTaskEntity>> {
    return await this._subTaskService.getAllSubTasks({
      limit: request.query.hasOwnProperty('limit') ? request.query.limit : 10,
      page: request.query.hasOwnProperty('page') ? request.query.page : 0,
    });
  }

  @ApiOperation({ summary: 'Get sub-task by Id' })
  @ApiResponse({ type: SubTaskEntity })
  @Get(':id')
  @UseFilters(AllExceptionsFilter)
  async getTaskById(@Param('id') id: number): Promise<SubTaskEntity> {
    return await this._subTaskService.getSubTaskById(id);
  }

  @ApiOperation({ summary: 'Get all sub-tasks by id task' })
  @ApiResponse({ type: [SubTaskDto] })
  @Get('by-task/:taskId')
  @UseFilters(AllExceptionsFilter)
  async findByTaskId(
    @Param('taskId') taskId: number,
  ): Promise<SubTaskEntity[]> {
    return this._subTaskService.findAllByTaskId(taskId);
  }

  @ApiOperation({ summary: 'Create sub-task' })
  @ApiBody({ type: SubTaskDto })
  @ApiResponse({ status: 200, type: SubTaskDto })
  @Post()
  @HttpCode(200)
  @UseFilters(AllExceptionsFilter)
  async createTask(@Body() dto: SubTaskDto): Promise<SubTaskEntity> {
    return await this._subTaskService.createSubTask(dto);
  }

  @ApiOperation({ summary: 'Delete sub-task' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  @UseFilters(AllExceptionsFilter)
  async deleteTask(@Param('id') id: number): Promise<number> {
    return await this._subTaskService.deleteSubTask(id);
  }

  @ApiOperation({ summary: 'Update sub-task' })
  @ApiBody({ type: TaskDto })
  @ApiResponse({ status: 200, type: SubTaskEntity })
  @Put(':id')
  @UseFilters(AllExceptionsFilter)
  async updateTask(
    @Param('id') id: number,
    @Body() dto: TaskDto,
  ): Promise<SubTaskEntity> {
    return await this._subTaskService.updateSubTask(id, dto);
  }

  @ApiOperation({ summary: 'Update status of sub-task' })
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
  @ApiResponse({ status: 200, type: SubTaskEntity })
  @Patch(':id/status')
  @UseFilters(AllExceptionsFilter)
  async updateStatus(@Param('id') id: number, @Body() dto: UpdateStatusDto) {
    return this._subTaskService.updateStatusSubTask(id, dto.status);
  }
}
