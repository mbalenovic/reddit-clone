import { DataSource, LessThan } from "typeorm";
import { Post } from "../entities/post.entity";
import { BaseService } from "./base.service";

export class PostService extends BaseService<Post> {
  constructor(AppDataSource: DataSource) {
    super(AppDataSource, Post);
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
}
