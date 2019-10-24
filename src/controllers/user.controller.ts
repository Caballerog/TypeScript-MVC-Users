import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { UserView } from '../views/user.view';

/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
export class UserController {
  constructor(private userService: UserService, private userView: UserView) {
    // Explicit this binding
    this.userService.bindUserListChanged(this.onUserListChanged);
    this.userView.bindAddUser(this.handleAddUser);
    this.userView.bindEditUser(this.handleEditUser);
    this.userView.bindDeleteUser(this.handleDeleteUser);
    this.userView.bindToggleUser(this.handleToggleUser);

    // Display initial users
    this.onUserListChanged(this.userService.users);
  }

  onUserListChanged = (users: User[]) => {
    this.userView.displayUsers(users);
  };

  handleAddUser = (user: User) => {
    this.userService.add(user);
  };

  handleEditUser = (id: string, user: User) => {
    this.userService.edit(id, user);
  };

  handleDeleteUser = (id: string) => {
    this.userService.delete(id);
  };

  handleToggleUser = (id: string) => {
    this.userService.toggle(id);
  };
}
