import { Type, Platform, EntityProperty } from "@mikro-orm/core";
import Uuid from "../../../../../../commom/domain/values-objects/uuid";

export class UUIDSchemaType extends Type<Uuid, string> {
    convertToDatabaseValue(
      valueObject: Uuid,
      platform: Platform,
    ): string {
      return valueObject instanceof Uuid
        ? valueObject.value
        : (valueObject as string);
    }
    convertToJSValue(value: string, platform: Platform): Uuid {
      return new Uuid(value);
    }
  
    getColumnType(prop: EntityProperty, platform: Platform) {
      return 'varchar(36)';
    }
  }