const express = require('express');
const ejs = require('ejs');
const superagent = require('superagent');
const app = express();
const PORT = process.env.PORT || 3050;

app.use(express.static('./public'));
// new middleware is urlencoded
app.use(express.urlencoded( {extended:true} ));


app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('pages/index');
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

function Book(query, response) {
    // this.image = image,
    // this.title = title,
    // this.author = author,
    // this.description = description
}

app.post('/', (req, res) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=author+inauthor:${req.body.author}`;
    superagent.get(url).then(data => {
        let query = req.body.author;
        console.log('1111', query);
        let narrowedData = data.body.items[0].volumeInfo;
        const newBook = new Book(query, narrowedData);
        // console.log(data.body.items[0].volumeInfo);
        // const books = data.body.items
    })
})



app.get('*', (request, response) => response.status(404).send('This route does not exist'));


app.listen(PORT, () => console.log(`Listening on ${PORT}`));