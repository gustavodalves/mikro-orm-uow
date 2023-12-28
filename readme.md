# TypeScript Reimplementation of Unit of Work with Mikro ORM

This project is a simple reimplementation of the Unit of Work pattern in TypeScript, utilizing Mikro ORM for database operations. The primary goal is to provide a straightforward example of using the Unit of Work pattern with Mikro ORM in a TypeScript environment. Note that this project does not focus on implementing a specific software architecture or Domain-Driven Design (DDD) principles.

## Unit of Work Pattern

The Unit of Work pattern is a design pattern that provides a way to maintain the integrity and consistency of a set of operations. While commonly associated with databases, it's important to note that the Unit of Work pattern is more general and can be applied to various contexts beyond databases.

### Why Unit of Work?

- **Consistency**: Ensures that changes to a system are consistent and coherent, promoting reliability in the face of failures.

- **Transaction Control**: Manages a group of operations effectively, providing a mechanism for rollback on failure, even in non-database contexts.

- **Concurrency Control**: In a multi-user or concurrent environment, the Unit of Work pattern helps control access to resources, avoiding conflicts and ensuring data integrity.

- **Connection Management**: The Unit of Work also manages the connection to the database, providing a centralized control point for transactional operations.

### Repository Pattern

The Repository pattern provides an abstraction layer over the data access logic, offering a clean and consistent API for accessing and manipulating data. Repositories encapsulate the details of data storage and retrieval, promoting a separation of concerns in the application.

### Unit of Work and Repository Integration

In this project, the Unit of Work (`uow`) is utilized alongside the Repository pattern to manage the connection to the database within a specific context. The `OpenAccountUseCase` class, however, remains oblivious to the intricacies of connection management.

### Usage in OpenAccountUseCase

```typescript
import UnitOfWorkFactory from "../../../common/app/uow/unit-of-work-factory";
import { Account } from "../../domain/models/account";

export class OpenAccountUseCase {
    constructor(
        private readonly uowFactory: UnitOfWorkFactory
    ) {}

    async execute(
        name: string,
    ) {
        const uow = this.uowFactory.create(); // Creating a new Unit of Work instance

        try {
            const accountRepository = uow.getRepository('account'); // Getting the repository for the 'account' entity

            const account = Account.openNewAccount(name); // Creating a new account

            await accountRepository.add(account); // Adding the new account to the repository

            await uow.commit(); // Committing the changes to the database
        } catch (err) {
            await uow.rollback(); // Rolling back the transaction in case of an error
        }
    }
}
```
The OpenAccountUseCase focuses solely on business logic, creating and managing accounts, without any explicit knowledge of the underlying connection management performed by the Unit of Work. This separation of concerns enhances code maintainability and readability.
