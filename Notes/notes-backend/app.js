// API declaration (server and database config) should reside in app.js
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')//library for eliminating the try-catch.
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

//connecting to database
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch(error => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
//json-parser middleware should be among the very first middleware loaded into Express
//it defineds request.body object
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)//attach notesRouter middleware to path '/api/notes'
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

//if the app is run in test-mode
if(process.env.NODE_ENV === 'test'){
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app