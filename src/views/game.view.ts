import { GameToken, GameTokens, Location } from '../models/client.game.model';


export class GameView {
    private app: HTMLElement;
    private ulConveyor : HTMLUListElement;

    constructor() {
        this.app = document.getElementById('root');

        const html = `
            <h1>Game Page</h1>
            <div>
                <h2>Conveyor</h2>
                <ul id='conveyor' />
            </div>
            <div>
                <h2>Token Bank</h2>
                <ul id='token bank' />
            </div>
            <div>
                <h2>Code</h2>
                <ul id='code' />
            </div>
        `;
        this.app.innerHTML = html;
        this.ulConveyor = document.getElementById('token bank') as HTMLUListElement;
    }

    public displayConveyor(tokens : GameToken[]) {
        // clear any prior tokens
        this.ulConveyor.innerText = '';
        tokens.forEach((token) => {
            const li = document.createElement('li') as HTMLLIElement;
            li.innerText = token.token;
            this.ulConveyor.appendChild(li);
        });
    }
}
