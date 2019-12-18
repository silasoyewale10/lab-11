const express = require('express');
const ejs = require('ejs');
const superagent = require('superagent');
const app = express();
const pg = require('pg');
require('dotenv').config();
const PORT = process.env.PORT || 3050;
app.use(express.static('./public'));
// new middleware is urlencoded
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views/pages');

app.get('/', (req, res) => {
	res.render('index');
});

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', error => console.log(error));
client.connect();

function Book(url, title, author, description, isbn = "Not Available") {
	(this.image = url), (this.title = title), (this.author = author), (this.description = description), (this.isbn = isbn);
}
app.post('/', getBooksData);

function getBooksData(req, res) {
	// console.log('22222', req.body.authorText);
	// res.render('show');
	const url = `https://www.googleapis.com/books/v1/volumes?q=author+inauthor:${req.body.authorText}`;
	superagent
		.get(url)
		.then((data) => {
			const books = [];
			// console.log('1111', data.body.items[0].volumeInfo);
			let narrowedData = data.body.items;
			console.log('narrowedData is ', narrowedData);
			narrowedData.forEach((element) => {
				// console.log(element.volumeInfo.imageLinks.thumbnail);
				books.push(
					new Book(
						element.volumeInfo.imageLinks.thumbnail,
						element.volumeInfo.title,
						element.volumeInfo.authors,
                        element.volumeInfo.description,
                        element.volumeInfo.isbn
					)
				);
			});

			const SQL = `INSERT INTO books(
            image_url, title, author, descriptions
            ) VALUES (
              $1, $2, $3, $4
              )`;
			client.query(SQL, books);
			// response.send()

			res.render('searches/show', { books: books });
		})
		.catch((err) => errorHandler(err, res));
}

function errorHandler(error, response) {
	console.error(error);
	response.send('Ooops! Something went wrong');
}
// app.get('*', (request, response) => response.status(404).send('This route does not exist'));
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
