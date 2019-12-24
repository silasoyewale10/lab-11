-- DROP TABLE IF EXISTS books;
CREATE TABLE books
(
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    title VARCHAR(255),
    isbn VARCHAR(255),
    image_url TEXT,
    descriptions TEXT,
    bookshelf VARCHAR(255)
)

-- INSERT INTO books
--     (
--     image_url,
--     title,
--     author,
--     descriptions,
--     isbn
--     )
-- VALUES
--     (
--         'http://books.google.com/books/content?id=GXRCswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
--         'Prophecies',
--         'Leonardo (da Vinci)' ,
--         'Found in the Codex Atlanticus of Leonardo da Vinci writings and drawings, The Prophecies are a collection of 
--         enigmatic divinatory pronouncements, some punning and playful, others dire and ominous. While the authors intentions 
--         behind these utterances are unclear, they clearly attest to the artists fevered and troubled imagination and offer a 
--         glimpse into a world very similar to that depicted in his lost painting The Battle of Anghiari. This volume also 
--         contains a further selection of Leonardo da Vincis fragmentary writings, in the form of fables and aphorisms. 
--         Taken together, these pieces provide an invaluable insight into the thought processes of one of the Renaissances 
--         most productive minds.',
--         1847497691
--     );

-- INSERT INTO books
--     (
--     image_url,
--     title,
--     author,
--     descriptions,
--     isbn
--     )
-- VALUES
--     (
--         'http://books.google.com/books/content?id=a8TBvL8OY78C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
--         'Leonardos Writings and Theory of Art',
--         'Leonardo da Vinci',
--         'Also available as the fourth book in a 5 volume set',
--        0815329369
--     );