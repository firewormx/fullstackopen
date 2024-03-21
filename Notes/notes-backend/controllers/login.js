const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)
        //PW are not saved to database.bcrpy.compare() is used to check if PW is correct.then attach to the request.

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })// 401 Unauthorized
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 })//token expires in 60 * 60 secondes
    // a token is creaetd with the method jwt.sign.The token contains the username and the user id in a digitally signed form.
    // The token has been digitally signed using a string from the environment variable SECRET as the secret.
    // limit the validity period of a token to avoid token holder access right is revoked. once token expires, user needs to re-login.

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter