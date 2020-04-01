import { GameToken, Location, locations } from '../models/client.game.model';
import { HandleMoveToken } from '../services/game.service';


export class GameView {
    private app: HTMLElement;

    private ulTokens : {
        [location:string/*Location*/] : HTMLUListElement
    } = {};

    constructor() {
        this.app = document.getElementById('root');

        const html = `
            <div class='game-page'>
                <h1>Game Page</h1>
                <div class='token-container'>
                    <h2>Conveyor</h2>
                    <ul id='conveyor' />
                </div>
                <div class='code-editor'>
                    <h2>Code</h2>
                    <ul id='code' />
                </div>
                <div class='token-container'>
                    <h2>Token Bank</h2>
                    <ul id='token_bank' />
                </div> 
            </div>
        `;
        this.app.innerHTML = html;

        locations.forEach((location)=>{
            this.ulTokens[location] 
                = document.getElementById(
                    location.replace(' ','_') // spaces not valid in HTML IDs
                ) as HTMLUListElement;
        })
    }

    public bindMoveToken(handler: HandleMoveToken) {
        locations.forEach((location) => {
            this.ulTokens[location].addEventListener('click', 
            event => {
                handler((event.target as HTMLUListElement).id,1);
            });
        });
    }
    
    public display(location : Location, tokens : GameToken[]) {
        // clear any prior tokens
        this.ulTokens[location].innerText = '';
        tokens.forEach((token) => {
            const li = document.createElement('li') as HTMLLIElement;
            li.id = token.id;
            li.innerText = token.token + ' (id='+token.id+')';
            this.ulTokens[location].appendChild(li);
        });
    }
}
