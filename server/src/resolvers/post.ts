import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../entities/post.entity";
import { PostService } from "../services/post.service";
import AppDataSource from "../typeorm.config";

@Resolver()
export class PostResolver {
  private postService = new PostService(AppDataSource);

  @Query(() => Post, { nullable: true })
  post(@Arg("id", (_type) => Int) id: number): Promise<Post | null> {
    return this.postService.findById(id);
  }

  @Query(() => [Post])
  posts(): Promise<Post[]> {
    return this.postService.find();
  }

  @Mutation(() => Post)
  async createPost(@Arg("title", () => String) title: string): Promise<Post> {
    const post = new Post();
    post.title = title;

    return await this.postService.save(post);
  }

  @Mutation(() => Post)
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("title", () => String) title: string
  ): Promise<Post | null> {
    const post = await this.postService.findById(id);
    if (!post) {
      return null;
    }

    if (typeof title !== "undefined") {
      const newPost = new Post();
      newPost.title = title;

      await this.postService.save(newPost);
    }

    return post;
  }

  @Mutation(() => Number)
  async deletePost(@Arg("id", () => Int) id: number): Promise<number> {
    return this.postService.remove(id);
  }
}
