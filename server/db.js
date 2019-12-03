const mysql = require('mysql')

function connect() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'dmc',
        password: 'dmc',
        database: 'movies_db',
        port: 3306
    })

    connection.connect()
    return connection
}

module.exports = {
    connect: connect
}