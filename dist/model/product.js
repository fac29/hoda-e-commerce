"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductBySearchTerm = exports.getProductByName = exports.getProductByID = exports.listProductsAll = void 0;
//import { db } from 'database/db.sqlite';
const Database = require('better-sqlite3');
const db = new Database('database/db.sqlite');
const select_products = db.prepare(/*sql*/ `
SELECT
    product_id,
    product_name,
    product_author,
    product_description,
    category,
    price,
    product_image,
    stock
FROM products
`);
function listProductsAll() {
    return select_products.all();
}
exports.listProductsAll = listProductsAll;
// Test for getProductsAll - get an array of all the product objects.
//console.log(listProductsAll());
const select_product_by_id = db.prepare(`
SELECT 
    products.product_id, 
    products.product_name,
    products.product_author,
    products.product_description,
    products.category,
    products.price,
    products.product_image,
    products.stock
FROM products 
WHERE products.product_id = ?
    `);
function getProductByID(id) {
    return select_product_by_id.get(id);
}
exports.getProductByID = getProductByID;
// Test for geProductByID - where you can get a product via a products'id (1 - 12)
// console.log(getProductByName(10));
const select_product_by_name = db.prepare(`
SELECT 
    products.product_id, 
    products.product_name,
    products.product_author,
    products.product_description,
    products.category,
    products.price,
    products.product_image,
    products.stock
    FROM products 
WHERE products.product_name = ?
`);
function getProductByName(name) {
    return select_product_by_name.get(name);
}
exports.getProductByName = getProductByName;
//Test for geProductByName - where you can get a product via a products'(book) name
//console.log(getProductByName('To Kill a Mockingbird'));
const search_products = db.prepare(`
SELECT 
    products.product_id, 
    products.product_name,
    products.product_author,
    products.product_description,
    products.category,
    products.price,
    products.product_image,
    products.stock
    FROM products 
WHERE products.product_description LIKE ? OR products.product_name LIKE ? OR products.product_author LIKE ? OR products.category LIKE ?
`);
function getProductBySearchTerm(searchTerm) {
    return search_products.all('%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%');
}
exports.getProductBySearchTerm = getProductBySearchTerm;
/*test for getProductsBySeatchTerm
you can seach by any word in
- name
- description
-author
-category
*/
console.log(getProductBySearchTerm('The'));
