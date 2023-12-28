import UUID from './values-objects/uuid';

export interface DomainEvent {
  aggregateId: UUID;
  occurredOn: Date;
  eventVersion: number;
}
