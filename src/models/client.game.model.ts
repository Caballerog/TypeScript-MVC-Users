import { Token, TokenID } from './exercise.model';

// One repository for tokens (with three location states)
// may help avoid invalid duplication or ommission of tokens
// within the three possible locations by allowing us to
// compare this central state with inclusion within the three
// location collections...  Note: we never add or remove
// tokens from the tokenLocation collection...
interface GameToken extends Token {
    location : 'conveyor' | 'bank' | 'code';
}

// Store game tokens in an object 
// for rapid key-value access...
export interface GameTokens {
    [id:string/*TokenID*/] : GameToken;
}

export type TokenCollection = TokenID[];