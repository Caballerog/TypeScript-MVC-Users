import { HandleAddUser } from "../controllers/signup.controller";
import { UserInfo } from "../models/user.model";

interface Input {
    name: string;
    email: string;
    password: string;
}
export class SignupView {
    private app: HTMLElement;
    private form: HTMLElement;
    private submitButton: HTMLElement;
    private inputName: HTMLInputElement;
    private inputEmail: HTMLInputElement;
    private inputPassword: HTMLInputElement;
    private title: HTMLElement;

    constructor() {
        this.app = document.getElementById('root')
            const html=`
            <div class='formCenter'>
                <form id='Signup'>
                    <div class = 'box'>
                        <img src="/Users/pseba/Desktop/codeblitzz/src/images/manzana.png" border="1" alt="Red Apple">
                        <img src="Codeblitz.png" border="1" alt="blitz icon" width="400" height="300">
                        <h1>Code Blitz Signup</h1>
                        <div>
                            <img src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/user-512.png" alt="user Icon" width="20" height="20">
                            <input name='name' type='text' placeholder='Name' />            
                        </div>
                        <div>
                            <img src="http://icons.iconarchive.com/icons/custom-icon-design/mono-general-2/512/mail-icon.png" alt="Mail Icon" width="20" height="20">
                            <input name='email' type='text' placeholder='Email' />
                        </div>
                        <div>
                            <img src="https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/lock-24-512.png" alt="Lock Icon" width="20" height="20">
                            <input name='password' type='password' placeholder='Password' />
                        </div>
                        <div>
                            <button type='submit'>Let's Code!</button>
                        </div>
                    </div>
                </form>
            </div>
        `;
        this.app.innerHTML = html;
    }

    public bindAddUser(handler: HandleAddUser) {
        document.getElementById('Signup')
            .addEventListener('submit', event => {
                event.preventDefault();
                const fields = document.forms['Signup'].elements;
                handler(new UserInfo(
                    fields[0].value, // name
                    fields[1].value, // email
                    fields[2].value // password
                ));
            });
    }
} 