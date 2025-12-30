import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@as-integrations/express5";
import { RedisStore } from "connect-redis";
import cors from "cors";
import "dotenv/config";
import express from "express";
import session from "express-session";
import http from "http";
import path from "path";
import { createClient } from "redis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { isDev } from "./constants";
import { ErrorInterceptor } from "./middleware/ErrorInterceptor";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import AppDataSource from "./typeorm.config";
import { Context } from "./types/context.type";
import { createUserLoader } from "./utils/createUserLoader";

async function main() {
  try {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();
  } catch (error) {
    console.log(error);
  }
  const app = express();

  // Initialize client.
  let redisClient = createClient({ url: process.env.REDIS_URL! });
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
    emitSchemaFile: isDev ? path.resolve(__dirname, "schema.graphql") : false,
    validate: true,
    globalMiddlewares: [ErrorInterceptor],
  });

  const apolloServer = new ApolloServer<Context>({
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    schema,
  });

  await apolloServer.start();
  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  const userLoader = createUserLoader();

  app.use(
    "/",
    session({
      name: "qid",
      store: redisStore,
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
      secret: process.env.REDIS_SECRET!,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // ten years
        httpOnly: true,
        secure: !isDev,
        sameSite: isDev ? "lax" : "none",
      },
    }),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => ({
        req,
        res,
        redisStore,
        userLoader,
      }),
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.PORT || 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/`);
}

main();
