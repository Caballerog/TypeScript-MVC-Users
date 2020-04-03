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
        this.app = document.getElementById('root');
 
            const html = `
            <form id='signupForm' method='post'>
                <h1>Signup</h1>
                <div>
                    <input name='name' type='text' placeholder='Name' />
                </div>
                <div>
                    <input name='email' type='text' placeholder='Email' />
                </div>
                <div>
                    <input name='password' type='password' placeholder='Password' />
                </div>
                <div>
                    <button type='submit'>Let's Code!</button>
                </div>
            </form>
            `;
            this.app.innerHTML = html;

        document.getElementById('signupForm')

            .addEventListener('submit', event => {
                //event.preventDefault(); -- actually post is handy, no need for ajax call
                const { origin, pathname } = location;
                setTimeout(()=>{ 
                    // timeout is temporary hack pending server auth implementation
                    location.replace(origin+pathname+'?page=home');
                })
            });
    }
}
