// define routers. create notesRouter as a middleware with .Router() method of express.
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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

blogsRouter.post('/', async(request, response) => {
    const body = request.body
    const { title, url, author, likes } = body
    const user = await User.findById(body.userId)
    // const user = await User.findOne({})
    const blog = new Blog({
        title: title || undefined,
        author: author || undefined,
        url,
        likes: likes || 0,
        user: user.id
    })

    if(title === undefined|| url=== undefined){
        response.status(400).end()
    }else{
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()

})

blogsRouter.put('/:id', async(request, response) => {
    const body =request.body

    const newObj = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }
    const updatedObj = await Blog.findByIdAndUpdate(request.params.id, newObj, { new: true })
    response.json(updatedObj).expect(200)
})

module.exports = blogsRouter
