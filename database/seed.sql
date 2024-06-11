-- This is a file to hold dummy data
BEGIN;

INSERT INTO products (product_name, product_description, category, price, product_image, stock) VALUES
('Product 1', 'Description for product 1', 'Category 1', 100, 'product1.jpg', 10),
('Product 2', 'Description for product 2', 'Category 2', 200, 'product2.jpg', 20),
('Product 3', 'Description for product 3', 'Category 3', 300, 'product3.jpg', 30);

COMMIT;