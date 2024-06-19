const controllers = require('../controller/controller');
const router = require('express').Router();

router.post('/login', controllers.login);

export default router;
