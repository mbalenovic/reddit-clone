import {
  DataSource,
  FindOptionsWhere,
  In,
  ObjectLiteral,
  Repository,
} from "typeorm";

export abstract class BaseService<T extends ObjectLiteral> {
  protected readonly repo: Repository<T>;

  constructor(
    protected readonly AppDataSource: DataSource,
    entity: new () => T
  ) {
    this.repo = AppDataSource.getRepository(entity);
  }

  get repository() {
    return this.repo;
  }

  async findById(id: number): Promise<T | null> {
    return this.repo.findOneBy({ id } as any);
  }

  async findByIds(ids: readonly number[]): Promise<T[]> {
    return this.repo.findBy({ id: In(ids) } as any);
  }

  async find(
    where: FindOptionsWhere<T> | FindOptionsWhere<T>[]
  ): Promise<T | null> {
    return this.repo.findOneBy(where);
  }

  async exists(
    findOptions: FindOptionsWhere<T> | FindOptionsWhere<T>[]
  ): Promise<boolean> {
    return this.repo.exists({ where: findOptions });
  }

  async remove(id: number): Promise<T | null> {
    const entity = await this.findById(id);

    if (!entity) {
      return null;
    }

    return this.repo.remove(entity);
  }

  async save(entity: T): Promise<T> {
    return this.repo.save(entity);
  }
}
