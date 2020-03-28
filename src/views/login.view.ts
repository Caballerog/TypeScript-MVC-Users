interface Input {
    email: string;
    password: string;
}
export class LoginView {
    private app: HTMLElement;
    private form: HTMLElement;
    private submitButton: HTMLElement;
    private inputEmail: HTMLInputElement;
    private inputPassword: HTMLInputElement;
    private title: HTMLElement;

    constructor() {
        this.app = document.querySelector('#root');

        this.form = document.createElement('form');
        this.inputEmail =
            Object.assign(document.createElement('input'), 
                { type: 'text', placeholder: 'Email' });
        this.inputPassword =
            Object.assign(document.createElement('input'), 
                { type: 'password', placeholder: 'Password' });
        this.submitButton = 
            Object.assign(document.createElement('button'), 
                { type: 'submit', textContent: 'Login' });
        this.form.append(
            this.inputEmail, 
            this.inputPassword, 
            this.submitButton);

        this.title = document.createElement('h1');
        this.title.textContent = 'Login';
        this.app.append(this.title, this.form);    

        this.form.addEventListener('submit', event => {
            event.preventDefault();
            const { origin, pathname } = location;
            location.replace(origin+pathname+'?page=signup');
        });
            
    //    this._temporaryAgeText = '';
    //    this._initLocalListeners();
    }
}
