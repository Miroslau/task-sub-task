import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1694808475783 implements MigrationInterface {
    name = 'Auto1694808475783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sub-tasks" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "taskId" integer, CONSTRAINT "PK_68e12afed54921e0aadd38b0164" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sub-tasks" ADD CONSTRAINT "FK_b5388a263e3d25d934f71b3e441" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub-tasks" DROP CONSTRAINT "FK_b5388a263e3d25d934f71b3e441"`);
        await queryRunner.query(`DROP TABLE "sub-tasks"`);
    }

}
