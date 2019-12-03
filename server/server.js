const express = require('express')
const bodyParser = require('body-parser')

const routerUser = require('./user')
const routerMovie = require('./movie')
const routerGenre = require('./genre')

const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(bodyParser.json())
app.use(express.static('thumbnails'))
app.use('/user', routerUser)
app.use('/movie',routerMovie)
app.use('/genre',routerGenre)

app.listen(4000, '0.0.0.0', () => {
    console.log('server started  on port 4000')
})