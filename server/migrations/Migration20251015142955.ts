import { Migration } from '@mikro-orm/migrations';

export class Migration20251015142955 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" add column "email" text null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop column "email";`);
  }

}
