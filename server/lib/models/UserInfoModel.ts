import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserInfoSchema = new Schema({
    name: {
        type: String,
        required: 'Enter your display name'
    },
    password: {
        type: String,
        required: 'Enter a password'
    },
    // 
    // 'player_id' deprecated because we can probably 
    //  convert this collection to rely on Mongo's
    //  auto assigned "_id"
    //
    wins: {
        type: Number,
        required: 'Enter wins record tally'         
    },
    losses: {
        type: Number,
        required: 'Enter losses tally'         
    },
    language: { 
        type: String,
        required: 'Programming language choice'
    },
    onLine: {
        type: Boolean,
        required: 'Flag to indicate use is online'
    },
    avgScore: {
        type: Number,
        required: 'Users average score history'
    }
});