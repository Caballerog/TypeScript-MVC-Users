/**
 * @interface Exercise
 *
 * Defines challenge exercise being played
 */

import { uuidv4 } from '../utils/util';

export interface Exercise {
    id : string;
    title : string;
    prompt : string;
    level : string;
    estimatedTime : number; // minutes
    availableBudget : number; // $
    highBudget : number;
    lowBudget : number;
    tokens : Token[];
}

// Alias defined to help document code
export type TokenID = string;

export interface Token {
    id : TokenID;
    token : string; // Text or word or symbol; 
                    // or label like 'var' or 'ident' for identifiers
    type : 'keyword' | 'symbol' | 'identifier' | 'literal';
}

export interface ExerciseToken extends Token {
    cost : number;
}

