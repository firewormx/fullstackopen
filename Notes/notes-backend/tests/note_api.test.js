/* eslint-disable @stylistic/js/indent */
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')//package for testing the API
const mongoose = require('mongoose')
const app = require('../app')// the test only use the Express app defined in app.js, which does not listen to any ports.
const api = supertest(app)// so-called superagent object.tests can use it for making http requests to the backend.


const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const User = require('../models/user')
const Note = require('../models/note')


// initailize  the database before every test with the beforeEach function.
//by doing below, we ensure the database is in the same state before every test is run.
//improve the test readability by group related tests with describe blocks.
describe('when there is initially some notes saved', () => {
    beforeEach(async () => {
        await Note.deleteMany({})
        await Note.insertMany(helper.initialNotes)
        // const notesObject = helper.initialNotes.map(note => new Note(note))
        // const promiseArray = notesObject.map(note => note.save())
        // await Promise.all(promiseArray) // Promise.all() for transforming an array of promises into a single promise.
    })

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)//regular expression /.../, short for regex.
})


test('all notes are returned', async () => {
    const response = await api.get('/api/notes')
    assert.strictEqual(response.body.length, helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.content)
    assert(contents.includes('Browser can execute only JavaScript'))//assert(function)
})

describe('viewing a specific note', () => {

    test('succeeds with a valid id', async () => {
        const notesAtStart = await helper.notesInDb()
        const noteToView = notesAtStart[0]

        const resultNote = await api
          .get(`/api/notes/${noteToView.id}`)
          .expect(200)
          .expect('Content-Type', /application\/json/)

          assert.deepStrictEqual(resultNote.body, noteToView)//check for two objects contain the same properties and values, not from the same reference.
          //assert.strictEqual(JSON.stringify(resultNote.body.toString()), JSON.stringify(NoteToView.toString()))
    })

    test('fails with status code 404 if note does not exist', async() => {
        const validNonexistingId = await helper.nonExistingId()
        await api.get(`/api/notes${validNonexistingId}`)
        .expect(404)
    })


test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/notes/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new note', () => {
    test('succeeds with valid data', async () => {
            const newNote ={
                content:'async/await simplifies making async calls',
                important: true
            }

            await api
                .post('/api/notes')
                .send(newNote)
                .expect(201)//code status 200 means OK, 201 means CREATED.
                .expect('Content-Type', /application\/json/)

            const notesAtEnd = await helper.notesInDb()
            assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

            const contents = notesAtEnd.map( n => n.content)
            assert(contents.includes('async/await simplifies making async calls'))
            //varify if the parameter is truthy.assert.ok(value[,message])
        })


    test('fails with status code 400 if data invalid', async() => {
        const newNote ={
            important: true
        }

        await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)

        const notesAtEnd = await helper.notesInDb()// same as const response = await api.get('/api/notes')

       assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
    })
})

describe('deletion of a note', () => {

    test('succeeds with status code 204 if id is valid', async () => {
        const notesAtStart = await helper.notesInDb()
        const noteToDelete = notesAtStart[0]

        await api
          .delete(`/api/notes/${noteToDelete.id}`)
          .expect(204)

        const notesAtEnd = await helper.notesInDb()

        assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)

        const contents = notesAtEnd.map(r => r.content)
        assert(!contents.includes(noteToDelete.content))
      })
})
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })//adds a user with the username 'root' to database.

      await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })

      test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }

        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      })

  })
//close the database connection by Mongoose with after method.
  after(async () => {
    await User.deleteMany({})
      await mongoose.connection.close()
  })

//OR  beforeEach(async() => {
//  await Note.deleteMany({})
//  for(let note of helper.initialNotes){
//    let notesObject = new Note(note)
//     await notesObject.save()
// }
// })

//only method of test to only execute one or two tests via npm test -- --test-only command.
// Another option is to specify the tests that need to be run as parameters of the npm test command.
//e.g npm test --tests/note_api.test.js
//e.g npm test -- --test-name-pattern='the first note is about HTTO methods'
//e.g the parameter can also contain part of the name.e.g npm run test -- --test-name-pattern='notes'



