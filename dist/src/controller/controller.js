"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.checkout = exports.getProductID = exports.getAllProducts = void 0;
const product_1 = require("../../model/product");
function getAllProducts(req, res) {
    try {
        const searchQuery = req.query.search;
        if (searchQuery) {
            const stringQ = searchQuery.toString();
            res.status(200).send((0, product_1.getProductBySearchTerm)(stringQ));
        }
        let result = (0, product_1.listProductsAll)();
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error.toString);
    }
}
exports.getAllProducts = getAllProducts;
function getProductID(req, res) {
    try {
        const product = req.params.id;
        const productId = parseInt(product);
        const result = (0, product_1.getProductByID)(productId);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error.toString());
    }
}
exports.getProductID = getProductID;
function checkout(req, res) {
    try {
        //do something
    }
    catch (_a) {
        //do something else
    }
}
exports.checkout = checkout;
function login(req, res) {
    try {
        //do something
    }
    catch (_a) {
        //do something else
    }
}
exports.login = login;
