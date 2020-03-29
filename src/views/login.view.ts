interface Input {
    email: string;
    password: string;
}
export class LoginView {
    private app: HTMLElement;

    constructor() {
        this.app = document.getElementById('root');

        const html = `
            <form id='loginForm' method='post'>
                <h1>Login</h1>
                <div>
                    <input name='email' type='text' placeholder='Email' />
                </div>
                <div>
                    <input name='password' type='password' placeholder='Password' />
                </div>
                <div>
                    <button type='submit'>Login</button>
                </div>
            </form>
        `;
        this.app.innerHTML = html;
        
        document.getElementById('loginForm')
            .addEventListener('submit', event => {
                //event.preventDefault(); -- actually post is handy, no need for ajax call
                const { origin, pathname } = location;
                setTimeout(()=>{ 
                    // timeout is temporary hack pending server auth implementation
                    location.replace(origin+pathname+'?page=signup');
                })
        });

    //    this._temporaryAgeText = '';
    //    this._initLocalListeners();
    }
}
