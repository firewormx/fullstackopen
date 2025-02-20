const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const config = require('../utils/config');

const loginRouter = require('express').Router();

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body;

    console.log('Login attempt:', { username, password });

    const user = await User.findOne({ username });

    if (!user) {
        return response.status(401).json({
            error: 'invalid username or password'
        });
    }

    console.log('User found:', user);

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
        return response.status(401).json({
            error: 'invalid username or password'
        });
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    };

    const token = jwt.sign(userForToken, config.JWT_SECRET, { expiresIn: '1h' });

    response
        .status(200)
        .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;

