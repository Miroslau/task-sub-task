"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auto1694814512807 = void 0;
class Auto1694814512807 {
    constructor() {
        this.name = 'Auto1694814512807';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "sub-tasks" DROP CONSTRAINT "FK_b5388a263e3d25d934f71b3e441"`);
        await queryRunner.query(`ALTER TABLE "sub-tasks" ADD CONSTRAINT "FK_b5388a263e3d25d934f71b3e441" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "sub-tasks" DROP CONSTRAINT "FK_b5388a263e3d25d934f71b3e441"`);
        await queryRunner.query(`ALTER TABLE "sub-tasks" ADD CONSTRAINT "FK_b5388a263e3d25d934f71b3e441" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.Auto1694814512807 = Auto1694814512807;
//# sourceMappingURL=1694814512807-auto.js.map