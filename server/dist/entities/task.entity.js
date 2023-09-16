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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const subTask_entity_1 = require("./subTask.entity");
let TaskEntity = class TaskEntity {
};
exports.TaskEntity = TaskEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'number', required: true }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TaskEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Buy products',
        description: 'string',
        required: true,
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TaskEntity.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'You need to go shop and buy',
        description: 'string',
        nullable: true,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TaskEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subTask_entity_1.SubTaskEntity, (subTask) => subTask.task),
    __metadata("design:type", Array)
], TaskEntity.prototype, "subTasks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Todo',
        description: 'string',
    }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['Todo', 'InProgress', 'Done'],
        default: 'Todo',
    }),
    __metadata("design:type", String)
], TaskEntity.prototype, "status", void 0);
exports.TaskEntity = TaskEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'tasks' })
], TaskEntity);
//# sourceMappingURL=task.entity.js.map