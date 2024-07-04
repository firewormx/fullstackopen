const commentsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

commentsRouter.get('/:id/comments', async(request, response) => {
    const blog = await Blog.findById(request.params.id)
    const comments = await Comment.find({ blog }) //find all comment docs match the blog
    return response.json(comments)
})

commentsRouter.post('/:id/comments', async(request, response) => {
    const body = request.body
    const blog = await Blog.findById(request.params.id)

    const comment = new Comment({
        content: body.content,
        blog: blog.id
    })
    const savedComment = await comment.save()
    return response.status(201).json(savedComment)
})

module.exports = commentsRouter