"use strict";
const controllers = require('./controller/controller');
const router = require('express').Router();
//Routes. Where you declare the path of API endpoints and assign to controllers.
module.exports = () => {
    router.get('/', controllers.allProducts);
    router.get('/:id', controllers.getProduct);
    router.post('/checkout', controllers.checkout);
    router.post('/login', controllers.login);
    router.post('sign-up', controllers.signup);
};
//^^^ these routes are still not finished
