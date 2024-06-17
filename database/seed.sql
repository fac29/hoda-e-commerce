-- This is a file to hold dummy data
BEGIN;

-- Clear existing data
DELETE FROM orders;
DELETE FROM reviews;
DELETE FROM products;
DELETE FROM users;

-- Reset auto-increment counters
DELETE FROM sqlite_sequence WHERE name IN ('orders', 'reviews', 'products', 'users');

-- Insert new data
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
(1, 'user1', 4, 'Loved the Jazz Age vibe, but where was the jazz?'),
(1, 'user2', 5, 'Gatsby is my spirit animal.'),
(1, 'user3', 3, 'Not enough green lights.'),
(2, 'user2', 5, 'Atticus Finch for President!'),
(2, 'user3', 4, 'The courtroom drama was intense!'),
(2, 'user4', 5, 'I want to be Scout when I grow up.'),
(3, 'user1', 3, 'Too real. Needed more happy moments.'),
(3, 'user3', 4, 'Big Brother is always watching, and so am I!'),
(3, 'user4', 2, 'A bit too dystopian for my taste.'),
(4, 'user1', 5, 'Mr. Darcy can be my brooding hero any day.'),
(4, 'user2', 4, 'Marriage and manners, oh my!'),
(5, 'user2', 4, 'Holden Caulfield needs a hug.'),
(5, 'user4', 5, 'Rebel without a cause... or a clue.'),
(6, 'user3', 4, 'Call me Ishmael. Just kidding, call me impressed.'),
(6, 'user4', 5, 'Whale, whale, whale, what do we have here?'),
(7, 'user1', 5, 'Tolstoy makes war sound almost fun.'),
(7, 'user2', 4, 'So many characters, so little time.'),
(8, 'user2', 4, 'Odysseus, the original travel blogger.'),
(8, 'user3', 5, 'Epic adventures and epic poems. What’s not to love?'),
(8, 'user4', 4, 'Greek mythology at its best!'),
(9, 'user1', 5, 'Dostoevsky dives deep into the human psyche.'),
(9, 'user2', 4, 'Dark, but in a good way.'),
(9, 'user3', 5, 'Crime and punishment, indeed.'),
(10, 'user3', 5, 'Bilbo Baggins is my hero.'),
(10, 'user4', 4, 'An unexpected journey, indeed.'),
(11, 'user1', 4, 'Science and sass - what’s not to love?'),
(11, 'user2', 5, 'Elizabeth Zott is a force of nature.'),
(11, 'user4', 3, 'Interesting, but a bit slow in parts.'),
(12, 'user3', 5, 'A haunting memoir that stays with you.'),
(12, 'user1', 4, 'Powerful and poignant.'),
(12, 'user2', 5, 'A must-read for everyone.');

INSERT INTO orders (order_id, user_id, order_date) VALUES
(1, 1, '2024-03-01 10:24:31'),
(2, 2, '2024-05-24 21:04:01'),
(3, 1, '2024-06-13 12:40:36');

INSERT INTO order_items (order_id, product_id, quantity) VALUES
(1, 3, 3),
(1, 6, 1),
(2, 12, 1),
(3, 12, 2);

COMMIT;