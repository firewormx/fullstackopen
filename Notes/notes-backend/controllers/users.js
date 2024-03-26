const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    //store the hash of the password that is generated with bcrype.hash()function.

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

usersRouter.get('/', async(request, response) => {
    //Mongoose join is done with populate method, returns an array of note documents
    //instead of ids referencing note objs in the nots field of the user document.
    // use the populate parameter for choosing the fields we want to include from documents.
    const users = await User.find({}).populate('notes', { content: 1, important: 1 } )
    response.json(users)
})

module.exports = usersRouter