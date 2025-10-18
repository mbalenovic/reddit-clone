import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class User {
  // [OptionalProps]?: "createdAt" | "updatedAt";
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @UpdateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();

  @Field()
  @Column({ type: "text", unique: true })
  username!: string;

  @Field()
  @Column({ type: "text", unique: true, nullable: true })
  email!: string;

  @Column()
  password!: string;
}

export function isUser(user: unknown): user is User {
  return user instanceof User;
}
