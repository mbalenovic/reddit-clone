import { DataSource } from "typeorm";
import { Post } from "../entities/post.entity";
import { BaseService } from "./base.service";

export class PostService extends BaseService<Post> {
  constructor(AppDataSource: DataSource) {
    super(AppDataSource, Post);
  }
}
