import { GameToken, GameTokens, Location, locations } 
  from '../models/client.game.model';
import { Fetch } from '../utils/Fetch';
// import { sampleGameTokens } from '../models/client.game.mock';
import { TokenID, ExerciseToken, Exercise } from '../models/exercise.model';

type Direction = 1 | -1;

export type HandleMoveToken = typeof GameService.prototype.moveToken;

type OnTokenArrayChanged = (x : GameToken[]) => (void);

/**
 * @class Service
 *
 * Manages the data of the application.
 */
export class GameService {
  private tokens : GameTokens = {};
  private tokenLocationArray : {
    [location:string/*Location*/] : TokenID[]
  } = {};

  private onTokenLocationChanged : {
    [location:string/*Location*/] : OnTokenArrayChanged
  } = {};

  constructor() {
    // Initialize location arrays...
    locations.forEach((location)=> {
      this.tokenLocationArray[location] = []; // initialize arrays
    });

    Fetch('/token')
      .then(res => res && res.json())
      .then( (exerciseTokens : Array<ExerciseToken>) => {
        // Load all game tokens to
        // the central game token storage object
        // with a location setting of conveyor...
        this.tokens = exerciseTokens.reduce(
          (result,exerciseToken,index) => {
            result[exerciseToken.id] 
              = { ...exerciseToken, 
                  location: 'conveyor'
                }
            return result;
          }, {} as GameTokens
        );
        this.refreshLocationArrays();
        this.commit(locations);
      });
  }

  public bindTokenLocationChanged(
    tokenLocation: Location, 
    callback: OnTokenArrayChanged
  ) {
    this.onTokenLocationChanged[tokenLocation] = callback;
    // Trigger view refresh on bind
    this.commit([tokenLocation]);
  }

  private refreshLocationArrays() {
    let allIDsToProcess = new Set(Object.keys(this.tokens));

    // Remove any location array entries that have moved
    locations.forEach((location) => {
      // Check existing entries for removal or confirmation
      [...this.tokenLocationArray[location]].forEach( (tokenID,index) => {
        if (this.tokens[tokenID].location===location) {
          // Token is confirmed in proper location, so do nothing 
          // except remove from to-process set
          if (!allIDsToProcess.delete(tokenID))
            // Hopefully the following will never occur,
            // even though our algorithm is 'self healing' in that
            // it guarantees we will be restored to a valid state.
            alert(`Assertion that tokens should be in only one location FAILED for id ${tokenID}!`)
        } else {
          // Token must have moved, so remove from this (obsolete) location
          console.log(`--- location: ${location}`);
          console.log(this.tokenLocationArray[location].join());
          this.tokenLocationArray[location].splice(index,1);
          console.log(this.tokenLocationArray[location].join());
        }
      });
    });
 
    // Add any unconfirmed IDs to their proper location arrays (append to end)
    allIDsToProcess.forEach((tokenID) => {
      this.tokenLocationArray[this.tokens[tokenID].location].push(tokenID);
      // allIDsToProcess.delete(tokenID); -- not needed since we process all, and we are done
    });
  }

  public moveToken(tokenID : TokenID, direction : Direction)
  {
    const oldLocation = this.tokens[tokenID].location;
    let newPos = locations.indexOf(oldLocation) + direction;

    // Check boundaries
    if (newPos < 0 || newPos >= locations.length)
//      alert('Assertion FAILED that tokens not be moved beyond location positions'
//      +` 0, 1, and 2; tried to move token ID ${tokenID} to position #${newPos}`);
      newPos = locations.indexOf(oldLocation) - direction; // help w/ testing...
//    else { ...
      // Boundary checks out OK, proceed to move
      const newLocation = locations[newPos];
      // alert(`tokenID=${tokenID}, direction=${direction}, from=${oldLocation} to ${newLocation}`);
      this.tokens[tokenID].location = newLocation;
      this.refreshLocationArrays();
      this.commit([oldLocation,newLocation]);
//    } ...
    return;
  }

  private commit(locations : Location[]) {
    locations.forEach((location : Location) => {
      this.onTokenLocationChanged[location](
        this.tokenLocationArray[location].map(tokenID=>this.tokens[tokenID])
      );
    });
  }
}