import * as mongoose from 'mongoose';
import { ExerciseTokenSchema } from '../models/ExerciseTokenModel';
import { Request, Response } from 'express';

mongoose.pluralize(null);

const ExerciseToken = mongoose.model('ForLoop', ExerciseTokenSchema);

export class ExerciseTokenController{ 
/*
    public addNewContact (req: Request, res: Response) {                
        let newContact = new ExerciseToken(req.body);
    
        newContact.save((err, contact) => {
            if(err){
                res.send(err);
            }    
            res.json(contact);
        });
    }
*/
    public getExerciseTokens (req: Request, res: Response) {           
        ExerciseToken.find({}, (err, contact) => {
            if(err){
                res.send(err);
            }

            // Just a test of modifying all token text
            // from our Mongo query before returning
            // through /token API route...
            // contact.forEach(token => {
            //     token.token += '!';
            // });
            // console.log(JSON.stringify(contact));

            res.json(contact); 
        });
    }
/*
    public getContactWithID (req: Request, res: Response) {           
        ExerciseToken.findById(req.params.contactId, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

    public updateContact (req: Request, res: Response) {           
        ExerciseToken.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact); 
        });
    }

    public deleteContact (req: Request, res: Response) {           
        ExerciseToken.remove({ _id: req.params.contactId }, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted contact!'});
        });
    }
*/    
}