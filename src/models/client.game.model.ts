import { ExerciseToken /*, TokenID*/ } from './exercise.model';

// TODO: Check out TypeScript enum as it may cover both of the following...
export type Location = 'conveyor' | 'token bank' | 'code';
export const locations : Location[] = [ 'conveyor', 'token bank', 'code' ];

// One repository for tokens (with three location states)
// may help avoid invalid duplication or ommission of tokens
// within the three possible locations by allowing us to
// compare this central state with inclusion within the three
// location collections...  Note: we never add or remove
// tokens from the tokenLocation collection...
export interface GameToken extends ExerciseToken {
    location : Location;
}

// Store game tokens in an object 
// for rapid key-value access...
export interface GameTokens {
    [id:string/*TokenID*/] : GameToken;
}

