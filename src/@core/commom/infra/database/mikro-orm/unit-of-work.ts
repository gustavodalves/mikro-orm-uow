import { DbSet, UnitOfWork } from "../../../app/uow/unit-of-work.interface";
import { EntityManager } from '@mikro-orm/mysql';
import { AggregateRoot } from "../../../domain/aggregate-root";
import { IRepository } from "../../../domain/repository";

export class DbSetMikroOrm implements DbSet{
  private repos: {
    [key: string]: new(em: EntityManager) => IRepository<any, any>;
  } = {}

  constructor() {}

  registerRepository(name: string, repo: new(em: EntityManager) => IRepository<any, any>) {
    this.repos[name] = repo
  }

  getRepository(name: string): any {
    const repo = this.repos[name]
    if(!repo) { throw new Error("repository not founded" )}
    return repo
  }
}

export default class UnitOfWorkMikroOrm implements UnitOfWork {
    private em: EntityManager

    constructor(
      em: EntityManager,
      private dbSet: DbSetMikroOrm
    ) {
      this.em = em.fork()
    }

    beginTransaction(): Promise<void> {
      return this.em.begin();
    }
    completeTransaction(): Promise<void> {
      return this.em.commit();
    }
    rollbackTransaction(): Promise<void> {
      return this.em.rollback();
    }
  
    runTransaction<T>(callback: (em: EntityManager) => Promise<T>): Promise<T> {
      return this.em.transactional(callback);
    }
  
    commit(): Promise<void> {
      return this.em.flush();
    }
  
    async rollback(): Promise<void> {
      this.em.clear();
    }
  
    getAggregateRoots(): AggregateRoot<any>[] {
      return [
        ...this.em.getUnitOfWork().getPersistStack(),
        ...this.em.getUnitOfWork().getRemoveStack(),
      ] as AggregateRoot<any>[];
    }

    getRepository(repo: string): IRepository<any, any> {
      const rep = this.dbSet.getRepository(repo)
      return new rep(this.em)
    }
}
