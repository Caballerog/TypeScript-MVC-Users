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
        this.app = document.getElementById('root');

        const html = `
        <div class='formCenter'>
            <form id='homePage' method='post'>
                <div class = 'box'>
                    <img src="http://icon-library.com/images/blitz-icon/blitz-icon-18.jpg" alt="Blitz Icon" width="128" height="128">
                    <h1>Code Blitz</h1>
                    <div>
                        <button id='challenge' type='submit'>Challenge</button>
                        <button id='singlePlay' type='submit'>Single Play</button>
                    </div> 
                </div>
            </form>
        </div>
        `;
        this.app.innerHTML = html;

        document.getElementById('homePage')
            .addEventListener('submit', event => {
                //event.preventDefault(); -- actually post is handy, no need for ajax call
                const { origin, pathname } = location;
                setTimeout(()=>{ 
                    // timeout is temporary hack pending server auth implementation
                    location.replace(origin+pathname+'?page=challenge');
                })
        });

        document.getElementById('singlePlay')
        .addEventListener('click', event => {
            alert('not yet implemented')
        });
        
    //    this._temporaryAgeText = '';
    //    this._initLocalListeners();
    }
}