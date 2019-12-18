const express = require('express');
const ejs = require('ejs');
const superagent = require('superagent');
const app = express();
const PORT = process.env.PORT || 3050;
app.use(express.static('./public'));
// new middleware is urlencoded
app.use(express.urlencoded( {extended:true} ));
app.set('view engine', 'ejs');
app.set('views', './views/pages');


app.get('/', (req, res) => {
    res.render('index');
})
// app.post('/', (req, res) => {
//     superagent.get(`https://www.googleapis.com/books/v1/volumes?q=author+inauthor:${req.body.author}`).then(data => {
//       const books = data.body.items.map(book => ({name: book.volumeInfo.title}));
//       console.log(books);
//       res.render('book-results', {
//         books: books
//       });
//     });
//   });
function Book(url, title, author, description) {
    this.image = url,
    this.title = title,
    this.author = author,
    this.description = description
}
app.post('/', (req, res) => {
    // console.log('22222', req.body.authorText);
    // res.render('show');
    const url = `https://www.googleapis.com/books/v1/volumes?q=author+inauthor:${req.body.authorText}`;
    superagent.get(url).then(data => {
        const books =[];
        // console.log('1111', data.body.items[0].volumeInfo);
        let narrowedData = data.body.items;
        narrowedData.forEach(element => {
            // console.log(element.volumeInfo.imageLinks.thumbnail);
            books.push(new Book(element.volumeInfo.imageLinks.thumbnail, element.volumeInfo.title, element.volumeInfo.authors, element.volumeInfo.description));
        })
        res.render('searches/show', {books: books});
    }).catch(err => errorHandler(err, res));
})

function errorHandler(error, response) {
    console.error(error);
    response.render('Ooops! Something went wrong');
}
// app.get('*', (request, response) => response.status(404).send('This route does not exist'));
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
