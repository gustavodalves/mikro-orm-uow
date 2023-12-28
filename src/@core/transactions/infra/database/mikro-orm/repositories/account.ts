import { EntityManager } from "@mikro-orm/mysql";
import { Account } from "../../../../domain/models/accouint";
import { IRepository } from "../../../../../commom/domain/repository";

export default class AccountRepository implements IRepository<Account, any> {
    constructor(
        readonly em: EntityManager
    ) {}

    async add(entity: any): Promise<void> {
        this.em.persist(entity)
    }
}
