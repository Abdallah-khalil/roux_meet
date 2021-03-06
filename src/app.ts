import * as http from "http";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as favicon from "serve-favicon";

import HomeRouter from './routes/homeRouter';
import SpeakersRouter from './routes/speakersRoute';
import FeedbackRouter from './routes/feedbackRouter';
import ApiRouter from './routes/apiRouter';
import ChatRouter from './routes/chatRouter';

const dataFile = require("./data/data.json");

class App {
    public expressApp: express.Application;

    constructor() {
        this.expressApp = express();
        this.middleWare();
        this.routes();
    };

    private middleWare(): void {
        // view engine setup
        this.expressApp.set("views", path.join(__dirname, "views"));
        this.expressApp.set("view engine", "ejs");
        // this.expressApp.use(favicon(path.join(__dirname, "../public", "favicon.ico")));
        this.expressApp.use(logger("dev"));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(express.static(path.join(__dirname, "../public")));
        this.expressApp.set('appData', dataFile);
        this.expressApp.locals.allSpeakers = dataFile.speakers;
    };

    private routes(): void {
        this.expressApp.use('/', HomeRouter);
        this.expressApp.use('/Home', HomeRouter);
        this.expressApp.use('/Speakers', SpeakersRouter);
        this.expressApp.use('/Feedback', FeedbackRouter);
        this.expressApp.use('/api', ApiRouter);
        this.expressApp.use('/Chat', ChatRouter);

    };

}

export default new App().expressApp;