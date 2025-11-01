import { Field, ObjectType } from "type-graphql";
import { Post } from "../entities/post.entity";

@ObjectType()
export class PageInfo {
  @Field()
  hasNextPage!: boolean;

  @Field(() => String, { nullable: true })
  endCursor?: string | null;
}

@ObjectType()
export class PostEdge {
  @Field(() => Post)
  node!: Post;

  @Field()
  cursor!: string;
}

@ObjectType()
export class PostConnection {
  @Field(() => [PostEdge])
  edges!: PostEdge[];

  @Field(() => PageInfo)
  pageInfo!: PageInfo;
}
