//import { db } from '../database/db';
const Database = require('better-sqlite3');
const db = new Database('database/db.sqlite');

type Product = {
    product_id: number;
    product_name: string;
    product_author: string;
    product_description: string;
    category: string;
    price: number;
    product_image: string;
    stock: number;
};
type Products = Product[];

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

export function listProductsAll(): Products {
    return select_products.all();
}
/* Test for getProductsAll 
 console.log(getProductsAll());
*/

const select_product_by_id = db.prepare(
    `
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
    `
);
export function getProductByID(id: number): Product | undefined {
    return select_product_by_id.get(id);
}
/* Test for geProductByID 
 console.log(getProductByName(10));
*/

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
export function getProductByName(name: string): Product | undefined {
    return select_product_by_name.get(name);
}

//Test for geProductByName - a products' name
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

export function getProductBySearchTerm(
    searchTerm: string
): Products | undefined {
    return search_products.all(
        '%' + searchTerm + '%',
        '%' + searchTerm + '%',
        '%' + searchTerm + '%',
        '%' + searchTerm + '%'
    );
}

console.log(getProductBySearchTerm('The'));
