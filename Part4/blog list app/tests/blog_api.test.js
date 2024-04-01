/* eslint-disable indent */
const { after, beforeEach, test, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose =require('mongoose')
const app = require('../app')
const jwt = require('jsonwebtoken')

const api = supertest(app)
const helper =require('./test_helper')

let authorization

describe('Bloglist API testing', () => {

beforeEach(async() => {
 await helper.initializeDb()
 const user = await helper.userForTests()

 const userForToken = {
    username: user.username,
    id: user._id
 }
 const token = jwt.sign(userForToken, process.env.SECRET)
 authorization = `Bearer ${token}`
})

describe('Obtention of blogs from the database', () => {
    test('returns them in JSON format', async() => {
        const blogs = await api
            .get('/api/blogs')
            .set({ Authorization: authorization })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual( blogs.body.length, helper.initialBlogs.length)
    })
})

describe('Creating new blogs', () => {
    test('making a new blog by sending HTTP POST request', async() => {

const blogsAtStart = await helper.blogsInDb()

        await api
       .post('/api/blogs')
        .set({ Authorization: authorization })
            .send(helper.testBlogs[0])
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1 )
    })

    test('adding a blog fails without authorization and return status code 401', async() => {
        const blogsAtStart = await helper.blogsInDb()
        await api
        .post('/api/blogs')
        .send(helper.testBlogs[1])
        .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
    })


test('sets likes to 0 if not specified', async() => {
    const response = await api
        .post('/api/blogs')
        .set({ Authorization: authorization })
        .send(helper.malformedBlogs[0])
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogWithoutLikes = JSON.parse(response.text)

    assert.strictEqual(blogWithoutLikes.title, 'Test without likes count')
    assert.strictEqual(blogWithoutLikes.likes, 0)
})


test('fails if the blog has no title', async() => {
    const blogsAtStart = await helper.blogsInDb()
    await api
    .post('/api/blogs')
    .set({ Authorization: authorization })
    .send(helper.malformedBlogs[1])
    .expect(400)

    const blogs = await helper.blogsInDb()
    assert.strictEqual(blogs.length, blogsAtStart.length)

})


test('fails if the blog has no author', async() => {
    await api
    .post('/api/blogs')
    .set({ Authorization : authorization })
    .send(helper.malformedBlogs[2])
    .expect(400)

    const blogs = await helper.blogsInDb()
    assert.strictEqual(blogs.length, helper.initialBlogs.length)
})
})

test('fails if no token is provided', async() => {
    const blogsAtStart = await helper.blogsInDb()
    await api
    .post('/api/blogs')
    .send(helper.initialBlogs[0])
    .expect(401)

const blogs = await helper.blogsInDb()
assert.strictEqual(blogs.length, blogsAtStart.length)
})


describe('deleting a single blog post', () => {
    test('delete the specific post by id', async() => {

        const blogsAtStart = await helper.blogsInDb()
        const deleteBlog = blogsAtStart[0]
        await api
            .delete(`/api/blogs/${deleteBlog.id}`)
            .set({ Authorization : authorization })
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        assert(blogsAtEnd.length, helper.initialBlogs.length -1 )
        const titles = blogsAtEnd.map(blog => blog.title)
        assert(!titles.includes(deleteBlog.title))
    })

    test('does nothing if the id does not exist', async() => {
        const unexistingId = await helper.nonExistingId()

        await api
        .delete(`/api/blogs/${unexistingId}`)
        .set({ Authorization: authorization })
        .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
})

describe('update the info of an existing post', () => {
    test('succeeds if correct value are provided', async() => {
        const blogsAtStart = await helper.blogsInDb()
        const updateBlog = blogsAtStart[0]
        const newInfo = { ...updateBlog, likes: 160 }

        await api.
        put(`/api/blogs/${updateBlog.id}`)
        .set({ Authorization : authorization })
            .send(newInfo)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        const likes = blogsAtEnd.map(blog => blog.likes)

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
        assert(blogsAtEnd[0].likes, 160)
        assert(likes.includes(160))
    })

    test('does nothing if id does not exist', async() => {
        let blogs = await helper.blogsInDb()
        let blogToUpdate = blogs[0]

        const unexistingId = await helper.nonExistingId()

        const response = await api
            .put(`/api/blogs/${unexistingId}`)
            .set({ Authorization: authorization })
            .send(blogToUpdate)
            .expect(200)

        const updatedBlog = JSON.parse(response.text)

        assert(!updatedBlog)
    })

    test('fails if no title is provided', async() => {
        let blogs = await helper.blogsInDb()
        let blogToUpdate = blogs[0]
        delete blogToUpdate.title

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .set({ Authorization: authorization })
            .send(blogToUpdate)
            .expect(400)
    })
})


test('making a new blog by sending HTTP POST request', async() => {
const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
        title: 'Shibuya News-test',
        author: 'Hachiko-test',
        url: 'http://shibuya.com',
        likes: 180,
    }
    await api.post('/api/blogs')
    .set({ Authorization: authorization })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1 )
})

test('blog can be added without likes', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog ={
        title: 'Ikebukuro News-test',
        author: 'Chuka-test',
        url: 'http://ikebukuro.com',
    }
    await api.post('/api/blogs')
    .set({ Authorization: authorization })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/ )

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)

})

test('password must be longer than 3 characters', async() => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
        username: 'sth',
        name: 'testman',
        password: 'op'
    }
   await api
        .post('/api/users/')
        .set({ Authorizatiojn: authorization })
        .send(newUser)
        .expect(400)
        .expect('Content-Type',/application\/json/)

    const userAtEnd = await helper.usersInDb()

    assert.strictEqual(userAtStart.length, userAtEnd.length)
})

test('username must be longer than 3 characters', async() => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
        username: 'hi',
        name: 'test2',
        password: 'oppof'
    }
    await api
        .post('/api/users/')
        .set({ Authorizatiojn: authorization })
        .send(newUser)
        .expect(400)

    const userAtEnd = await helper.usersInDb()
    assert.strictEqual(userAtStart.length, userAtEnd.length)
})

test('creation succeeds with a fresh username', async() => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
        username: 'blogapi',
        name: 'success',
        password: 'kaponka',
    }

    await api
        .post('/api/users/')
        .set({ Authorization: authorization })
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const userAtEnd = await helper.usersInDb()
    assert.strictEqual(userAtEnd.length, userAtStart.length + 1)

    const usernames = userAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
})

test('creation fails with proper status code and message if username already taken', async() => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: 'nlin4575',
        name: 'SHE',
        password: 'serena',
    }

    await api
        .post('/api/users')
        .set({ Authorization: authorization })
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})
})

after(async() => {
    await mongoose.connection.close()
})