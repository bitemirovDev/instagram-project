const express = require('express')
const app = express()
const logger = require('morgan')
const passport = require('passport')
const cors = require('cors')

const PORT = 8000;

app.use(express.static(__dirname + '/public'))
app.use(logger('dev')) // считывание и вывод запроса в консоль
app.use(express.urlencoded())  // считывание данных запроса формата urlencoded
app.use(express.json()) // считывание данных запроса формата json
app.use(passport.initialize())
app.use(cors())

app.use(require('./app/auth/routes'))
app.use(require('./app/posts/routes'))
app.use(require('./app/stories/routes'))
app.use(require('./app/comments/routes'))
app.use(require('./app/subscriptions/routes'))
app.use(require('./app/likes/routes'))

require('./config/passport-config') 

app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`);
})
