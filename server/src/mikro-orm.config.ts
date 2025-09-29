import { Options, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Post } from "./entities/post.entity";
import { Migrator } from "@mikro-orm/migrations";
import { isDev } from "./constants";
import path from "path";

// TODO: debug DB_PASSWORD=undefined
// const dbPassword = process.env.DB_PASSWORD;

// if (!dbPassword) {
//   throw new Error("DB_PASSWORD environment variable is not set!");
// }

const config: Options = {
  migrations: {
    path: "./migrations",
    glob: "*.{js,ts}",
  },
  entities: [Post],
  dbName: "reddit-clone",
  driver: PostgreSqlDriver,
  extensions: [Migrator],
  password: "postgres",
  debug: isDev,
};

export default config;
