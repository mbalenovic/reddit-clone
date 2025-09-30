import { EntityManager } from "@mikro-orm/postgresql";

export interface Context {
  em: EntityManager;
}
