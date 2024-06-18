"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewOrder = exports.getProductBySearchTerm = exports.getProductByName = exports.getProductByID = exports.listProductsAll = void 0;
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
    const products = select_products.all();
    return products.map((product) => (Object.assign(Object.assign({}, product), { reviews: JSON.parse(product.reviews) })));
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
    const product = select_product_by_id.get(id);
    if (product) {
        return Object.assign(Object.assign({}, product), { reviews: JSON.parse(product.reviews) });
    }
    return undefined;
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
    const product = select_product_by_name.get(name);
    if (product) {
        return Object.assign(Object.assign({}, product), { reviews: JSON.parse(product.reviews) });
    }
    return undefined;
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
    const products = search_products.all('%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%');
    return products.map((product) => (Object.assign(Object.assign({}, product), { reviews: JSON.parse(product.reviews) })));
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
const add_new_order = db.prepare(/* sql */ `
    INSERT INTO orders (user_id) VALUES (?)
    RETURNING order_id
`);
const add_order_item = db.prepare(/* sql */ `
    INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)
    RETURNING order_id, product_id, quantity
`);
const select_product_from_order = db.prepare(/* sql */ `
   SELECT product_name, price
   FROM products
   WHERE product_id = ?
`);
function addNewOrder({ user_id, products }) {
    const orderId = add_new_order.get(user_id);
    const orders = products.map((product) => {
        let order = add_order_item.get(orderId.order_id, product.product_id, product.quantity);
        const product_info = select_product_from_order.get(product.product_id);
        order = Object.assign(Object.assign({}, order), product_info);
        return order;
    });
    console.log(JSON.stringify(orders));
    return `Order #${orderId.order_id} successfully submitted.`;
}
exports.addNewOrder = addNewOrder;
// Test object to check the addNewOrder function works
// This mimics what will be passed from the frontend - the user_id and array of products ordered
// which will contain a product_id and quantity
const newOrder = {
    user_id: 1,
    products: [
        {
            product_id: 1,
            quantity: 1,
        },
        {
            product_id: 2,
            quantity: 1,
        },
    ],
};
console.log(addNewOrder(newOrder));
