BEGIN;

CREATE TABLE IF NOT EXISTS products (
  product_id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_name TEXT,
  product_description TEXT,
  category TEXT,
  price INTEGER,
  product_image TEXT,
  stock INTEGER
);

COMMIT;