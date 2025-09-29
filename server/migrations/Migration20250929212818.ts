import { Migration } from '@mikro-orm/migrations';

export class Migration20250929212818 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "base_entitiy" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "base_entitiy_pkey" primary key ("id"));`);

    this.addSql(`alter table "post" alter column "id" type varchar(255) using ("id"::varchar(255));`);
    this.addSql(`alter table "post" alter column "id" drop default;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "base_entitiy" cascade;`);

    this.addSql(`alter table "post" alter column "id" type int4 using ("id"::int4);`);
    this.addSql(`create sequence if not exists "post_id_seq";`);
    this.addSql(`select setval('post_id_seq', (select max("id") from "post"));`);
    this.addSql(`alter table "post" alter column "id" set default nextval('post_id_seq');`);
  }

}
