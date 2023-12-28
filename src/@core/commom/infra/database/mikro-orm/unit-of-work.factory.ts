import { EntityManager } from '@mikro-orm/mysql';
import UnitOfWorkFactory from "../../../app/uow/unit-of-work-factory";
import { UnitOfWork } from "../../../app/uow/unit-of-work.interface";
import UnitOfWorkMikroOrm, { DbSetMikroOrm } from "./unit-of-work";

export default class UnitOfWorkMikroOrmFactory implements UnitOfWorkFactory {
    constructor(
        private readonly em: EntityManager,
        private readonly dbSet: DbSetMikroOrm
    ) {}
    create(): UnitOfWork {
        return new UnitOfWorkMikroOrm(this.em, this.dbSet)
    }
}