import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./post.entity";

@ObjectType()
@Entity()
export class User {
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

  @OneToMany(() => Post, (post) => post.authorId)
  posts!: Post[];
}
