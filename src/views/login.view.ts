import { HandleLoginUser } from "../controllers/login.controller";
import { UserInfo } from "../models/user.model";

interface Input {
    email: string;
    password: string;
}
export class LoginView {
    private app: HTMLElement;

    constructor() {
        this.app = document.getElementById('root');

        const html = `
        <div class='formCenter'>
            <form id='loginForm'>
                <div class = 'box'>

                    

                    <img src="images/Codeblitz.png" alt="code Blitz" width="150" height="127"/>
                    <h1>Code Blitz</h1>
                    <div>
                        <img src="images/user.png" alt="user icon"  width="20" height="20">
                        <input name='email' type='text' placeholder='Email' />
                    </div>
                    <div>
                        <img src="images/lock.png" alt="Lock Icon" width="20" height="20">
                        <input name='password' type='password' placeholder='Password' />
                    </div>
                    <div>
                        <button type='submit'>Sign In</button>
                    </div>
                    <div>
                        <p> Don't have an account? 
                        <a href="?page=signup" target ="_top" >Create an account</a>
                    </div>
                </div>
            </form>
        </div>
        `;
        
        this.app.innerHTML = html;
        /*
        //add under <div class = 'box'> in html section 
        
        <div id='timer'> </div>
        <button id="timer" onclick="stopClock()">Stop Time</button>
        
        //this timer stops - Leave this here
        var myVar = setInterval(myTimer, 1000);

        function myTimer() {
        var d = new Date();
        var t = d.toLocaleTimeString();
        document.getElementById("timer").innerHTML = t;
        }
        function stopClock(){
            clearInterval(myVar);
        }*/
    }
    
    public bindLoginUser(handler: HandleLoginUser)
    {
        document.getElementById('loginForm')
            .addEventListener('submit', event => {
                event.preventDefault();
                const fields = document.forms['loginForm'].elements;
                handler(new UserInfo(
                    "",
                    fields[0].value, // email
                    fields[1].value // password
                ));
            });
    }
}