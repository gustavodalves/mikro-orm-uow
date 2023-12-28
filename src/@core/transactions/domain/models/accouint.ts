import { AggregateRoot } from "../../../commom/domain/aggregate-root";
import UUID from "../../../commom/domain/values-objects/uuid";

export class Account extends AggregateRoot<{
    balance: number,
    name: string
}> {
    constructor(
        id: UUID,
        public balance: number,
        public name: string
    ) {
        super(id)
    }

    static openNewAccount(
        name: string
    ) {
        return new Account(
            new UUID,
            0,
            name
        )
    }

    toJSON(): { id: string; } & { balance: number; name: string; } {
        return {
            id: this.id.value,
            balance: this.balance,
            name: this.name
        }
    }
}
