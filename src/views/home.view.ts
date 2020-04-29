import { HandleStartPlay } from '../controllers/home.controller';

export class HomeView {
    private app: HTMLElement;

    constructor() {
        this.app = document.getElementById('root');

        const html = `
        <div class='formCenter'>
            <form id='homePage'>
                <div class = 'box'>
                    <img src="images/Codeblitz.png" alt="Blitz Icon" width="128" height="128">
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
    }

    public bindStartPlay(handler : HandleStartPlay) 
    {
        [...document.getElementsByTagName("button")]
            .forEach( (element : HTMLButtonElement) => {
                element.addEventListener('click', event => {
                    event.preventDefault();
                    const buttonID = 
                    ( ((event.target as HTMLButtonElement).id as any) as
                        // Satisfy Typescript handler prototype... :)
                        'challenge'|'singlePlay' ); 
                    handler(buttonID);
                })
            });
    }
}