//import the environment variable defined in the .env file
const express = require('express')
const app = express()
require('dotenv').config()

const Note = require('./models/note')
app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('--')
    next()
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if(error.name === 'CastError'){
        return  response.status(400).send({ error: 'malformatted id' })
    }else if(error.name === 'ValidationError'){
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

const cors= require('cors')
app.use(cors())
// json-parser middleware should be among the very first middleware loaded into Express
//it defineds request.body object
app.use(express.json())
app.use(requestLogger)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// let notes = [
//   {
//     id: 1,
//     content: "HTML is hard,port 3004 of backend server",
//     important: true
//   },
//   {
//     id: 2,
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   },
//   {
//     id:4,
// content:"test for nodemon",
// important: false
// },
// {
//     id: 5,
//     content: "ready for render",
//     important: true
// }
// ]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!! Have fun!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

// const generatedId = () =>{
//     const maxId= notes.length > 0
//     ? Math.max(...notes.map(note =>note.id))
//     :0
// return maxId + 1;
// }

app.post('/api/notes', (request,response, next) => {
    const body = request.body

    //  if(body.content === undefined){
    //   return response.status(400).json({error: `content missing`})
    //  } rewrite this in schema of models/note.js
    const note = new Note({
        content: body.content,
        important: body.important || false
    })
    note.save().then(savedNote => {
        response.json(savedNote)
    })
        .catch(error => next(error))
//    const note={
//     content: body.content,
//     important: Boolean(body.important) || false,
//     // date: newDate(),
//     id: generatedId()
//    }
//  notes = notes.concat(note);
//  response.json(note);
})

//   app.get(`/api/notes/:id`, (request, response)=>{
//     const id = Number(request.params.id);
//     console.log(id);
//     const note = notes.find(note => {
//       // console.log(note.id, typeof note.id, id, typeof id, note.id === id)
//         return note.id === id});
//    note ? response.json(note) : response.status(404).end();
// response.json(note);
// });

app.get('/api/notes/:id',(request, response, next) => {
    // model.findById() method
    Note.findById(request.params.id)
        .then(note => {
            if(note){
                response.json(note)
            }else{
                response.status(404).end()
            }
        }).catch(error => next(error)
            // console.log(error);
            // response.status(400).send({error: `malformatted id`});
        )
})

app.delete('/api/notes/:id', (request, response, next) => {
    // console.log(id)
    // notes = notes.filter(note => note.id !== id)
    Note.findByIdAndDelete(request.params.id)
    // deleting a note that exsits or does not exist in the database,
    //the response with teh status 204 no content
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
    const { content, important } = request.body
    // const id = Number(request.params.id);

    // const note ={
    //   content: body.content,
    //   important: body.important
    // }

    Note.findByIdAndUpdate(
        request.params.id,
        { content, important },
        { new: true, runValidators: true, context:'query' })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

// app.put(`/api/notes/:id`, (request, response)=>{
//  const id = Number(request.params.id);
//  const body = request.body;

//  const changedNote ={
//   content: body.content,
//   important: body.important,
//   id: body.id
//  }
//  notes = notes.map(note => note.id !== id ? note : changedNote);
// changedNote ?response.json(changedNote) :response.status(404).end();
// response.json(changedNote)

// })

//handler of requests with unknown endpoint
app.use(unknownEndpoint)

//error handler middleware nedds to comde at the very end, next to unknown endpoint handler
//This has to be the last loaded middleware, also all the routes should be rregistered before this!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen((PORT), () => {
    console.log(`Server running on port ${PORT}`)
})
