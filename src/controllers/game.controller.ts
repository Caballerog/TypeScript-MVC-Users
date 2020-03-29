import { GameToken } from '../models/client.game.model';
import { GameService } from '../services/game.service';
import { GameView } from '../views/game.view';

/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
export class GameController {
  constructor(private gameService: GameService, private gameView: GameView) {
    // Explicit this binding
    this.gameService.bindConveyorChanged(this.onConveyorChanged);
    

    // Display initial users
    // this.onUserListChanged(this.userService.users);
  }

  onConveyorChanged = (tokens: GameToken[]) => {
    this.gameView.displayConveyor(tokens);
  };
}
