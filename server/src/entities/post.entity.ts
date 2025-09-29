import { Entity, Property } from "@mikro-orm/core";
import { BaseEntitiy } from "./base.entity";

@Entity()
export class Post extends BaseEntitiy {
  @Property()
  title!: string;
}
