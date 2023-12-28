import { AggregateRoot } from './aggregate-root';

export abstract class IRepository<T, E extends AggregateRoot<T>> {
  abstract add(entity: E): Promise<void>;
}
