/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const http = __webpack_require__(2);
const App_1 = __webpack_require__(3);
const port = normalizePort(process.env.PORT || 3000);
App_1.default.set('port', port);
const server = http.createServer(App_1.default);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
function normalizePort(val) {
    let port = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port))
        return val;
    else if (port >= 0)
        return port;
    else
        return false;
}
function onError(error) {
    if (error.syscall !== 'listen')
        throw error;
    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            process.exit(1);
            break;
        case 'EADDRINUSE':
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __webpack_require__(4);
const cookieParser = __webpack_require__(5);
const express = __webpack_require__(0);
const logger = __webpack_require__(6);
const path = __webpack_require__(7);
const homeRouter_1 = __webpack_require__(8);
const speakersRoute_1 = __webpack_require__(9);
const feedbackRouter_1 = __webpack_require__(10);
const apiRouter_1 = __webpack_require__(11);
const dataFile = __webpack_require__(13);
class App {
    constructor() {
        this.expressApp = express();
        this.middleWare();
        this.routes();
    }
    ;
    middleWare() {
        this.expressApp.set("views", path.join(__dirname, "views"));
        this.expressApp.set("view engine", "ejs");
        this.expressApp.use(logger("dev"));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(express.static(path.join(__dirname, "../public")));
        this.expressApp.set('appData', dataFile);
        this.expressApp.locals.allSpeakers = dataFile.speakers;
    }
    ;
    routes() {
        this.expressApp.use('/', homeRouter_1.default);
        this.expressApp.use('/Home', homeRouter_1.default);
        this.expressApp.use('/Speakers', speakersRoute_1.default);
        this.expressApp.use('/Feedback', feedbackRouter_1.default);
        this.expressApp.use('/api', apiRouter_1.default);
    }
    ;
}
exports.default = new App().expressApp;

/* WEBPACK VAR INJECTION */}.call(exports, "src"))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __webpack_require__(0);
class HomeRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getIndex(req, res, next) {
        let data = req.app.get('appData');
        let pagePhotos = [];
        let pageSpeakers = data.speakers;
        data.speakers.forEach((item) => {
            pagePhotos = pagePhotos.concat(item.artwork);
        });
        res.render('index', {
            pageTitle: 'Roux Meetups',
            artwork: pagePhotos,
            speakers: pageSpeakers,
            pageId: 'home'
        });
    }
    ;
    init() {
        this.router.get('/', this.getIndex);
    }
}
exports.default = new HomeRouter().router;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __webpack_require__(0);
class SpeakerRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getSpeakers(req, res, next) {
        let data = req.app.get('appData');
        let pagePhotos = [];
        let pageSpeakers = data.speakers;
        data.speakers.forEach((item) => {
            pagePhotos = pagePhotos.concat(item.artwork);
        });
        res.render('speakers', {
            pageTitle: 'Roux Meetups -- Speakers',
            artwork: pagePhotos,
            speakers: pageSpeakers,
            pageId: 'speakerList'
        });
    }
    ;
    getSpeakerById(req, res, next) {
        let data = req.app.get('appData');
        let pagePhotos = [];
        let pageSpeakers = [];
        data.speakers.forEach((item) => {
            if (item.shortname == req.params.speakerid) {
                pageSpeakers.push(item);
                pagePhotos = pagePhotos.concat(item.artwork);
            }
            ;
        });
        res.render('speakers', {
            pageTitle: 'Roux Meetups -- Speaker info',
            artwork: pagePhotos,
            speakers: pageSpeakers,
            pageId: 'speakerDetail'
        });
    }
    ;
    init() {
        this.router.get('/', this.getSpeakers);
        this.router.get('/:speakerid', this.getSpeakerById);
    }
}
exports.default = new SpeakerRouter().router;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __webpack_require__(0);
class FeedbackRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get('/', this.getIndex);
    }
    getIndex(req, res, next) {
        res.render('feedback', {
            pageTitle: 'Roux Meetups -- feedback',
            pageId: 'feedback'
        });
    }
    ;
}
exports.default = new FeedbackRouter().router;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __webpack_require__(0);
const fs = __webpack_require__(15);
const dataFile = __webpack_require__(12);
class ApiRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get('/feedbacksData', this.getfeedbackData);
        this.router.post('/feedbacksData', this.addFeedback);
        this.router.delete('/feedbacksData/:id', this.deleteFeedback);
    }
    getfeedbackData(req, res, next) {
        res.json(dataFile);
    }
    ;
    addFeedback(req, res, next) {
        dataFile.unshift(req.body);
        fs.writeFile('src/data/feedback.json', JSON.stringify(dataFile), 'utf8', (error) => {
            if (error)
                console.log(error);
        });
        res.json(dataFile);
    }
    ;
    deleteFeedback(req, res, next) {
        dataFile.splice(req.params.id, 1);
        fs.writeFile('src/data/feedback.json', JSON.stringify(dataFile), 'utf8', (error) => {
            if (error)
                console.log(error);
        });
        res.json(dataFile);
    }
    ;
}
exports.default = new ApiRouter().router;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = [{"name":"abdallah","title":"this is actually cool","message":"really adding new files and edit them with nodejs is soo cool "},{"name":"Jane","title":"Meeting Time","message":"Would you consider moving the meeting time 30 minutes to about 6pm. It's tough to make it to the meetings on time right after work."},{"name":"Roy","title":"Great Speaker","message":"I really enjoyed the speaker this month. Would love to hear another presentation."}]

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {"speakers":[{"title":"Art in Full Bloom","name":"Lorenzo Garcia","shortname":"Lorenzo_Garcia","summary":"Drawing and painting flowers may seem like a first-year art student's assignment, but Lorenzo Garcia brings depth, shadows, light, form and color to new heights with his unique and revolutionary technique of painting on canvas with ceramic glaze. This session is sure to be a hit with mixed media buffs.","description":"<p>Lorenzo was born in Mexico, but grew up in Southern California after his mother immigrated to Los Angeles when he was a year old. His mother worked as a seamstress in the Fashion District and brought home scrap materials for Lorenzo to create his early mixed media art. From that point on, Lorenzo became hooked on creating art from scrap metals, fabrics, wood, canvas, and many others. During his junior year at Bischon Art School in Los Angeles, he perfected his own proprietary method of painting on canvas with ceramic glaze, which he will demonstrate on Monday in his session, 'Art in Full Bloom'.</p><p>Lorenzo paints with an extraordinary amount of color, and prefers to create art centered around nature, animals, and science. Now in his senior year at Bischon, Lorenzo has been creating mixed media totem poles made from old telephone poles, and other recycled materials, and is already planning his next new technique that will likely inspire a trend for years to come.</p>","artwork":["Lorenzo_Garcia_01_tn.jpg","Lorenzo_Garcia_02_tn.jpg","Lorenzo_Garcia_03_tn.jpg","Lorenzo_Garcia_04_tn.jpg"]},{"title":"Deep Sea Wonders","name":"Hilary Goldywynn Post","shortname":"Hillary_Goldwynn","summary":"Hillary is a sophomore art sculpture student at New York University, and has won the major international prizes for painters, including the Divinity Circle and the International Painter's Medal. Hillary's exhibit features paintings that contain only water including waves, deep sea, and river.","description":"<p>Hillary is a sophomore art sculpture student at New York University, and has already won all the major international prizes for new painters, including the Divinity Circle, the International Painter's Medal, and the Academy of Paris Award. Hillary's CAC exhibit features paintings that contain only water images including waves, deep sea, and river.</p><p>An avid water sports participant, Hillary understands the water in many ways in which others do not, or may not ever have the opportunity. Her goal in creating the CAC exhibit was to share with others the beauty, power, and flow of natural bodies of water throughout the world. In addition to the display, Hilary also hosts a session on Tuesday called Deep Sea Wonders, which combines her love of deep sea diving and snorkeling, with instruction for capturing the beauty of underwater explorations on canvas.</p>","artwork":["Hillary_Goldwynn_01_tn.jpg","Hillary_Goldwynn_02_tn.jpg","Hillary_Goldwynn_03_tn.jpg","Hillary_Goldwynn_04_tn.jpg","Hillary_Goldwynn_05_tn.jpg","Hillary_Goldwynn_06_tn.jpg","Hillary_Goldwynn_07_tn.jpg"]},{"title":"The Art of Abstract","name":"Riley Rudolph Rewington","shortname":"Riley_Rewington","summary":"The leader of the MMA artistic movement in his hometown of Portland, Riley Rudolph Rewington draws a crowd wherever he goes. Mixing street performance, video, music, and traditional art, Riley has created some of the most unique and deeply poignant abstract works of his generation.","description":"<p>Riley started out as musician and street performance artist, and now blends painting and photography with audio, video, and computer multimedia to create what he calls 'Music and Multimedia Artworks.' Riley's innovations in using multimedia to express art have created a youth culture movement in his town of Portland, in which he remains at the forefront. In his role as the founder of the MMA art form, Riley has become an inspiration to many up and coming artists. However, the part Riley insists is most important to him, is that he's helped many troubled youth take control of their lives, and create their own unique, positive futures. Seeing kids he's mentored graduate from high school and enroll in college, gives art the purpose that Riley so craves.</p><p>A first-year student at the Roux Academy of Art, Media, and Design, Riley is already changing the face of modern art at the university. Riley's exquisite abstract pieces have no intention of ever being understood, but instead beg the viewer to dream, create, pretend, and envision with their mind's eye. Riley will be speaking on the 'Art of Abstract' during Thursday's schedule.</p>","artwork":["Riley_Rewington_01_tn.jpg","Riley_Rewington_02_tn.jpg","Riley_Rewington_03_tn.jpg","Riley_Rewington_04_tn.jpg","Riley_Rewington_05_tn.jpg","Riley_Rewington_06_tn.jpg"]}]}

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ })
/******/ ]);