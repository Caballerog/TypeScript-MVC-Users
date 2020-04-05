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
            <form id='loginForm' method='post'>
                <div class = 'box'>
                    <img src="http://icon-library.com/images/blitz-icon/blitz-icon-18.jpg" alt="Blitz Icon" width="128" height="128">
                    <h1>Clode Blitz</h1>
                    <div>
                        <img src="http://icons.iconarchive.com/icons/custom-icon-design/mono-general-2/512/mail-icon.png" alt="Mail Icon" width="20" height="20">
                        <input name='email' type='text' placeholder='Email' />
                    </div>
                    <div>
                        <img src="https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/lock-24-512.png" alt="Lock Icon" width="20" height="20">
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
        
        document.getElementById('loginForm')
            .addEventListener('submit', event => {
                //event.preventDefault(); -- actually post is handy, no need for ajax call
                const { origin, pathname } = location;
                setTimeout(()=>{ 
                    // timeout is temporary hack pending server auth implementation
                    location.replace(origin+pathname+'?page=signup');
                })
        });

    //    this._t emporaryAgeText = '';
    //    this._initLocalListeners();
    }
}