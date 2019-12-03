const db = require('./db')
const utils = require('./utils')
const express = require('express')
const multer = require('multer')
const upload = multer({dest:'thumbnails/'})

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from movie`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.get('/details/:movie_id', (request, response) => {
    const {movie_id} = request.params
    const connection = db.connect()
    const statement = `select movie.*, genre.title as genre_title from movie,genre where movie_genre = genre.id and movie.id = ${movie_id}`
    connection.query(statement, (error, movie) => {
        connection.end()
        if(movie.length > 0){
            response.send(utils.createResult(error,movie[0]))
        }else{
            response.send(utils.createResult('movie not exist'))
        }
    })
})

router.get('/genre/:movie_id', (request, response) => {
    const {movie_id} = request.params
    const connection = db.connect()
    const statement = `select * from movie where genre = ${movie_id}`
    connection.query(statement, (error, movie) => {
        connection.end()
        
            response.send(utils.createResult(error,movie))
        
    })
})

router.post('/',upload.single('thumbnail'),(request, response) => {
    const {title,description, rating, actors, director, writer, genre, viodeurl} = request.body
    const thumbnail =request.file.filename
    

    const connection = db.connect()
    const statement = `insert into movie (title,description, rating, actors, director, writer, genre,thumbnail,viodeurl) values ('${title}', '${description}', '${rating}', '${actors}', '${director}', '${writer}', '${genre}', '${thumbnail}', '${viodeurl}')`
    connection.query(statement, (error, data) => {
        console.log(data)
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.put('/:movie_id',(request, response) => {
    const {movie_id} = request.params
    const {title,description, rating, actors, director, writer, genre, viodeurl} = request.body
    
    const connection = db.connect()
    const statement = `update movie set title='${title}',description='${description}', rating='${rating}', actors='${actors}', director='${director}', writer='${writer}', genre='${genre}',viodeurl='${viodeurl}' where movie_id=${movie_id}`
    connection.query(statement, (error, data) => {
        console.log(data)
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:movie_id', (request, response) => {
    const {movie_id} = request.params
    
    const connection = db.connect()

    const statement = `delete from movie where movie_id=${movie_id}`
        connection.query(statement,(error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })    
})





router.put('/:movie_id', (request, response) => {
    const {movie_id} = request.params
    const {title} = request.body
    const connection = db.connect()
    const statement = `update movie set title = '${title}' where movie_id = ${movie_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router