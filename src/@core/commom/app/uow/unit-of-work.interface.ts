import { AggregateRoot } from '../../domain/aggregate-root';
import { IRepository } from '../../domain/repository';

export interface DbSet {
  getRepository(repo: string): typeof IRepository<any, any>
}

export interface UnitOfWork {
  beginTransaction(): Promise<void>;
  completeTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
  runTransaction<T>(callback: () => Promise<T>): Promise<T>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  getAggregateRoots(): AggregateRoot<any>[];
  getRepository(repo: string): IRepository<any, any>
}
