/**
 * @class Model
 *
 * Manages the data of the application.
 */

export interface UserDto {
  name: string;
  age: string;
  complete: boolean;
}

export class User {
  public id: string;
  public name: string;
  public age: string;
  public complete: boolean;

  constructor(
    { name, age, complete }: UserDto = {
      name: null,
      age: null,
      complete: false
    }
  ) {
    this.id = this.uuidv4();
    this.name = name;
    this.age = age;
    this.complete = complete;
  }

  uuidv4(): string {
    return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(
      /[018]/g,
      (c: number) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
  }
}
