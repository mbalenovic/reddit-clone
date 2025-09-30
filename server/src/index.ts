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
import { Context } from "./context.type";

async function main() {
  const orm = await MikroORM.init(config);
  await orm.getMigrator().up();

  const app = express();

  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [PostResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
    validate: false,
  });

  const apolloServer = new ApolloServer<Context>({
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    schema,
  });

  await apolloServer.start();

  app.use(
    "/",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async () => ({ em: orm.em.fork() }),
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/`);
}

main();
