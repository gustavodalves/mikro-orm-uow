import { AccountSchema } from "./@core/transactions/infra/database/mikro-orm/schemas/account.schema";

export default {
    entities: [
      AccountSchema
    ],
    dbName: 'test',
    host: 'localhost',
    user: 'root',
    password: 'admin',
    type: 'mysql',
    port: '3308'
};
  