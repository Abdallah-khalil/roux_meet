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
        let data = req.app.get('appData');
        let pagePhotos: Array<object> = [];
        let pageSpeakers = data.speakers;
        
        data.speakers.forEach((item: any) => {
            pagePhotos = pagePhotos.concat(item.artwork);
        });

        res.render('index', {
            pageTitle: 'Roux Meetups',
            artwork: pagePhotos,
            speakers: pageSpeakers,
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