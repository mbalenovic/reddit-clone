import { DataSource, ObjectLiteral, Repository } from "typeorm";

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

  async find(): Promise<T[]> {
    return this.repo.find();
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
