const express = require('express');
const ejs = require('ejs');
const superagent = require('superagent');
const app = express();

const pg = require('pg');
const PORT = process.env.PORT || 3090;
require('dotenv').config();
app.use(express.static('./public'));
// new middleware is urlencoded
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views/pages');

app.get('/', (req, res) => {
    res.render('index');
});

// app.get('/', (req, res) => {
//     res.render('index');
// });

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', error => console.log(error));
client.connect();

function Book(url, title, author, description, isbn = "Not Available", bookshelf ='none') {
    (this.image = url), (this.title = title), (this.author = author), (this.description = description), (this.isbn = isbn), (bookshelf = bookshelf);
}
app.post('/', getBooksData);

function getBooksData(req, res) {
    const books = [];
    const sqlValues = [];
    const url = `https://www.googleapis.com/books/v1/volumes?q=author+inauthor:${req.body.authorText}`;
    superagent
        .get(url)
        .then((data) => {
            // console.log('1111', data.body.items[0].volumeInfo);
            let narrowedData = data.body.items;
            console.log('narrowedData is ', narrowedData[0].volumeInfo.industryIdentifiers[0].identifier);
            narrowedData.forEach((element) => {
                // console.log(element.volumeInfo.imageLinks.thumbnail);
                books.push(
                    new Book(
                        element.volumeInfo.imageLinks.thumbnail,
                        element.volumeInfo.title,
                        element.volumeInfo.authors,
                        element.volumeInfo.description,
                        element.volumeInfo.industryIdentifiers[0].identifier
                    )
                );
                sqlValues.push([element.volumeInfo.imageLinks.thumbnail,
                    element.volumeInfo.title,
                    element.volumeInfo.authors,
                    element.volumeInfo.description,
                    element.volumeInfo.industryIdentifiers[0].identifier])
            });
            console.log('33333', sqlValues);

            const SQL = `INSERT INTO books(
            image_url, title, author, descriptions, isbn, bookshelf
            ) VALUES (
              $1, $2, $3, $4, $5, $6
              )`;
            client.query(SQL, sqlValues[0]);


            res.render('searches/show', { books: books });
        }).catch((err) => errorHandler(err, res));

    }
    
app.post('/bookshelf', getBookshelf);

function getBookshelf(req, res) {
    res.send(req.body);
} 

function errorHandler(error, response) {
    console.error(error);
    response.send('Ooops! Something went wrong');
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
