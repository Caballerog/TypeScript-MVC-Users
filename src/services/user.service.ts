import { UserInfo } from '../models/user.model'
import { Fetch } from '../utils/Fetch';

export class UserService {
    public addUser(userInfo:UserInfo)
    {
        return Fetch('/user', {
            method: 'POST',
            body: JSON.stringify(userInfo)
        })
        .then( res => res && res.json() );
    }

    public findUser(userInfo:UserInfo)
    {
        return Fetch('/user/'+userInfo.email+'.'+userInfo.password, {
            method: 'GET',
        })
        .then(res => res && res.json());
    }
}
