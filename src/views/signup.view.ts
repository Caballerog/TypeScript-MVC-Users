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
                <form id='Signup' method='post'>
                    <div class = 'box'>
                        <img src="http://icon-library.com/images/blitz-icon/blitz-icon-18.jpg" alt="Blitz Icon" width="128" height="128">
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
        this.app.innerHTML =html;

        document.getElementById('Signup')
            .addEventListener('submit', event => {
                //event.preventDefault(); -- actually post is handy, no need for ajax call
                const { origin, pathname } = location;
                setTimeout(()=>{ 
                    // timeout is temporary hack pending server auth implementation
                    location.replace(origin+pathname+'?page=home');
                })
        });
            
    //    this._temporaryAgeText = '';
    //    this._initLocalListeners();
    }
}