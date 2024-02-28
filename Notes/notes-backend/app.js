// API declaration (server and database config) should reside in app.js
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
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

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app