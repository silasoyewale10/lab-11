

CREATE TABLE IF NOT EXISTS books(
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    title VARCHAR(255),
    isbn NUMERIC(25, 10), 
    image_url VARCHAR(255),
    descriptions TEXT,
    bookshelf VARCHAR(255)
);