"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('E-Commerce App: Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
const { createProduct } = require('../model/product');
// Example usage
const newProduct = {
    product_name: 'Example Product',
    product_description: 'This is an example product.',
    category: 'Example Category',
    price: 100,
    product_image: 'example_image.jpg',
    stock: 50,
};
createProduct(newProduct);
console.log('New product created.');
