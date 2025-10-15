import { EntityManager } from "@mikro-orm/postgresql";
import { RedisStore } from "connect-redis";
import { Request, Response } from "express";

export interface Context {
  em: EntityManager;
  req: Request;
  res: Response;
  redisStore: RedisStore;
}
