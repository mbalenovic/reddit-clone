import { DataSource, LessThan } from "typeorm";
import { Post } from "../entities/post.entity";
import { BaseService } from "./base.service";

export class PostService extends BaseService<Post> {
  constructor(AppDataSource: DataSource) {
    super(AppDataSource, Post);
  }

  async getPosts(first: number, after: string | null) {
    const query = this.repository
      .createQueryBuilder("post")
      .orderBy("post.createdAt", "DESC")
      .limit(first + 1);

    if (after) {
      query.where({ createdAt: LessThan(new Date(after)) });
    }

    return query.getMany();
  }
}
