import UnitOfWorkFactory from "../../../commom/app/uow/unit-of-work-factory";
import { Account } from "../../domain/models/accouint";

export class OpenAccountUseCase {
    constructor(
        private readonly uowFactory: UnitOfWorkFactory
    ) {}

    async execute(
        name: string,
    ) {
        const uow = this.uowFactory.create()
        try {
            const accountRepository = uow.getRepository('account')
            const account = Account.openNewAccount(name)
            await accountRepository.add(account)
            await uow.commit()
        } catch(err) {
            await uow.rollback()
        }
    }
}
