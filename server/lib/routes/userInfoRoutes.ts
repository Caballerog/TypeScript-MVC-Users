import {Request, Response, NextFunction} from "express";
import { UserInfoController } from "../controllers/UserInfoController";

export class UserInfoRoutes { 
    
    public userInfoController = new UserInfoController();
    
    public routes(app): void {   
        
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        
        // Users 
        app.route('/user')
        .get((req: Request, res: Response, next: NextFunction) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);  
            next(); // seems to be required          
        }, this.userInfoController.getUserInfo)
        // POST endpoint
        .post(this.userInfoController.addNewUser);

        app.route('/user/:email.:password').get(this.userInfoController.authUser);
    }
}