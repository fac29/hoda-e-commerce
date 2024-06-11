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

export const listProductsAll: Products = select_products.all();
