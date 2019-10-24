import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserView } from './views/user.view';

const app = new UserController(new UserService(), new UserView());
