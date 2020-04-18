import * as mongoose from 'mongoose';
import { UserInfoSchema } from '../models/UserInfoModel';
import { Request, Response } from 'express';

mongoose.pluralize(null);

const UserInfo = mongoose.model('UserInfo', UserInfoSchema);

export class UserInfoController{

    public addNewUser (req: Request, res: Response) {                
        let newUser = new UserInfo(req.body);
    
        newUser.save((err, contact) => {
            if(err){
                res.send(err);
            }    
            res.json(contact);
        });
    }

    public getUserInfo (req: Request, res: Response) {           
        UserInfo.find({}, (err, contact) => {
            if(err){
                res.send(err);
            }
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