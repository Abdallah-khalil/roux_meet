import { Router, Request, Response, NextFunction } from 'express';

class SpeakerRouter {
    router: Router

    /**
     * Initialize the HomeRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * GET Speakers page.
     */
    public getSpeakers(req: Request, res: Response, next: NextFunction): void {

        let data = req.app.get('appData');
        let pagePhotos: Array<object> = [];
        let pageSpeakers = data.speakers;

        data.speakers.forEach((item: any) => {
            pagePhotos = pagePhotos.concat(item.artwork);
        });

        res.render('speakers', {
            pageTitle: 'Roux Meetups -- Speakers',
            artwork: pagePhotos,
            speakers: pageSpeakers,
            pageId: 'speakerList'
        });
    };

    public getSpeakerById(req: Request, res: Response, next: NextFunction): void {

        let data = req.app.get('appData');
        let pagePhotos: Array<object> = [];
        let pageSpeakers: Array<object> = [];

        data.speakers.forEach((item: any) => {
            if (item.shortname == req.params.speakerid) {
                pageSpeakers.push(item);
                pagePhotos = pagePhotos.concat(item.artwork);
            };            
        });

        res.render('speakers', {
            pageTitle: 'Roux Meetups -- Speaker info',
            artwork: pagePhotos,
            speakers: pageSpeakers,
            pageId: 'speakerDetail'
        });
    };

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/', this.getSpeakers);
        this.router.get('/:speakerid', this.getSpeakerById);
    }

}



export default new SpeakerRouter().router;