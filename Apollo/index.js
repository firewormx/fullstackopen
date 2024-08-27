const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const {WebSocketServer} = require('ws')
const {useServer} = require('graphql-ws/lib/use/ws')

const express = require('express')
const cors = require('cors')
const http = require('http')

const jwt = require('jsonwebtoken')
const mongoose =require('mongoose')
mongoose.set('strictQuery', false)

const User = require('./models/user')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

//setup is now within an async func
const start = async() => {
  //create schema, used separately by ApolloServer and the WebSocket server.
  const schema = makeExecutableSchema({typeDefs, resolvers})

  //create express app and HTTP server
  // will attach both the WebSocket server and ApolloServer to this HTTP server
  const app = express()
  const httpServer = http.createServer(app) 

  //create WebSocketServer using HTTP server to use as subscription server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/'
  })
//save the returned server's info so we can shutdown this server later
//WebSocketServer start listening the WebSocket connections(for subscriptions)
  const serverCleanup = useServer({schema}, wsServer)

  //setup ApolloServer
  const server = new ApolloServer({
    schema,
    plugins: [
      //Proper shutdown for the HTTP server
      ApolloServerPluginDrainHttpServer({httpServer}),
      //Proper shutdown for the WebSocket server
    {
      async serverWillStart(){
        return {
          async drainServer() {
            await serverCleanup.dispose()
          }
        }
      }
    }
    ]
  })
// must call start() on the 'Apollo Server' instance before passing it to 'expressMiddleware'
  await server.start()

//expressMiddleware func attach Apollo Server to Express app
  app.use(
    '/',
    cors(),
    express.json(),//req body parsing to JS 
    expressMiddleware(server, {// obj configuring ApolloServer
      context: async({req, res}) => {
        const auth = req ? req.headers.authorization : null
        if(auth && auth.startsWith('Bearer ')){
          const decodedToken = jwt.verify(
            auth.substring(7), process.env.JWT_SECRET
          )
          const currentUser = await User.findById(decodedToken.id).populate('friends')
          return {currentUser}
        }
          },
    })
  )

  const PORT = 4000
  
  // the server starts listening on the HTTP and WebSocket transports simultaneously
  httpServer.listen(PORT, () => 
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()