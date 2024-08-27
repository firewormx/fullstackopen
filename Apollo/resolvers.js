const {PubSub} = require('graphql-subscriptions')
const pubsub = new PubSub()

const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Person = require('./models/person')
const User = require('./models/user')

const resolvers = {
    Query: {
      personCount: async() => Person.collection.countDocuments(),
      allPersons: async(root, args, context) => {
        if(!args.phone){
          return Person.find({})
        }
  return Person.find({phone: {$exists: args.phone === 'YES'}})
      },
      findPerson: async(root, args) => Person.findOne({name: args.name}),
      me: (root, args, context) =>{
          return context.currentUser
            }
    },
    Person: {//self-defined resolver for address field.root is the person-object
      address: (root) =>{
        return {
          street: root.street,
          city: root.city
        }
      }
    },
    Mutation: {
    addPerson: async(root, args, context) => {
      const person = new Person({...args})
      const currentUser = context.currentUser
      if(!currentUser){
        throw new GraphQLError('not authenticated', {
          extensions:{
            code:'BAD_USER_INPUT'
          }
        })
      }
      try{
        await person.save()
        currentUser.friends = currentUser.friends.concat(person)
        await currentUser.save()
      }catch(error){
        throw new GraphQLError('Saving person failed', {
          extensions:{
            code: 'BAD_USER_INPUT',
            invalidaArgs: args.name,error
          }
        })
      }
      //publishing an event. pubsub.publish('eventLabelName', payload associated with the event)
      //Adding a new person publishes a notification about the operation to all subscribers with PubSub's method publish
      //Execution of this line sends a WebSocket message about the added person to all the clients registered in the iterator PERSON_ADDED.
     pubsub.publish('PERSON_ADDED', {personAdded: person})
    
     return person
    },
    editNumber: async(root, args) =>{
    const person = await Person.findOne({name: args.name})
    person.phone = args.phone
    try{
      await person.save()
    }catch(error){
      throw new GraphQLError('Saving number failed', {
        extensions: {
          code: 'BAD_USER_INPUT',
          invalidArgs: args.name, error
        }
      })
    }
    return person
    },
    createUser: async(root, args) => {
     const user =  new User({username: args.username})
     try{
      await user.save()
     }catch(error){
      throw new GraphQLError('Creating new user failed', {
        extensions:{
          code:'BAD_USER_INPUT',
          invalidArgs: args.name, error
        }
      })
     }
    },
    login: async(root, args) => {
    const user = await User.findOne({username: args.username})
    if(!user || args.password !== 'secret'){
      throw new GraphQLError('wrong credentials', {
        extensions: {
          code: 'BAD_USER_INPUT'
        }
      })
    }
    const userForToken = {
      username: user.username,
      id: user._id
    }
    return {value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    },
  
    addAsFriend: async(root, args, {currentUser}) => {
    const isFriend = (person) => {
    currentUser.friends.map(f => f._id.toString().includes(person._id.toString()))
    }
    if(!currentUser){
      throw new GraphQLError('wrong credentials', {
        extensions: {
          code:"BAD_USER_INPUT"
        }
      })
    }
    const person = await Person.findOne({name: args.name})
    if(!isFriend(person)){
      currentUser.friends = currentUser.friends.concat(person)
    }
    await currentUser.save()
    return currentUser
    }
    },
    Subscription: {
      personAdded: {
        // subcribe func must return an AsyncIterator obj
        //AsyncIterator obj listen for events that are associated with a paticular label(or sets of labels)
        // and adds them to a queue for processing. pubsub.asyncIterator(['event label name'])
        subscribe: () => pubsub.asyncIterator('PERSON_ADDED')
      }
    }
  }

  module.exports = resolvers