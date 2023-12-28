import { MikroORM, type MySqlDriver } from "@mikro-orm/mysql";
import config from "../mikro-orm.config";
import UnitOfWorkMikroOrmFactory from "../@core/commom/infra/database/mikro-orm/unit-of-work.factory";
import { OpenAccountUseCase } from "../@core/transactions/app/use-cases/open-account";
import { DbSetFactory } from "./factories/ctx";

async function main() {
    const orm = await MikroORM.init<MySqlDriver>(config as any)
    const em = orm.em.fork()

    const factory = new UnitOfWorkMikroOrmFactory(
        em,
        DbSetFactory.create()
    )

    const accountService = new OpenAccountUseCase(factory)

    accountService.execute('GUSTAVO DUARTE ALVES')
    accountService.execute('JULIANA')
}

main()
