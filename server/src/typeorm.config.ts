import { DataSource } from "typeorm";
import { Post } from "./entities/post.entity";

import { isDev } from "./constants";
import { Upvote } from "./entities/upvote.entity";
import { User } from "./entities/user.entity";
import { InitialMigration1766872354460 } from "./migrations/1766872354460-InitialMigration";

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL!,
  synchronize: isDev,
  logging: true,
  entities: [Post, User, Upvote],
  subscribers: [],
  migrations: [InitialMigration1766872354460],
});

export default AppDataSource;
