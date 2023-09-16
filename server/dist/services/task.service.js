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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("../entities/task.entity");
const typeorm_2 = require("typeorm");
const pagination_1 = require("../paginate/pagination");
let TaskService = class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async getAllTasks(options) {
        const [results, total] = await this.taskRepository.findAndCount({
            take: options.limit,
            skip: options.page,
        });
        return new pagination_1.Pagination({
            results,
            total,
        });
    }
    async getTaskById(id) {
        return await this.taskRepository.findOne({
            where: {
                id: id,
            },
        });
    }
    async createTask(dto) {
        return await this.taskRepository.save({ ...dto });
    }
    async deleteTask(id) {
        await this.taskRepository.delete({ id });
        return id;
    }
    async updateTask(id, dto) {
        await this.taskRepository.update({
            id,
        }, { ...dto });
        return await this.getTaskById(id);
    }
    async updateStatusTask(id, newStatus) {
        const task = await this.getTaskById(id);
        if (!task) {
            throw new Error(`Task with ID ${id} not found`);
        }
        task.status = newStatus;
        return await this.taskRepository.save(task);
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.TaskEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TaskService);
//# sourceMappingURL=task.service.js.map