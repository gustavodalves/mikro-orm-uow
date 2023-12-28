import { UnitOfWork } from "./unit-of-work.interface";

export default interface UnitOfWorkFactory {
    create(): UnitOfWork
}
