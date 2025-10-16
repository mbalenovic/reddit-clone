import { RedisStore } from "connect-redis";
import { Request, Response } from "express";
import { DataSource } from "typeorm";

export interface Context {
  ds: DataSource;
  req: Request;
  res: Response;
  redisStore: RedisStore;
}
