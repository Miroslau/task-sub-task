"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auto1694805882494 = void 0;
class Auto1694805882494 {
    constructor() {
        this.name = 'Auto1694805882494';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "tasks"`);
    }
}
exports.Auto1694805882494 = Auto1694805882494;
//# sourceMappingURL=1694805882494-auto.js.map