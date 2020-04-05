import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    id: {
        type: String,
        required: 'Enter a token id'
    },
    token: {
        type: String,
        required: 'Enter a token character string'
    },
    type: {
        type: String,
        required: 'Enter a token type'         
    },
    cost: {
        type: Number,
        required: 'Enter a token cost (numeric)'         
    }
});