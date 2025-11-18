import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@ObjectType()
@Entity()
export class Upvote {
  @Field()
  @PrimaryColumn()
  userId!: number;

  @Field()
  @PrimaryColumn()
  postId!: number;

  @Field(() => Int)
  @Column()
  value!: number;

  @ManyToOne(() => User, (user) => user.upvotes)
  user!: User;

  @ManyToOne(() => Post, (post) => post.upvotes)
  post!: Post;
}
