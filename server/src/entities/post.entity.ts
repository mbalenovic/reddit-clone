import { Field, GraphQLISODateTime, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@ObjectType()
@Entity()
export class Post {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => GraphQLISODateTime)
  @Index()
  @UpdateDateColumn()
  createdAt = new Date();

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn()
  updatedAt = new Date();

  @Field(() => String)
  @Column()
  title!: string;

  @Field(() => String)
  @Column()
  text!: string;

  @Field(() => Int)
  @Column({ default: 0 })
  points!: number;

  @Field()
  @Column()
  authorId!: number;

  @ManyToOne(() => User, (user) => user.posts)
  author!: User;
}
