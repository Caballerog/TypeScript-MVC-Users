/**
 * @class Model
 *
 * Manages the data of the application.
 */

import { uuidv4 } from '../utils/util';

export class Challenge {
  public id: string;
  public name: string;
  public winLossRecord: string;
  public online: boolean;

  constructor(
    { name, winLossRecord, online } = {
      name: null,
      winLossRecord: null,
      online: false
    }
  ) {
    this.id = uuidv4();
    this.name = name;
    this.winLossRecord = winLossRecord;
    this.online = online;
  }
}
