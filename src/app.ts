import { ChallengeController } from './controllers/challenge.controller';
import { ChallengeService } from './services/challenge.service';
import { ChallengeView } from './views/challenge.view';
import { LoginView } from './views/login.view';
import { SignupView } from './views/signup.view';
import { HomeView } from './views/home.view';
import { GameView } from './views/game.view';
import { GameService } from './services/game.service';
import { GameController } from './controllers/game.controller';

export type Page = 'login' | 'signup' | 'home' | 'challenge' | 'game' | 'demo'; 

let app /* : BaseController */;

const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get('page');

switch (page) {
    case 'signup':
        app = new SignupView();
        break;
    case 'home':
        app = new HomeView();
        break;
    case 'challenge':
        app = new ChallengeController(new ChallengeService(), new ChallengeView());
        break;
    case 'game':
        app = new GameController(new GameService(), new GameView());
        break;
    case 'demo':
        break;        
    case 'login':
        app = new LoginView();
        break;
    default:
        const { origin, pathname } = location;
        // redirect bad/missing page params to login
        location.replace(origin+pathname+'?page=login'); 
    break;
}
