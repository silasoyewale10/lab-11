CREATE TABLE books(
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    title VARCHAR(255),
    isbn INTEGER,
    image_url VARCHAR(255),
    descriptions TEXT,
    bookshelf VARCHAR(255)
);