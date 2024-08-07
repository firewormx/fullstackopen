const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
require('dotenv').config()

const jwt = require('jsonwebtoken')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const User = require('./models/User')
const Author = require('./models/Author')
const Book = require('./models/Book')

mongoose.set('strictQuery', false)

const MONGODB_URI = process.env.MONGODB_URI;
console.log('connecting to ', MONGODB_URI)

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('connecting to MongoDB')
})
.catch(error => { console.log('error connection to MongoDB:', error.message)})

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async({req, res}) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.startsWith('Bearer ')){
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return {currentUser}
    }
      }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})