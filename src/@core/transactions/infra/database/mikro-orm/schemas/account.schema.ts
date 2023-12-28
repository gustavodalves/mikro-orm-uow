import { EntitySchema } from "@mikro-orm/core";
import { Account } from "../../../../domain/models/accouint";
import { UUIDSchemaType } from "./types/uuid";

export const AccountSchema = new EntitySchema<Account>({
    class: Account,
    properties: {
      id: { type: 'string', primary: true, customType: new UUIDSchemaType() },
      name: { type: 'string', length: 255 },
      balance: { type: 'number' },
    },
});
