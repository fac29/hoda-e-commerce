const controllers = require('../controller/controller');
const router = require('express').Router();

router.post('/sign-up', controllers.signup);

export default router;
