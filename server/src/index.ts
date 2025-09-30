import { MikroORM } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";
import { Post } from "./entities/post.entity";
import config from "./mikro-orm.config";

async function main() {
  const orm = await MikroORM.init(config);
  await orm.getMigrator().up();
  const emFork = orm.em.fork() as EntityManager;

  const post = emFork.create(Post, { title: "new post 3" });
  await emFork.persistAndFlush(post);
}

main();
