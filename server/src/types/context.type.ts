import { RedisStore } from "connect-redis";
import { Request, Response } from "express";

export interface Context {
  req: Request;
  res: Response;
  redisStore: RedisStore;
}
