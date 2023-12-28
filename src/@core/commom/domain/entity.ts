import UUID from "./values-objects/uuid";

type WithUUID = {
    id: string
}

export abstract class Entity<T> {
    constructor(
        protected readonly id: UUID
    ) {}
  
    abstract toJSON(): WithUUID & T;
}
  