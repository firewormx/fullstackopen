// define routers. create notesRouter as a middleware with .Router() method of express.
const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

notesRouter.get('/', async(request, response) => {
    const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
    response.json(notes)
})

notesRouter.get('/:id', async(request, response) => {
    const note = await Note.findById(request.params.id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

notesRouter.post('/', async(request, response) => {
    const body = request.body
    //getTokenfrom() function isolates the token from the authorization header.
    //the validity of the token is c/ked with jwt.verify(token, process.env.SECRET).the method also decodes the token.
    //or returns the Obj which the token was based on
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    // decodedToken Obj contains username and id fields, tell the server who made the request.
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
        // if the token is missing or invalid, the exception JsonWebTokenError is raised.
        // need to extend the error handling middleware to fix it.
    }
    const user = await User.findById(decodedToken.id)

    const note = new Note({
        content: body.content,
        important : body.important === undefined ? false : body.important,
        user: user.id
    })
    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async(request, response) => {
    // eliminate the try-catch by using express-async-error library.
    // If an exception occurs in an async route, the execution is automatically passed to the error-handling middleware.
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

notesRouter.put('/:id', async(request, response) => {
    try {
        const body = request.body

        const note = {
            content: body.content,
            important: body.important,
        }

        const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
        response.json(updatedNote)
    }catch(error){
        console.error(error)
    }
})

module.exports = notesRouter
