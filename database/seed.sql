-- This is a file to hold dummy data
BEGIN;

INSERT INTO users (username, email, password) VALUES
('user1', 'user1@example.com', 'password1'),
('user2', 'user2@example.com', 'password2'),
('admin', 'admin@example.com', 'adminpassword');

INSERT INTO products (product_name, product_author, product_description, category, price, product_image, stock) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'A novel by F. Scott Fitzgerald about the Jazz Age and the American Dream.', 'Classic Literature', 1099, 'great_gatsby.jpg', 45),
('To Kill a Mockingbird', 'Harper Lee', 'A novel by Harper Lee, focusing on racial injustice in the Deep South.', 'Classic Literature', 1299, 'to_kill_a_mockingbird.jpg', 30),
('1984', 'George Orwell', 'A dystopian novel by George Orwell about totalitarianism and surveillance.', 'Dystopian', 999, '1984.jpg', 50),
('Pride and Prejudice', 'Jane Austen', 'A classic novel by Jane Austen about manners and matrimonial machinations.', 'Romance', 1199, 'pride_and_prejudice.jpg', 40),
('The Catcher in the Rye', 'J.D. Salinger', 'A novel by J.D. Salinger about teenage rebellion and angst.', 'Young Adult', 899, 'catcher_in_the_rye.jpg', 35),
('Moby-Dick', 'Herman Melville', 'A novel by Herman Melville about the voyage of the whaling ship Pequod.', 'Adventure', 1499, 'moby_dick.jpg', 25),
('War and Peace', 'Leo Tolstoy', 'A novel by Leo Tolstoy, chronicling the French invasion of Russia.', 'Historical Fiction', 1599, 'war_and_peace.jpg', 20),
('The Odyssey', 'Homer', 'An ancient Greek epic poem attributed to Homer, detailing Odysseus adventures.', 'Epic Poetry', 1399, 'odyssey.jpg', 50),
('Crime and Punishment', 'Fyodor Dostoevsky', 'A novel by Fyodor Dostoevsky about the mental anguish of a young man who commits a crime.', 'Psychological Fiction', 1199, 'crime_and_punishment.jpg', 40),
('The Hobbit', 'J.R.R. Tolkien', 'A fantasy novel by J.R.R. Tolkien about the journey of Bilbo Baggins.', 'Fantasy', 1299, 'hobbit.jpg', 60),
('Lessons in Chemistry', 'Bonnie Garmus', 'A novel by Bonnie Garmus about a woman scientist in the 1960s.', 'Historical Fiction', 1499, 'lessons_in_chemistry.jpg', 25),
('If This Is a Man', 'Primo Levi', 'A book by Primo Levi about his experiences in Auschwitz.', 'Memoir', 1599, 'if_this_is_a_man.jpg', 15);


INSERT INTO reviews (product_id, author, rating, comment) VALUES
(1, 'user1', 4, 'Great product!'),
(2, 'user2', 5, 'Excellent quality.'),
(3, 'user1', 3, 'Could be better.');

INSERT INTO orders (user_id, product_id, quantity, order_date) VALUES
(1, 1, 1, '2024-06-01 10:00:00'),
(2, 2, 2, '2024-06-02 11:00:00'),
(1, 3, 1, '2024-06-03 12:00:00');

COMMIT;