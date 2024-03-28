// define routers. create blogsRouter as a middleware with .Router() method of express.
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async(request, response) => {
    const blog = await Blog.findById(request.params.id)
    if(blog){
        response.json(blog)
    }else{
        response.status(400).end()
    }
})
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

blogsRouter.post('/', async(request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const { title, url, author, likes } = body

    const blog = new Blog({
        title,
        author,
        url,
        likes: likes || 0,
        user: user._id
    })
    if(!title || !author){
        return  response.status(400).json({ error: 'title or author missing' })
    }else{
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
    }
})

blogsRouter.delete('/:id', async(request, response) => {
    const id = request.params.id
    const user = request.user
    const blog = await Blog.findById(id)

    if(!blog) return response.status(400).json({ error: `Blog by Id ${id} does not exist` })
    if(!request.token) return response.status(401).json({ error: 'token needed for deleting entries' })

    if(blog.user.toString() !== user._id.toString()){
        return response.status(401).json({ error: 'the blogs can only be deleted by the creator' })
    }else{
        await Blog.findByIdAndDelete(id)
        response.status(204).end()
    }
})

blogsRouter.put('/:id', async(request, response) => {
    const id = request.params.id
    const { title, author, url, likes } = request.body
    if(!title|| !author || !url || !likes ) return response.status(400).end()

    const newObj = {
        title,
        author,
        url,
        likes : likes || 0
    }
    const updatedObj = await Blog.findByIdAndUpdate(id, newObj, { new: true, runValidators: true, context: 'query' })
    response.json(updatedObj).expect(200)
})

module.exports = blogsRouter
