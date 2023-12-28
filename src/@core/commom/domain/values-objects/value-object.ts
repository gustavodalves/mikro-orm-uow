export abstract class ValueObject<T> {
    protected readonly _value: T;
  
    constructor(value: T) {
      this._value = value;
    }
  
    get value(): T {
      return this._value;
    }
}
  