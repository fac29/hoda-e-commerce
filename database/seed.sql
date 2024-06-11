-- This is a file to hold dummy data
BEGIN;

INSERT INTO users (username, email, password) VALUES
('user1', 'user1@example.com', 'password1'),
('user2', 'user2@example.com', 'password2'),
('admin', 'admin@example.com', 'adminpassword');

INSERT INTO products (product_name, product_description, category, price, product_image, stock) VALUES
('Product 1', 'Description for product 1', 'Category 1', 100, 'product1.jpg', 10),
('Product 2', 'Description for product 2', 'Category 2', 200, 'product2.jpg', 20),
('Product 3', 'Description for product 3', 'Category 3', 300, 'product3.jpg', 30);

INSERT INTO reviews (product_id, author, rating, comment) VALUES
(1, 'user1', 4, 'Great product!'),
(2, 'user2', 5, 'Excellent quality.'),
(3, 'user1', 3, 'Could be better.');

INSERT INTO orders (user_id, product_id, quantity, order_date) VALUES
(1, 1, 1, '2024-06-01 10:00:00'),
(2, 2, 2, '2024-06-02 11:00:00'),
(1, 3, 1, '2024-06-03 12:00:00');

COMMIT;