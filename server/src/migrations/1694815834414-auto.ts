import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1694815834414 implements MigrationInterface {
    name = 'Auto1694815834414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tasks_status_enum" AS ENUM('Todo', 'InProgress', 'Done')`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "status" "public"."tasks_status_enum" NOT NULL DEFAULT 'Todo'`);
        await queryRunner.query(`CREATE TYPE "public"."sub-tasks_status_enum" AS ENUM('Todo', 'InProgress', 'Done')`);
        await queryRunner.query(`ALTER TABLE "sub-tasks" ADD "status" "public"."sub-tasks_status_enum" NOT NULL DEFAULT 'Todo'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub-tasks" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."sub-tasks_status_enum"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."tasks_status_enum"`);
    }

}
