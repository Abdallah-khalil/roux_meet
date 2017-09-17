import { Router, Request, Response, NextFunction } from 'express';


const io = require('socket.io')();

class ChatRouter {
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
    init() {
        this.router.get('/', this.getIndex);
    }


    /**
     * GET home page.
     */
    public getIndex(req: Request, res: Response, next: NextFunction): void {

        res.render('chat', {
            pageTitle: 'Roux Meetups -- Chat',
            pageId: 'chat'
        });
    };



}



export default new ChatRouter().router;