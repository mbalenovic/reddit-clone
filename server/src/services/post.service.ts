import { DataSource, LessThan } from "typeorm";
import { Post } from "../entities/post.entity";
import { BaseService } from "./base.service";

export class PostService extends BaseService<Post> {
  constructor(AppDataSource: DataSource) {
    super(AppDataSource, Post);
  }

  async findById(id: number): Promise<Post | null> {
    const posts = await this.repository.find({
      relations: { author: true },
      where: {
        id,
      },
    });

    return posts[0] ?? null;
  }

  async getPosts(first: number, userId: number | null, after: string | null) {
    const query = this.repository
      .createQueryBuilder("post")
      .orderBy("post.createdAt", "DESC")
      .limit(first + 1)
      .leftJoinAndSelect("post.author", "author");

    if (after) {
      query.where({ createdAt: LessThan(new Date(after)) });
    }

    if (userId) {
      query
        .leftJoin(
          "post.upvotes",
          "upvote",
          "upvote.postId = post.id AND upvote.userId = :userId",
          { userId }
        )
        .addSelect("upvote.value", "voteStatus");
    }

    // Get raw + entities to attach voteStatus manually
    const rawAndEntities = await query.getRawAndEntities();

    return rawAndEntities.entities.map((post, i) => ({
      ...post,
      voteStatus: rawAndEntities.raw[i].voteStatus ?? null,
    }));
  }

  async removeByUser(id: number, userId: number): Promise<boolean> {
    const post = await this.findById(id);

    if (post?.authorId !== userId) return false;

    if (!post) {
      return false;
    }

    const result = await this.repo.remove(post);

    return result ? true : false;
  }

  async updatePost(id: number, title: string, text: string, userId: number) {
    const post = await this.findById(id);

    if (!post) {
      return null;
    }

    if (post.authorId !== userId) {
      return null;
    }

    if (typeof title !== "undefined") {
      post.title = title;
    }

    if (typeof text !== "undefined") {
      post.text = text;
    }

    await this.save(post);

    return post;
  }
}
