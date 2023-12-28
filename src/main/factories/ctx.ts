import AccountRepository from "../../@core/transactions/infra/database/mikro-orm/repositories/account";
import { DbSetMikroOrm } from "../../@core/commom/infra/database/mikro-orm/unit-of-work";

export class DbSetFactory {
    static create() {
        const dbSet = new DbSetMikroOrm()

        dbSet.registerRepository('account', AccountRepository)

        return dbSet
    }
}
