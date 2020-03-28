import { Challenge } from '../models/challenge.model';

/**
 * @class Service
 *
 * Manages the data of the application.
 */
export class ChallengeService {
  public users: Challenge[];
  private onUserListChanged: Function;

  constructor() {
    const users: Challenge[] = JSON.parse(localStorage.getItem('users')) || [];
    this.users = users.map(user => new Challenge(user));
  }

  bindUserListChanged(callback: Function) {
    this.onUserListChanged = callback;
  }

  _commit(users: Challenge[]) {
    this.onUserListChanged(users);
    localStorage.setItem('users', JSON.stringify(users));
  }

  add(user: Challenge) {
    this.users.push(new Challenge(user));

    this._commit(this.users);
  }

  edit(id: string, userToEdit: Challenge) {
    let user = this.users
      .find(({id:user_id})=>user_id===id);
    Object.assign(user,userToEdit);

    this._commit(this.users);
  }

  delete(_id: string) {
    this.users = this.users.filter(({ id }) => id !== _id);

    this._commit(this.users);
  }

  toggle(_id: string) {
    this.users = this.users.map(user =>
      user.id === _id ? new Challenge({ ...user, online: !user.online }) : user
    );

    this._commit(this.users);
  }
}
