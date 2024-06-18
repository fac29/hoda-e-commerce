//import { db } from 'database/db.sqlite';
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

type Review = {
    review_id: number;
    author: string;
    rating: number;
    comment: string;
};

type ProductWithReviews = Product & {
    reviews: Review[];
};

type Products = Product[];
type ProductsWithReviews = ProductWithReviews[];

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

export function listProductsAll(): ProductsWithReviews {
    return select_products.all();
}
// Test for getProductsAll - get an array of all the product objects.
//console.log(listProductsAll());

const select_product_by_id = db.prepare(
    `
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
    `
);
export function getProductByID(id: number): ProductWithReviews | undefined {
    return select_product_by_id.get(id);
}
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
export function getProductByName(name: string): ProductWithReviews | undefined {
    return select_product_by_name.get(name);
}

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

export function getProductBySearchTerm(
    searchTerm: string
): ProductsWithReviews | undefined {
    return search_products.all(
        '%' + searchTerm + '%',
        '%' + searchTerm + '%',
        '%' + searchTerm + '%',
        '%' + searchTerm + '%'
    );
}

/*test for getProductsBySeatchTerm
you can seach by any word in
- name
- description
-author
-category
*/
// console.log(getProductBySearchTerm('The'));
