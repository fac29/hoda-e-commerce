import { db } from '../database/db';

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
export function getProductByName(name: string) {
    return select_product_by_name('To Kill a Mockingbird');
}


console.log(getProductByName)
// export function getProductByDescription() {}
