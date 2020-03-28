/**
 * @class Model
 *
 * Manages the data of the application.
 */

import { uuidv4 } from '../utils/util';

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
    this.id = uuidv4();
    this.name = name;
    this.age = age;
    this.complete = complete;
  }
}
