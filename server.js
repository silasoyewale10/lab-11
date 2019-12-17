const express = require('express');
const ejs = require('ejs');
// const superagent = require('superagent');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));
// new middleware is urlencoded
app.use(express.urlencoded( {extended:true} ));


app.set('view engine', 'ejs');


app.get('/hello', (req, res) => {
    res.render('pages/index');
})





app.get('*', (request, response) => response.status(404).send('This route does not exist'));


app.listen(PORT, () => console.log(`Listening on ${PORT}`));