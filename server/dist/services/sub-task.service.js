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
exports.SubTaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const subTask_entity_1 = require("../entities/subTask.entity");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("../entities/task.entity");
const pagination_1 = require("../paginate/pagination");
let SubTaskService = class SubTaskService {
    constructor(subTaskRepository, taskRepository) {
        this.subTaskRepository = subTaskRepository;
        this.taskRepository = taskRepository;
    }
    async getAllSubTasks(options) {
        const [results, total] = await this.subTaskRepository.findAndCount({
            take: options.limit,
            skip: options.page,
            relations: {
                task: true,
            },
        });
        return new pagination_1.Pagination({
            results,
            total,
        });
    }
    async getSubTaskById(id) {
        return await this.subTaskRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                task: true,
            },
        });
    }
    async findAllByTaskId(taskId) {
        return this.subTaskRepository.find({ where: { task: { id: taskId } } });
    }
    async createSubTask(dto) {
        const { title, description, taskId } = dto;
        const task = await this.taskRepository.findOne({
            where: {
                id: taskId,
            },
        });
        if (!task) {
            throw new Error(`Task with ID ${taskId} not found`);
        }
        const subTask = new subTask_entity_1.SubTaskEntity();
        subTask.title = title;
        subTask.description = description;
        subTask.task = task;
        return await this.subTaskRepository.save(subTask);
    }
    async deleteSubTask(id) {
        await this.subTaskRepository.delete({ id });
        return id;
    }
    async updateSubTask(id, dto) {
        await this.subTaskRepository.update({
            id,
        }, { ...dto });
        return await this.getSubTaskById(id);
    }
    async updateStatusSubTask(id, newStatus) {
        const subTask = await this.getSubTaskById(id);
        if (!subTask) {
            throw new Error(`SubTask with ID ${id} not found`);
        }
        subTask.status = newStatus;
        return await this.subTaskRepository.save(subTask);
    }
};
exports.SubTaskService = SubTaskService;
exports.SubTaskService = SubTaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subTask_entity_1.SubTaskEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(task_entity_1.TaskEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SubTaskService);
//# sourceMappingURL=sub-task.service.js.map