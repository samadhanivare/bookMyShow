const db = require('./db')
const utils = require('./utils')
const express = require('express')
//const cryptoJs = require('crypto-js')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from user`
    connection.query(statement, (error, data) => {
        connection.end()
        const users = []
        for (let index = 0; index < data.length; index++) {
            const user = data[index]
            users.push({
                user_id: user['user_id'],
                username: user['username'],
                email: user['email']
            })
        }
        response.send(utils.createResult(error, users))
    })
})

router.post('/login', (request, response) => {
    const {email, password} = request.body
    //const encryptedPassword = '' + cryptoJs.MD5(password)
    
    const connection = db.connect()
    const statement = `select * from user where email = '${email}' and password = '${password}'`//'${encryptedPassword}'`
    connection.query(statement, (error, users) => {
        connection.end()
        
        if (users.length == 0) {
            response.send(utils.createResult('user does not exist'))
        } else {
            const user = users[0]
            const info = {
                username: user['username'],
                email: user['email']
            }
            response.send(utils.createResult(null, info))
        }
    })
})

router.post('/register', (request, response) => {
    const {username,email,password} = request.body
    //const encryptedPassword = '' + cryptoJs.MD5(password)
  
    const connection = db.connect()

    const statement1 = `select * from user where email = '${email}'`
    connection.query(statement1, (error, users) => {

        if (users.length == 0) {
            const statement = `insert into user (username, email, password) values ('${username}', '${email}', '${password}')`//'${encryptedPassword}')`
            connection.query(statement, (error, data) => {
                connection.end()
                response.send(utils.createResult(error, data))
            })
        } else {
            connection.end()
            response.send(utils.createResult('email exists. please use another email.'))
        }
    })    
})

// router.post('/register', (request, response) => {
//     const {username,email,password} = request.body
//     const connection = db.connect()
//     const statement = `insert into user (username, email, password) values ('${username}', '${email}', '${password}')`
//         connection.query(statement, (error, data) => {
//         connection.end()
//         response.send(utils.createResult(error, data))
//         })
// })

module.exports = router