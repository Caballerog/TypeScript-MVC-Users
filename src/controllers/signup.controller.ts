import { UserService } from '../services/user.service';
import { SignupView } from '../views/signup.view';

export type HandleAddUser = typeof SignupController.prototype.handleAddUser;

export class SignupController 
{
    constructor(private userService:UserService, private signupView:SignupView)
    {
        this.signupView.bindAddUser(this.handleAddUser);   
    }

    handleAddUser = (userInfo) => 
    {
        this.userService.addUser(userInfo)
        .then(res => {
            const { origin, pathname } = location;
            if (res._id)
                location.replace(origin+pathname+'?page=home&session_id='+res._id);
            else
              throw res;
        })
        .catch(reason=>{
            alert(`Failed to create new user; reason=${JSON.stringify(reason)}`);
        });
    };
}