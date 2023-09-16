"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubTasksController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("../filters/http-exception.filter");
const task_dto_1 = require("../dto/task.dto");
const sub_task_service_1 = require("../services/sub-task.service");
const subTask_entity_1 = require("../entities/subTask.entity");
const status_dto_1 = require("../dto/status.dto");
let SubTasksController = class SubTasksController {
    constructor(_subTaskService) {
        this._subTaskService = _subTaskService;
    }
    async getAllSubTasks(request) {
        return await this._subTaskService.getAllSubTasks({
            limit: request.query.hasOwnProperty('limit') ? request.query.limit : 10,
            page: request.query.hasOwnProperty('page') ? request.query.page : 0,
        });
    }
    async getTaskById(id) {
        return await this._subTaskService.getSubTaskById(id);
    }
    async findByTaskId(taskId) {
        return this._subTaskService.findAllByTaskId(taskId);
    }
    async createTask(dto) {
        return await this._subTaskService.createSubTask(dto);
    }
    async deleteTask(id) {
        return await this._subTaskService.deleteSubTask(id);
    }
    async updateTask(id, dto) {
        return await this._subTaskService.updateSubTask(id, dto);
    }
    async updateStatus(id, dto) {
        return this._subTaskService.updateStatusSubTask(id, dto.status);
    }
};
exports.SubTasksController = SubTasksController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all sub-tasks by id task' }),
    (0, swagger_1.ApiResponse)({ type: [task_dto_1.SubTaskDto] }),
    (0, common_1.Get)(),
    (0, common_1.UseFilters)(http_exception_filter_1.AllExceptionsFilter),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubTasksController.prototype, "getAllSubTasks", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get sub-task by Id' }),
    (0, swagger_1.ApiResponse)({ type: subTask_entity_1.SubTaskEntity }),
    (0, common_1.Get)(':id'),
    (0, common_1.UseFilters)(http_exception_filter_1.AllExceptionsFilter),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubTasksController.prototype, "getTaskById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all sub-tasks by id task' }),
    (0, swagger_1.ApiResponse)({ type: [task_dto_1.SubTaskDto] }),
    (0, common_1.Get)('by-task/:taskId'),
    (0, common_1.UseFilters)(http_exception_filter_1.AllExceptionsFilter),
    __param(0, (0, common_1.Param)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubTasksController.prototype, "findByTaskId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create sub-task' }),
    (0, swagger_1.ApiBody)({ type: task_dto_1.SubTaskDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: task_dto_1.SubTaskDto }),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseFilters)(http_exception_filter_1.AllExceptionsFilter),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.SubTaskDto]),
    __metadata("design:returntype", Promise)
], SubTasksController.prototype, "createTask", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete sub-task' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, common_1.Delete)(':id'),
    (0, common_1.UseFilters)(http_exception_filter_1.AllExceptionsFilter),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubTasksController.prototype, "deleteTask", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update sub-task' }),
    (0, swagger_1.ApiBody)({ type: task_dto_1.TaskDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: subTask_entity_1.SubTaskEntity }),
    (0, common_1.Put)(':id'),
    (0, common_1.UseFilters)(http_exception_filter_1.AllExceptionsFilter),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, task_dto_1.TaskDto]),
    __metadata("design:returntype", Promise)
], SubTasksController.prototype, "updateTask", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update status of sub-task' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number' }),
    (0, swagger_1.ApiBody)({
        type: status_dto_1.UpdateStatusDto,
        schema: {
            example: { status: status_dto_1.Status.InProgress },
            properties: {
                status: {
                    type: 'string',
                    enum: [status_dto_1.Status.Todo, status_dto_1.Status.InProgress, status_dto_1.Status.Done],
                    description: 'Status of task (Todo, InProgress, Done)',
                },
            },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Wrong status' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: subTask_entity_1.SubTaskEntity }),
    (0, common_1.Patch)(':id/status'),
    (0, common_1.UseFilters)(http_exception_filter_1.AllExceptionsFilter),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, status_dto_1.UpdateStatusDto]),
    __metadata("design:returntype", Promise)
], SubTasksController.prototype, "updateStatus", null);
exports.SubTasksController = SubTasksController = __decorate([
    (0, swagger_1.ApiTags)('Sub Tasks'),
    (0, common_1.Controller)('/sub-tasks'),
    __metadata("design:paramtypes", [sub_task_service_1.SubTaskService])
], SubTasksController);
//# sourceMappingURL=sub-tasks.controller.js.map