import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserTable1725052564828 implements MigrationInterface {
    name = 'AddUserTable1725052564828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "core"."users" ("id" uuid NOT NULL, "first_name" character varying NOT NULL DEFAULT '', "last_name" character varying, "verified" boolean NOT NULL DEFAULT false, "tier" character varying NOT NULL DEFAULT 'Free', "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "hashed_rt" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "core"."users"`);
    }

}
