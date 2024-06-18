"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductBySearchTerm = exports.getProductByName = exports.getProductByID = exports.listProductsAll = void 0;
//import { db } from 'database/db.sqlite';
const Database = require('better-sqlite3');
const db = new Database('database/db.sqlite');
const select_products = db.prepare(/*sql*/ `
SELECT
    p.product_id,
    p.product_name,
    p.product_author,
    p.product_description,
    p.category,
    p.price,
    p.product_image,
    p.stock,
    json_group_array(
        json_object(
            'review_id', r.review_id,
            'author', r.author,
            'rating', r.rating,
            'comment', r.comment
        )
    ) as reviews
FROM products p
LEFT JOIN reviews r ON r.product_id = p.product_id
GROUP BY p.product_id
`);
function listProductsAll() {
    return select_products.all();
}
exports.listProductsAll = listProductsAll;
// Test for getProductsAll - get an array of all the product objects.
//console.log(listProductsAll());
const select_product_by_id = db.prepare(`
SELECT
    p.product_id,
    p.product_name,
    p.product_author,
    p.product_description,
    p.category,
    p.price,
    p.product_image,
    p.stock,
    json_group_array(
        json_object(
            'review_id', r.review_id,
            'author', r.author,
            'rating', r.rating,
            'comment', r.comment
        )
    ) as reviews
FROM products p
LEFT JOIN reviews r ON r.product_id = p.product_id
WHERE p.product_id = ?
GROUP BY p.product_id
    `);
function getProductByID(id) {
    return select_product_by_id.get(id);
}
exports.getProductByID = getProductByID;
// Test for geProductByID - where you can get a product via a products'id (1 - 12)
// console.log(getProductByName(10));
const select_product_by_name = db.prepare(`
SELECT
    p.product_id,
    p.product_name,
    p.product_author,
    p.product_description,
    p.category,
    p.price,
    p.product_image,
    p.stock,
    json_group_array(
        json_object(
            'review_id', r.review_id,
            'author', r.author,
            'rating', r.rating,
            'comment', r.comment
        )
    ) as reviews
FROM products p
LEFT JOIN reviews r ON r.product_id = p.product_id
WHERE p.product_name = ?
GROUP BY p.product_id
`);
function getProductByName(name) {
    return select_product_by_name.get(name);
}
exports.getProductByName = getProductByName;
//Test for geProductByName - where you can get a product via a products'(book) name
//console.log(getProductByName('To Kill a Mockingbird'));
const search_products = db.prepare(`
SELECT
    p.product_id,
    p.product_name,
    p.product_author,
    p.product_description,
    p.category,
    p.price,
    p.product_image,
    p.stock,
    json_group_array(
        json_object(
            'review_id', r.review_id,
            'author', r.author,
            'rating', r.rating,
            'comment', r.comment
        )
    ) as reviews
FROM products p
LEFT JOIN reviews r ON r.product_id = p.product_id
WHERE p.product_description LIKE ? OR p.product_name LIKE ? OR p.product_author LIKE ? OR p.category LIKE ?
GROUP BY p.product_id
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
// console.log(getProductBySearchTerm('The'));
