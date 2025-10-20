import { DataSource, ObjectLiteral } from "typeorm";

export abstract class BaseService<T> {
  protected readonly repo: ObjectLiteral;

  constructor(
    protected readonly AppDataSource: DataSource,
    entity: new () => T
  ) {
    this.repo = AppDataSource.getRepository(entity);
  }

  async findById(id: number): Promise<T | null> {
    return this.repo.findOneBy({ id });
  }

  async find(): Promise<T[]> {
    return this.repo.find();
  }

  async remove(id: number): Promise<number> {
    const entity = this.repo.findById(id);

    return this.repo.remove(entity);
  }

  async save(entity: T) {
    return this.repo.save(entity);
  }
}
