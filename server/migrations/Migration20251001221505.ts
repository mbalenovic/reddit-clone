import { Migration } from '@mikro-orm/migrations';

export class Migration20251001221505 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" drop column "email";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" add column "email" varchar(255) not null;`);
  }

}
