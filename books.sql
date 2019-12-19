<<<<<<< HEAD
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  author VARCHAR(255),
  title VARCHAR(255),
  isbn VARCHAR(255),
  image_url VARCHAR(255),
  descriptions TEXT,
  bookshelf VARCHAR(255)
=======


CREATE TABLE IF NOT EXISTS books(
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    title VARCHAR(255),
    isbn INTEGER,
    image_url VARCHAR(255),
    descriptions TEXT,
    bookshelf VARCHAR(255)
>>>>>>> affb29dd798cdd300273e2da7cc103f2cf1aaac1
);