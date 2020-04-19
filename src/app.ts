import { ChallengeController } from './controllers/challenge.controller';
import { ChallengeService } from './services/challenge.service';
import { ChallengeView } from './views/challenge.view';
import { LoginView } from './views/login.view';
import { LoginController } from './controllers/login.controller';
import { SignupView } from './views/signup.view';
import { UserService } from './services/user.service';
import { SignupController } from './controllers/signup.controller';
import { HomeView } from './views/home.view';
import { HomeController } from './controllers/home.controller';
import { GameView } from './views/game.view';
import { GameService } from './services/game.service';
import { GameController } from './controllers/game.controller';

export type Page = 'login' | 'signup' | 'home' | 'challenge' | 'game' | 'demo'; 

// REVIEW: Most specific type found so far since:
// classes are functions, and functions are objects in js...
// (Class instances are not defined as function subtypes though,
//  and lack bind(), call(), etc...)
let app : object; 

const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get('page');
const session_id = urlParams.get('session_id');

switch (page) {
    case 'signup':
        app = new SignupController(new UserService(), new SignupView());
        break;
    case 'home':
        app = new HomeController(session_id, new HomeView());
        break;
    case 'challenge':
        app = new ChallengeController(
            session_id, 
            new ChallengeService(), 
            new ChallengeView() );
        break;
    case 'game':
        app = new GameController(new GameService(), new GameView());
        break;
    case 'demo':
        break;        
    case 'login':
        app = new LoginController(new UserService(), new LoginView());
        break;
    default:
        const { origin, pathname } = location;
        // redirect bad/missing page params to login
        location.replace(origin+pathname+'?page=login'); 
    break;
}
