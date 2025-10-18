import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@as-integrations/express5";
import { RedisStore } from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import http from "http";
import path from "path";
import { createClient } from "redis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { isDev } from "./constants";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import AppDataSource from "./typeorm.config";
import { Context } from "./types/context.type";

async function main() {
  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.log(error);
  }

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
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

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
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => ({
        req,
        res,
        redisStore,
      }),
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/`);
}

main();
