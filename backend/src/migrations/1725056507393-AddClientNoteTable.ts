import { MigrationInterface, QueryRunner } from "typeorm";

export class AddClientNoteTable1725056507393 implements MigrationInterface {
    name = 'AddClientNoteTable1725056507393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "core"."clients" ("id" uuid NOT NULL, "user_id" uuid NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying, "email" character varying, "phone_number" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."notes" ("id" uuid NOT NULL, "client_id" uuid NOT NULL, "user_id" uuid NOT NULL, "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "core"."users" ALTER COLUMN "first_name" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."users" ALTER COLUMN "first_name" SET DEFAULT ''`);
        await queryRunner.query(`DROP TABLE "core"."notes"`);
        await queryRunner.query(`DROP TABLE "core"."clients"`);
    }

}
