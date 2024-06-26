const express = require('express');
const controllers = require('../controller/controller');
const router = require('express').Router();

//Routes. Where you declare the path of API endpoints and assign to controllers.

router.get('/', controllers.getAllProducts);
router.get('/:id', controllers.getProductID);

//^^^ these routes are still not finished
export default router;
