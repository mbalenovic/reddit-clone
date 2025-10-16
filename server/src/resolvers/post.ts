import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../entities/post.entity";
import { type Context } from "../types/context.type";

@Resolver()
export class PostResolver {
  @Query(() => Post, { nullable: true })
  post(
    @Arg("id", (_type) => Int) id: number,
    @Ctx() { ds }: Context
  ): Promise<Post | null> {
    const postRepo = ds.getRepository(Post);

    return postRepo.findOneBy({ id });
  }

  @Query(() => [Post])
  posts(@Ctx() { ds }: Context): Promise<Post[]> {
    const postRepo = ds.getRepository(Post);

    return postRepo.find();
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title", () => String) title: string,
    @Ctx() { ds }: Context
  ): Promise<Post> {
    const postRepo = ds.getRepository(Post);

    const post = new Post();
    post.title = title;

    return await postRepo.save(post);
  }

  @Mutation(() => Post)
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("title", () => String) title: string,
    @Ctx() { ds }: Context
  ): Promise<Post | null> {
    const postRepo = ds.getRepository(Post);

    const post = await postRepo.findOneBy({ id });
    if (!post) {
      return null;
    }

    if (typeof title !== "undefined") {
      post.title = title;
      await postRepo.save(post);
    }

    return post;
  }

  @Mutation(() => Number)
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { ds }: Context
  ): Promise<number> {
    const postRepo = ds.getRepository(Post);
    const post = await postRepo.findOneBy({ id });

    // TODO: add better handling for post not found
    if (!post) {
      return 0;
    }

    const removedPost = await postRepo.remove(post);
    return removedPost.id;
  }
}
