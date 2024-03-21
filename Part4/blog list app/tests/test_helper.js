const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Taiwan News',
        author:'Kelly Tsai',
        url:'http://taiwan.com',
        likes: 110
    },
    {
        title: 'Wuhan News',
        author: ' Fang Fang',
        url: 'http://wuhan.com',
        likes: 120,
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async() => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}