import { Router, Request, Response, NextFunction } from 'express';

class HomeRouter {
    router: Router

    /**
     * Initialize the HomeRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * GET home page.
     */
    public getIndex(req: Request, res: Response, next: NextFunction): void {
        res.render('index', {
            pageTitle: 'Roux Meetups',           
            pageId: 'home'
        });
    };

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/', this.getIndex);
    }

}



export default new HomeRouter().router;