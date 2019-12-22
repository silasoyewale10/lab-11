//dependencies
const express = require('express');
const ejs = require('ejs');
const superagent = require('superagent');
const app = express();
const pg = require('pg');
const PORT = process.env.PORT || 3002;
require('dotenv').config();
app.use(express.static('./public'));
// new middleware is urlencoded
app.use(express.urlencoded({ extended: true }));
//enable ejs files
app.set('view engine', 'ejs');
app.set('views', './views/pages');

//connect to database
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', error => console.log(error));
client.connect();

//Routes
app.get('/search', renderSearchPage)
app.post('/searchResult', getBooksData);
app.post('/book', saveBooksToDatabase);
app.get('/', displaySavedBooks)


function renderSearchPage (req, res){
    res.render('searches/new').catch((err) => errorHandler(err, res));
};


function getBooksData(req, res) {
    const books = [];
    const instruction1Values = [];
    const url = `https://www.googleapis.com/books/v1/volumes?q=author+inauthor:${req.body.authorText}`;
    superagent
        .get(url)
        .then((data) => {
            let narrowedData = data.body.items;
            console.log('narrowedData is ', narrowedData[0].volumeInfo.imageLinks);
            narrowedData.forEach((element) => {
                books.push(
                    new Book(
                        element.volumeInfo.imageLinks.thumbnail || undefined,
                        element.volumeInfo.title,
                        element.volumeInfo.authors,
                        element.volumeInfo.description,
                        element.volumeInfo.industryIdentifiers[0].identifier
                    )
                );
            });
            res.render('searches/show', { books: books });
        }).catch((err) => errorHandler(err, res));

    }
    
function saveBooksToDatabase(req, res) {
    const instruction1 = `INSERT INTO books(
        image_url, title, author, descriptions, isbn, bookshelf
        ) VALUES (
          $1, $2, $3, $4, $5, $6
          )`;
        client.query(instruction1, [req.body.image, req.body.title, req.body.author, req.body.description, req.body.isbn, req.body.bookshelf]);
    
        const instruction2 = `SELECT id FROM books WHERE title =$1`;
        let value = [req.body.title];
        
        //Show detail of book just added
        client.query(instruction2, value).then(singleBookData => {
            console.log('3333333', singleBookData.rows[0].id);
            let id = singleBookData.rows[singleBookData.rows.length-1].id;
            res.redirect(`detail/${id}`);        
    }).catch((err) => errorHandler(err, res));       
}

function displaySavedBooks (req, res) {
    client.query(`SELECT * FROM books;`).then(savedBooks =>{
        console.log('savedBooks.rows isisisis', savedBooks.rows);
        res.render('index', {books : savedBooks.rows});
    }).catch((err) => errorHandler(err, res));
}

app.get('/detail/:id', showBookDetail);
function showBookDetail(req, res){
    client.query(`SELECT * FROM books where id =$1`,[req.params.id]).then(singleBookData => {
        console.log('1111111',singleBookData.rows[0]);
        let book = singleBookData.rows[0]
        res.render('./books/detail', {singleBook : book})
    }).catch((err) => errorHandler(err, res));
}
// displaySavedBooks();
function errorHandler(error, response) {
    console.error(error);
    response.send('Ooops! Something went wrong');
}


function Book(url = 'Not Available', title, author, description, isbn = 'Not Available', bookshelf ='none') {
    (this.image = url || undefined), (this.title = title), (this.author = author), (this.description = description), (this.isbn = isbn), (bookshelf = bookshelf);
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));