const controllers = require('../controller/controller');
const router = require('express').Router();

router.post('/logout', controllers.logout);

export default router;
