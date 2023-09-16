"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auto1694808475783 = void 0;
class Auto1694808475783 {
    constructor() {
        this.name = 'Auto1694808475783';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "sub-tasks" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "taskId" integer, CONSTRAINT "PK_68e12afed54921e0aadd38b0164" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sub-tasks" ADD CONSTRAINT "FK_b5388a263e3d25d934f71b3e441" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "sub-tasks" DROP CONSTRAINT "FK_b5388a263e3d25d934f71b3e441"`);
        await queryRunner.query(`DROP TABLE "sub-tasks"`);
    }
}
exports.Auto1694808475783 = Auto1694808475783;
//# sourceMappingURL=1694808475783-auto.js.map