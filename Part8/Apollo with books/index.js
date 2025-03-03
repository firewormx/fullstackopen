const { ApolloServer } = require('@apollo/server')
const {WebSocketServer} = require('ws')
const {useServer} = require('graphql-ws/lib/use/ws')

const {expressMiddleware} = require('@apollo/server/express4')
const {ApolloServerPluginDrainHttpServer} = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')
const path = require('path')

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

mongoose.set('debug', true)

const start = async() => {
const app = express()
const httpServer = http.createServer(app)

const wsServer = new WebSocketServer({
server: httpServer,
path:'/graphql'
})

const schema = makeExecutableSchema({typeDefs, resolvers})
const wsServerCleanup = useServer({schema}, wsServer)

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({httpServer}),
  {
    async serverWillStart(){
      return {
        async drainServer() {
          await wsServerCleanup.dispose()
        }
      }
    }
  }
  ]
})

await server.start()

app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async({req}) => {
  const auth = req ? req.headers.authorization : null 
  if(auth && auth.startsWith('Bearer ')){
    const decodedToken = jwt.verify(
      auth.substring(7), process.env.SECRET
    )
    const currentUser = await User.findById(decodedToken.id)
    return {currentUser}
  }
    }
  })
)
  // Serve static files from the dist directory
  app.use(express.static(path.join(__dirname, 'dist')));

    // Serve the frontend application
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
const PORT = 4000 

httpServer.listen(PORT, () => 
  console.log(`Server is now running on http://localhost:${PORT}/graphql`)
)
}

start()