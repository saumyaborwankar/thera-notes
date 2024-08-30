import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsersTable1724999347191 implements MigrationInterface {
    name = 'AddUsersTable1724999347191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "core"."video" ("id" uuid NOT NULL, "title" character varying NOT NULL, "creator" character varying NOT NULL, "genre" character varying NOT NULL, "description" character varying, "url" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."users" ("id" uuid NOT NULL, "first_name" character varying NOT NULL DEFAULT '', "last_name" character varying, "verified" boolean NOT NULL DEFAULT false, "tier" character varying NOT NULL DEFAULT 'Free', "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "hashed_rt" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "core"."users"`);
        await queryRunner.query(`DROP TABLE "core"."video"`);
    }

}
