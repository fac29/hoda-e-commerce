const controllers = require('../controller/controller');
const router = require('express').Router();

router.post('/checkout', controllers.checkout);

export default router;
