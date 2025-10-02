import { MikroORM } from "@mikro-orm/core";
import config from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "@apollo/server";
import http from "http";
import cors from "cors";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@as-integrations/express5";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post";
import path from "path";
import { Context } from "./types/context.type";
import { UserResolver } from "./resolvers/user";
import { isDev } from "./constants";
import { RedisStore } from "connect-redis";
import session from "express-session";
import { createClient } from "redis";

async function main() {
  const orm = await MikroORM.init(config);
  await orm.getMigrator().up();

  const app = express();

  // Initialize client.
  let redisClient = createClient();
  redisClient.connect().catch(console.error);

  // Initialize store.
  let redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp:",
    disableTouch: true,
  });

  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [PostResolver, UserResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
    validate: true,
  });

  const apolloServer = new ApolloServer<Context>({
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    schema,
  });

  await apolloServer.start();

  app.use(
    "/",
    session({
      name: "qid",
      store: redisStore,
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
      secret: "jkdsfkljdas9034u4j2ioj4kl",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // ten years
        httpOnly: true,
        secure: !isDev,
        sameSite: "lax",
      },
    }),
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => ({ em: orm.em.fork(), req, res }),
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/`);
}

main();
