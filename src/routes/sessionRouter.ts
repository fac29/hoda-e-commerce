const controllers = require('../controller/controller');
const router = require('express').Router();

//Routes. Where you declare the path of API endpoints and assign to controllers.

router.get('/session', controllers.session);

export default router;
