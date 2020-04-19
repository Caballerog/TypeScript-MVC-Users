import * as mongoose from 'mongoose';
import { UserInfoSchema } from '../models/UserInfoModel';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;
mongoose.pluralize(null);

const UserInfo = mongoose.model('UserInfo', UserInfoSchema);

export class UserInfoController{

    public addNewUser (req: Request, res: Response) {                
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) res.send(err);
    
            bcrypt.hash(req.body['password'], salt, function(err, hash) {
                if (err) res.send(err);
                req.body['password'] = hash;

                let newUser = new UserInfo(req.body);
    
                newUser.save((err, contact) => {
                if(err){
                    res.send(err);
                }    
                res.json(contact);
                });
            });
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

    public authUser (req: Request, res: Response)
    {     
        UserInfo.findOne({'email':req.params["email"]},
        (err, contact) => {
            if(err || contact == null)
            {
                return res.send(err);
            }

            bcrypt.compare(req.params["password"], contact["password"], (err, isMatch) => {
                if (err || !isMatch) return res.send(err);
                res.json({_id: contact['_id']});
            });
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