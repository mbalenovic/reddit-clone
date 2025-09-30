import { Arg, Ctx, Int, Query, Resolver } from "type-graphql";
import { Post } from "../entities/post.entity";
import { type Context } from "../context.type";

@Resolver()
export class PostResolver {
  @Query(() => Post, { nullable: true })
  post(
    @Arg("id", (_type) => Int) id: number,
    @Ctx() { em }: Context
  ): Promise<Post | null> {
    return em.findOne(Post, id);
  }

  @Query(() => [Post])
  posts(@Ctx() { em }: Context): Promise<Post[]> {
    return em.find(Post, {});
  }
}
