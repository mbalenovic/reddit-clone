import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../entities/post.entity";
import { type Context } from "../types/context.type";

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

  @Mutation(() => Post)
  async createPost(
    @Arg("title", () => String) title: string,
    @Ctx() { em }: Context
  ): Promise<Post> {
    const post = em.create(Post, {
      title,
    });
    await em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Post)
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("title", () => String) title: string,
    @Ctx() { em }: Context
  ): Promise<Post | null> {
    const post = await em.findOne(Post, { id });
    if (!post) {
      return null;
    }

    if (typeof title !== "undefined") {
      post.title = title;
      await em.persistAndFlush(post);
    }

    return post;
  }

  @Mutation(() => Number)
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: Context
  ): Promise<number> {
    return em.nativeDelete(Post, { id });
  }
}
