import { DataSource } from "typeorm";
import { Post } from "./entities/post.entity";

import { isDev } from "./constants";
import { Upvote } from "./entities/upvote.entity";
import { User } from "./entities/user.entity";

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL!,
  synchronize: isDev,
  logging: true,
  entities: [Post, User, Upvote],
  subscribers: [],
  migrations: [],
});

export default AppDataSource;
