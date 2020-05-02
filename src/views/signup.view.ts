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
                        
                        <img src="images/Codeblitz.png" alt="code Blitz" width="150" height="127"/>
                        <h1>Code Blitz Signup</h1>
                        <div>
                           
                            <img src="images/user.png" alt="user" width="20" height="20"/>
                            <input name='name' type='text' placeholder='Name' />            
                        </div>
                        <div>
                            <img src="images/mail.png" alt="Mail Icon" width="20" height="20">
                            <input name='email' type='text' placeholder='Email' />
                        </div>
                        <div>
                            <img src="images/lock.png" alt="Lock Icon" width="20" height="20">
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