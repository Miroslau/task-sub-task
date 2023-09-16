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
exports.TasksController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const task_service_1 = require("../services/task.service");
const http_exception_filter_1 = require("../filters/http-exception.filter");
const task_dto_1 = require("../dto/task.dto");
const task_entity_1 = require("../entities/task.entity");
const status_dto_1 = require("../dto/status.dto");
let TasksController = class TasksController {
    constructor(_taskService) {
        this._taskService = _taskService;
    }
    async getAllTasks(request) {
        return await this._taskService.getAllTasks({
            limit: request.query.hasOwnProperty('limit') ? request.query.limit : 10,
            page: request.query.hasOwnProperty('page') ? request.query.page : 0,
        });
    }
    async getTaskById(id) {
        return await this._taskService.getTaskById(id);
    }
    async createTask(dto) {
        return await this._taskService.createTask(dto);
    }
    async deleteTask(id) {
        return await this._taskService.deleteTask(id);
    }
    async updateTask(id, dto) {
        return await this._taskService.updateTask(id, dto);
    }
    async updateStatus(id, dto) {
        return this._taskService.updateStatusTask(id, dto.status);
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all tasks' }),
    (0, swagger_1.ApiResponse)({ type: [task_dto_1.TaskDto] }),
    (0, common_1.Get)(),
    (0, common_1.UseFilters)(http_exception_filter_1.AllExceptionsFilter),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getAllTasks", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get task by Id' }),
    (0, swagger_1.ApiResponse)({ type: task_entity_1.TaskEntity }),
    (0, common_1.Get)(':id'),
    (0, common_1.UseFilters)(http_exception_filter_1.AllExceptionsFilter),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTaskById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create task' }),
    (0, swagger_1.ApiBody)({ type: task_dto_1.TaskDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: task_dto_1.TaskDto }),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseFilters)(http_exception_filter_1.AllExceptionsFilter),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.TaskDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTask", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete task' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, common_1.Delete)(':id'),
    (0, common_1.UseFilters)(http_exception_filter_1.AllExceptionsFilter),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "deleteTask", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update task' }),
    (0, swagger_1.ApiBody)({ type: task_dto_1.TaskDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: task_entity_1.TaskEntity }),
    (0, common_1.Put)(':id'),
    (0, common_1.UseFilters)(http_exception_filter_1.AllExceptionsFilter),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, task_dto_1.TaskDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateTask", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update status of task' }),
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
    (0, swagger_1.ApiResponse)({ status: 200, type: task_entity_1.TaskEntity }),
    (0, common_1.Patch)(':id/status'),
    (0, common_1.UseFilters)(http_exception_filter_1.AllExceptionsFilter),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, status_dto_1.UpdateStatusDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateStatus", null);
exports.TasksController = TasksController = __decorate([
    (0, swagger_1.ApiTags)('Task'),
    (0, common_1.Controller)('/tasks'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map