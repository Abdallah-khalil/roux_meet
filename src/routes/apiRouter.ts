import { Router, Request, Response, NextFunction } from 'express';
import * as bodyParser from "body-parser";
import * as fs from 'fs';

const dataFile = require("../data/feedback.json") as Array<object>;


class ApiRouter {

    router: Router

    /**
     * Initialize the HomeRouter
     */
    constructor() {
        this.router = Router();

        this.init();
    }

    /**
         * Take each handler, and attach to one of the Express.Router's
         * endpoints.
         */
    private init() {
        this.router.get('/feedbacksData', this.getfeedbackData);
        this.router.post('/feedbacksData', this.addFeedback);
        this.router.delete('/feedbacksData/:id', this.deleteFeedback);
    }


    /**
  * GET home page.
  */
    public getfeedbackData(req: Request, res: Response, next: NextFunction): void {
        res.json(dataFile);
    };

    public addFeedback(req: Request, res: Response, next: NextFunction): void {
        dataFile.unshift(req.body);
        fs.writeFile('src/data/feedback.json', JSON.stringify(dataFile),
            'utf8', (error) => {
                if (error)
                    console.log(error);
            });
        res.json(dataFile);
    };

    public deleteFeedback(req: Request, res: Response, next: NextFunction): void {
        dataFile.splice(req.params.id, 1);
        fs.writeFile('src/data/feedback.json', JSON.stringify(dataFile),
            'utf8', (error) => {
                if (error)
                    console.log(error);
            });
        res.json(dataFile);
    };

}



export default new ApiRouter().router;