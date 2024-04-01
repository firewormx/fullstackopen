const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
    {
        title: 'Taiwan News',
        author:'Kelly Tsai',
        url:'http://taiwan.com',
        likes: 110,
    },
    {
        title: 'Wuhan News',
        author: ' Fang Fang',
        url: 'http://wuhan.com',
        likes: 120,
    }
]

const testBlogs = [
    {
        title: 'Saginuma News',
        author: 'Mochida',
        url: 'http://kanagawa.com',
        likes: 130
    },
    {
        title: 'Aoba News',
        author: 'Aoba',
        url: 'http://aoba.com',
        likes: 140
    }
]

const malformedBlogs = [
    {
        title: 'Test without likes count',
        author: 'Mario',
        url: 'http://test.com/',
    },
    {
        author: 'Mario',
        url: 'http://testWithoutTitle.com/',
        likes: 30
    },
    {
        title: 'Test without author',
        url: 'http://testWithoutAuthor.com/',
        likes: 10,
    },

]


const initializeDb = async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('testpass', 10)
    const user = new User({ name: 'Nuria', username: 'nlin4575', password: passwordHash })
    const savedUser = await user.save()

    const blogsObjects = initialBlogs.map(blog => {
        blog.user = savedUser.id
        return new Blog(blog)//array of mongoose obj
    })

    await Promise.all(blogsObjects.map(blogObject => blogObject.save()))
}

const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async() => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async() => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const userForTests = async() => {
    const user = await User.findOne({ username: 'nlin4575' })
    return user
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb, initializeDb, userForTests, malformedBlogs, testBlogs
}