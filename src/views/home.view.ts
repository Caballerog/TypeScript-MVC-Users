interface Input {
    email: string;
    password: string;
}
export class HomeView {
    private app: HTMLElement;
    private challengeButton: HTMLElement;
    private singlePlayButton: HTMLElement;
    private title: HTMLElement;

    constructor() {
        this.app = document.querySelector('#root');

        this.challengeButton = 
            Object.assign(document.createElement('button'), 
                { textContent: 'Challenge' });
        this.singlePlayButton = 
            Object.assign(document.createElement('button'), 
                { textContent: 'Single Play' });

        this.title = document.createElement('h1');
        this.title.textContent = 'Code Blitz';
        this.app.append(this.title, this.challengeButton, this.singlePlayButton);    

        this.challengeButton.addEventListener('click', event => {
            const { origin, pathname } = location;
            location.replace(origin+pathname+'?page=challenge');
        });

        this.singlePlayButton.addEventListener('click', event => {
            alert('not yet implemented')
        });
        
    //    this._temporaryAgeText = '';
    //    this._initLocalListeners();
    }
}
