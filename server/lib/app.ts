import * as express from "express";
import * as bodyParser from "body-parser";
import { ExerciseTokenRoutes } from "./routes/exerciseTokenRoutes";
import { UserInfoRoutes } from "./routes/userInfoRoutes";
import * as mongoose from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config();

class App { 

    public app: express.Application = express();
    private exerciseTokenRoutes = new ExerciseTokenRoutes();
    private userInfoRoutes = new UserInfoRoutes();
    private mongoUrl = process.env.mongodb_url;

    constructor() {
        this.config();
        this.mongoSetup();
        this.exerciseTokenRoutes.routes(this.app);
        this.userInfoRoutes.routes(this.app);
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.app.use(express.static('public'));
    }

    private mongoSetup(): void{
        //mongoose.Promise = global.Promise; // ??
        mongoose.connect(this.mongoUrl, {useNewUrlParser: true});        
    }

}

export default new App().app;
