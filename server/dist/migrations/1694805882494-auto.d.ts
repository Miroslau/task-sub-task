import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Auto1694805882494 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
