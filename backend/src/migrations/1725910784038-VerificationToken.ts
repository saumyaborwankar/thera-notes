import { MigrationInterface, QueryRunner } from "typeorm";

export class VerificationToken1725910784038 implements MigrationInterface {
    name = 'VerificationToken1725910784038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."clients" ADD "age" integer`);
        await queryRunner.query(`ALTER TABLE "core"."clients" ADD "address" character varying`);
        await queryRunner.query(`ALTER TABLE "core"."users" ADD "verification_token" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."users" DROP COLUMN "verification_token"`);
        await queryRunner.query(`ALTER TABLE "core"."clients" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "core"."clients" DROP COLUMN "age"`);
    }

}
