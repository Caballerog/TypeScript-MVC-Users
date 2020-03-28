import { User, UserDto } from '../models/user.model';

/**
 * @class Service
 *
 * Manages the data of the application.
 */
export class ChallengeService {
  public users: User[];
  private onUserListChanged: Function;

  constructor() {
    const users: UserDto[] = JSON.parse(localStorage.getItem('users')) || [];
    this.users = users.map(user => new User(user));
  }

  bindUserListChanged(callback: Function) {
    this.onUserListChanged = callback;
  }

  _commit(users: User[]) {
    this.onUserListChanged(users);
    localStorage.setItem('users', JSON.stringify(users));
  }

  add(user: User) {
    this.users.push(new User(user));

    this._commit(this.users);
  }

  edit(id: string, userToEdit: User) {
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
      user.id === _id ? new User({ ...user, complete: !user.complete }) : user
    );

    this._commit(this.users);
  }
}
