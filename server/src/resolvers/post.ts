import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Post } from "../entities/post.entity";
import { Upvote } from "../entities/upvote.entity";
import { AuthInterceptor } from "../middleware/AuthInterceptor";
import { PostService } from "../services/post.service";
import { UpvoteService } from "../services/upvote.service";
import AppDataSource from "../typeorm.config";
import { type Context } from "../types/context.type";
import { PostConnection } from "../types/PostConnection";
import { PostInput } from "../types/PostInput";

@Resolver((of) => Post)
export class PostResolver {
  private postService = new PostService(AppDataSource);
  private upvoteService = new UpvoteService(AppDataSource);

  @FieldResolver(() => String)
  textSnippet(@Root() post: Post) {
    return post.text.slice(0, 20);
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("id", (_type) => Int) id: number): Promise<Post | null> {
    return this.postService.findById(id);
  }

  @Mutation(() => Post, { nullable: true })
  @UseMiddleware(AuthInterceptor)
  async vote(
    @Arg("value", () => Int) value: number,
    @Arg("postId", () => Int) postId: number,
    @Ctx() { req }: Context
  ): Promise<Post | null> {
    let realValue;
    if (value !== -1) {
      realValue = 1;
    } else {
      realValue = -1;
    }

    const upvote = new Upvote();
    upvote.postId = postId;
    upvote.userId = req.session.userId!;
    upvote.value = realValue;

    return AppDataSource.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(upvote);

      const post = await transactionalEntityManager.findOneBy(Post, {
        id: postId,
      });

      if (!post) {
        return null;
      }

      post.points = post.points + realValue;

      return transactionalEntityManager.save(post);
    });
  }

  @Query(() => PostConnection)
  async posts(
    @Arg("first") first: number,
    @Arg("after", () => String, { nullable: true }) after: string | null
  ): Promise<PostConnection> {
    const posts = await this.postService.getPosts(first, after);

    const hasNextPage = posts.length > first;
    const slicedPosts = posts.slice(0, first);

    const edges = slicedPosts.map((post) => ({
      node: post,
      cursor: post.createdAt.toISOString(),
    }));

    const endCursor = edges.length > 0 ? edges[edges.length - 1]!.cursor : null;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        endCursor,
      },
    };
  }

  @Mutation(() => Post)
  @UseMiddleware(AuthInterceptor)
  async createPost(
    @Arg("postInput", () => PostInput) postInput: PostInput,
    @Ctx() { req }: Context
  ): Promise<Post> {
    const post = new Post();
    post.authorId = req.session.userId!;

    return await this.postService.save({ ...post, ...postInput });
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
  async deletePost(@Arg("id", () => Int) id: number): Promise<Post | null> {
    return this.postService.remove(id);
  }
}
