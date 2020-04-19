import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserInfoSchema = new Schema({
    name: {
        type: String,
        required: 'Enter your display name'
    },
    email: {
        type: String,
        required: 'Enter your email address',
        index: {unique: true}
    },
    password: {
        type: String,
        required: 'Enter a password'
    },
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
    online: {
        type: Boolean,
        required: 'Flag to indicate use is online'
    },
    avgScore: {
        type: Number,
        required: 'Users average score history'
    }
});