const db = require('../database/db.js');

const insertProductStmt = db.prepare(`
    INSERT INTO products (
        product_name, 
        product_description, 
        category, 
        price, 
        product_image, 
        stock
    ) VALUES (?, ?, ?, ?, ?, ?)
`);

function createProduct(product) {
    const {
        product_name,
        product_description,
        category,
        price,
        product_image,
        stock,
    } = product;

    insertProductStmt.run(
        product_name,
        product_description,
        category,
        price,
        product_image,
        stock
    );
}

module.exports = { createProduct };
