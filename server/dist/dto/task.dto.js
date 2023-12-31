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
exports.SubTaskDto = exports.TaskDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class TaskDto {
}
exports.TaskDto = TaskDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Shopping', description: 'string' }),
    (0, class_validator_1.IsString)({ message: 'The title of task must be only string' }),
    __metadata("design:type", String)
], TaskDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Need to go shop', description: 'string' }),
    (0, class_validator_1.IsString)({ message: 'The description of task must be only string' }),
    __metadata("design:type", String)
], TaskDto.prototype, "description", void 0);
class SubTaskDto extends TaskDto {
    constructor() {
        super();
    }
}
exports.SubTaskDto = SubTaskDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'number' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SubTaskDto.prototype, "taskId", void 0);
//# sourceMappingURL=task.dto.js.map