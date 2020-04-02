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
                <div class='flex5'>
                    <div id='prompt'>git PROMPT: Write a program to print out 10 numbers</div>
                    <div id='language'>Javascript</div>                    
                    <div id='budget'>CREDIT &nbsp;<b>$5.12</b></div>
                    <div id='timer'>TIMER &nbsp;<b>3:07</b></div>
                </div>
                <div class='conveyor-container'>
                    <ul id='conveyor' />
                </div>
                <div class='flex2'>
                    <div class='flex3'>
                        <div class='code-editor'>
                            <ul id='code' />
                        </div>
                        <div id='label'>Token Bank</div>
                        <div class='token-container'>
                            <ul id='token_bank' />
                        </div> 
                    </div>
                    <div class='flex4'>
                        <div class='opponentStats'>
                        </div>
                        <div class='opponentCode'>
                        </div>
                        <div class='submitButton'><div class='submit'>SUBMIT</div>
                        </div>
                        <div class='flex6'>
                            <div class='flex7'>
                                <div id='label'>Return Token</div>
                                <div class='sellBack'>
                                </div>
                            </div>
                            <div class='flex8'>
                                <div class='budget'>
                                </div>
                            </div>
                        </div>
                    </div>
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
            li.innerText = token.token 
            li.type = token.type
            this.ulTokens[location].appendChild(li);
        });
    }
}
