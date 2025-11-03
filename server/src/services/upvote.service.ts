import { DataSource } from "typeorm";
import { Upvote } from "../entities/upvote.entity";
import { BaseService } from "./base.service";

export class UpvoteService extends BaseService<Upvote> {
  constructor(AppDataSource: DataSource) {
    super(AppDataSource, Upvote);
  }
}
