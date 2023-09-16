import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1694814512807 implements MigrationInterface {
    name = 'Auto1694814512807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub-tasks" DROP CONSTRAINT "FK_b5388a263e3d25d934f71b3e441"`);
        await queryRunner.query(`ALTER TABLE "sub-tasks" ADD CONSTRAINT "FK_b5388a263e3d25d934f71b3e441" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub-tasks" DROP CONSTRAINT "FK_b5388a263e3d25d934f71b3e441"`);
        await queryRunner.query(`ALTER TABLE "sub-tasks" ADD CONSTRAINT "FK_b5388a263e3d25d934f71b3e441" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
