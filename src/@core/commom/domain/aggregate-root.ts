import { DomainEvent } from './domain-event';
import { Entity } from './entity';

export abstract class AggregateRoot<T> extends Entity<T> {
  events: DomainEvent[] = [];

  addEvent(event: DomainEvent) {
    this.events.push(event);
  }

  clearEvents() {
    this.events = [];
  }
}
