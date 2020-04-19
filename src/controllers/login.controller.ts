import { UserService } from '../services/user.service';
import { LoginView } from '../views/login.view';

export type HandleLoginUser = typeof LoginController.prototype.handleLoginUser;

export class LoginController
{
    constructor(private userService:UserService, private loginView:LoginView)
    {
        this.loginView.bindLoginUser(this.handleLoginUser);
    }

    handleLoginUser = (userInfo) => {
        this.userService.findUser(userInfo)
        .then(res => {
            const {origin, pathname } = location;
            if (res._id)
                location.replace(origin+pathname+'?page=home&session_id='+res._id);
            else
                throw res;
        })
        .catch(reason => {
            alert('Failed to login; reason=Login credentials not found.')
        });
    }
}