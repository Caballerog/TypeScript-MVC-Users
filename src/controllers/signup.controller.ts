import { UserService } from '../services/user.service';
import { SignupView } from '../views/signup.view';

export type HandleAddUser = typeof SignupController.prototype.handleAddUser;

export class SignupController {
    constructor(private userService:UserService, private signupView:SignupView)
    {
        this.signupView.bindAddUser(this.handleAddUser);   
    }

    handleAddUser = (userInfo) => {
        this.userService.addUser(userInfo).then(res => {
            const { origin, pathname } = location;
            location.replace(origin+pathname+'?page=home&_id='+res._id);
        })
    };
}