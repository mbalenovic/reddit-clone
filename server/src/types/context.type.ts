import { RedisStore } from "connect-redis";
import { Request, Response } from "express";
import { createUserLoader } from "../utils/createUserLoader";

export interface Context {
  req: Request;
  res: Response;
  redisStore: RedisStore;
  userLoader: ReturnType<typeof createUserLoader>;
}
