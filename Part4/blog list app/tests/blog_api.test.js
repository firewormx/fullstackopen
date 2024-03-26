const { after, beforeEach, test, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose =require('mongoose')
const app = require('../app')
const bcrypt = require('bcrypt')

const api = supertest(app)
const Blog = require('../models/blog')
const helper =require('./test_helper')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))//array of mongoose obj
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('HTTP GET request', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('the unique identifier property of the blog posts is named id', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api.get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type',/application\/json/)

    assert.deepStrictEqual(resultBlog.body, blogToView)
})

test('making a new blog by sending HTTP POST request', async() => {

    const newBlog = {
        title: 'Shibuya News-test',
        author: 'Hachiko-test',
        url: 'http://shibuya.com',
        likes: 180,
    }
    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1 )
})

test('blog can be added without likes', async() => {
    const newBlog ={
        title: 'Ikebukuro News-test',
        author: 'Chuka-test',
        url: 'http://ikebukuro.com',
    }
    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/ )

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

})

test('blog cannot be added without title or url', async() => {
    const newBlog = {
        author: 'Caien'
    }
    await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

describe('deleting a single blog post', () => {
    test('delete the specific post by id', async() => {

        const blogsAtStart = await helper.blogsInDb()
        const deleteBlog = blogsAtStart[0]
        await api.delete(`/api/blogs/${deleteBlog.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        assert(blogsAtEnd.length, helper.initialBlogs.length -1 )
    })

})

describe('update the info of an existing post', () => {
    test('update the information of an individual post', async() => {
        const blogsAtStart = await helper.blogsInDb()
        const updateBlog = blogsAtStart[0]
        const newInfo = { ...updateBlog, likes: 160 }

        await api.put(`/api/blogs/${updateBlog.id}`)
            .send(newInfo)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
        assert(blogsAtEnd[0].likes, 160)
    })
})

test('password must be longer than 3 characters', async() => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
        username: 'sth',
        name: 'testman',
        password: 'op'
    }
    const result = await api
        .post('/api/users/')
        .send(newUser)
        .expect(400)
        .expect('Content-Type',/application\/json/)

    const userAtEnd = await helper.usersInDb()

    assert(result.body.error.includes('`password` length is shorter than 3 characters'))
    assert.strictEqual(userAtStart.length, userAtEnd.length)
})

test('username must be longer than 3 characters', async() => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
        username: 'hi',
        name: 'test2',
        password: 'oppof'
    }
    const result = await api
        .post('/api/users/')
        .send(newUser)
        .expect(400)
        .expect('Content-Type',/application\/json/)

    const userAtEnd = await helper.usersInDb()

    assert(result.body.error.includes('`username` length is shorter than 3 characters'))
    assert.strictEqual(userAtStart.length, userAtEnd.length)
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


after(() => {
    mongoose.connection.close()
})