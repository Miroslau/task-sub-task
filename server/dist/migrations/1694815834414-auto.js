"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auto1694815834414 = void 0;
class Auto1694815834414 {
    constructor() {
        this.name = 'Auto1694815834414';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."tasks_status_enum" AS ENUM('Todo', 'InProgress', 'Done')`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "status" "public"."tasks_status_enum" NOT NULL DEFAULT 'Todo'`);
        await queryRunner.query(`CREATE TYPE "public"."sub-tasks_status_enum" AS ENUM('Todo', 'InProgress', 'Done')`);
        await queryRunner.query(`ALTER TABLE "sub-tasks" ADD "status" "public"."sub-tasks_status_enum" NOT NULL DEFAULT 'Todo'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "sub-tasks" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."sub-tasks_status_enum"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."tasks_status_enum"`);
    }
}
exports.Auto1694815834414 = Auto1694815834414;
//# sourceMappingURL=1694815834414-auto.js.map