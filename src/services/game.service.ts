import { GameToken, GameTokens, Location } from '../models/client.game.model';
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
  } = {};

  private onTokenLocationChanged : {
    [location:string/*Location*/] : OnTokenArrayChanged
  } = {};

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

  public bindTokenLocationChanged(
      tokenLocation: Location, callback: OnTokenArrayChanged) {
    this.onTokenLocationChanged[tokenLocation] = callback;
    // Trigger view population on bind
    if (tokenLocation==='conveyor')
      this.commit([tokenLocation]);
  }

  commit(locations : Location[]) {
    locations.forEach((location : Location) => {
      this.onTokenLocationChanged[location](
        this.tokenLocationArray[location].map(tokenID=>this.tokens[tokenID])
      );
    });
  }

}
