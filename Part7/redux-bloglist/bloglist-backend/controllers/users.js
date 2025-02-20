const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async(request, response) => {
    const { username, name, password } = request.body
    if (!password) return response.status(400).json({ error: 'password is required' })
    if(password.length < 3){
        return response.status(400).json({ error: 'password should be set at least 3 characters long' })
    }
    const saltRounds = 10

    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        password: passwordHash
    })
    const savedUser = await user.save()

    response.status(201).json(savedUser)

})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { author: 1, url: 1, likes: 1,  title: 1 })
    response.json(users)
})

module.exports = usersRouter