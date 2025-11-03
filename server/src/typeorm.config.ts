import { DataSource } from "typeorm";
import { Post } from "./entities/post.entity";

import { isDev } from "./constants";
import { Upvote } from "./entities/upvote.entity";
import { User } from "./entities/user.entity";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "reddit",
  synchronize: isDev,
  logging: true,
  entities: [Post, User, Upvote],
  subscribers: [],
  migrations: [],
});

export default AppDataSource;
