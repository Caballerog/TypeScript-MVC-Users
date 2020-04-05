import * as mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';
import { Request, Response } from 'express';

mongoose.pluralize(null);

const Contact = mongoose.model('ForLoop', ContactSchema);

export class ContactController{

    public addNewContact (req: Request, res: Response) {                
        let newContact = new Contact(req.body);
    
        newContact.save((err, contact) => {
            if(err){
                res.send(err);
            }    
            res.json(contact);
        });
    }

    public getContacts (req: Request, res: Response) {           
        Contact.find({}, (err, contact) => {
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

    public getContactWithID (req: Request, res: Response) {           
        Contact.findById(req.params.contactId, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

    public updateContact (req: Request, res: Response) {           
        Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

    public deleteContact (req: Request, res: Response) {           
        Contact.remove({ _id: req.params.contactId }, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted contact!'});
        });
    }
    
}