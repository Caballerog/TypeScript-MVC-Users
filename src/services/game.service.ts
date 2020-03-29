import { TokenID, GameToken, GameTokens, Location } from '../models/client.game.model';
import { sampleGameTokens } from '../models/client.game.mock';
import { TokenID } from '../models/exercise.model';

type OnTokenArrayChanged = (x : GameToken[]) => (void);

/**
 * @class Service
 *
 * Manages the data of the application.
 */
export class GameService {
  private tokens : GameTokens;
  private tokenLocationArray : {
    [location:string/*Location*/] : TokenID[]
  } = {  
    // careful, 'location' key not validated by TS at present...
    'conveyor' : [],
    'token bank' : [],
    'code' : []
  };

  private onConveyorChanged : OnTokenArrayChanged;
  private onTokenBankChanged : OnTokenArrayChanged;
  private onCodeChanged : OnTokenArrayChanged;

  constructor() {
    // Initially load of all game tokens to 
    // the central game token storage object
    // with a location setting of conveyor...
    this.tokens = sampleGameTokens.reduce(
      (result,exerciseToken) => {
        result[exerciseToken.id] 
          = { ...exerciseToken,location: 'conveyor' }
        return result;
      }, {} as GameTokens);
    // ... and reference all tokens in the ordered
    // conveyor array...
    this.tokenLocationArray['conveyor'] = Object.keys(this.tokens);
  }

  public bindConveyorChanged(callback: OnTokenArrayChanged) {
    this.onConveyorChanged = callback;
    // Trigger view population on bind
    this.commit(['conveyor']);
  }

  commit(locations : Location[]) {
    locations.forEach((location : Location) => {
      switch (location) {
        case 'conveyor':
          this.onConveyorChanged(
            this.tokenLocationArray[location].map(tokenID=>this.tokens[tokenID])
          );
          break;
      }
    });
  }

}
