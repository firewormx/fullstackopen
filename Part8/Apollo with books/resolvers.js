const {v1: uuid} = require('uuid')
const {GraphQLError} = require('graphql')
const jwt = require('jsonwebtoken')

const Author = require('./models/Author');
const Book = require('./models/Book')
const User = require('./models/User')

const resolvers = {
    Query: {
      bookCount: async() =>  Book.collection.countDocuments(),
      authorCount: async() =>  Author.collection.countDocuments(),
      allBooks: async(root, args) => {
      // let query = {}

      // if(args.author){
      //   const foundAuthor = await Author.findOne({name: args.author})
      //   if(!foundAuthor) return []
      // query.author = foundAuthor._id
      // }
      //  if(args.genre){
      //   query.genres = {$in: [args.genre]}
      // }

      // const books = await Book.find(query).populate('author')
      // return books

        if(args.genre && args.author){
          const foundAuthor =  await Author.find({name: args.author})
       return Book.find({ author: foundAuthor._id, genres:{$in: [args.genre]} }).populate('author')
        }else if (args.author){
          return Book.find({author: foundAuthor._id}).populate('author')
        }else if (args.genre){
      return Book.find({genres: {$in: [args.genre]}}).populate('author')
        }else {
          return Book.find({}).populate('author')
        }
      },
    allAuthors: async() =>  Author.find({}).populate('books'),
    me: (root, args, context)=> context.currentUser
   },
   Author: {
    bookCount: async(root) => {
        // const count = books.filter(book => book.author === root.name).length
        const count = await Book.find({author: root.name})
        return count.length
    }
  },
    Mutation: {
      addBook:async(root, args, context) => {
     const newBook = new Book({...args, id: uuid()})
     if(args.title.length < 5){
      throw new GraphQLError('invalid argument length', {
        extentions:{
          code:'BAD_USER_INPUT',
          invalidArgs: args.title, error
        }
      })
     }
    //  const currentBook = context.currentBook
    //  if(!currentBook){
    //   throw new GraphQLError('not authenticated', {
    //     extensions:{
    //       code:'BAD_USER_INPUT'
    //     }
    //   })
    //  }
     try{
     newBook.save()
    //  currentBook.author = currentBook.author.concat(newBook)
    await Book.concat(newBook)
    await Book.save()
    
     }catch(error){
      throw new GraphQLError('Adding book failed', {
        extensions:{
          code: 'BAD_USER_INPUT',
          invalidaArgs: args.title, error
        }
      })
     }
     return newBook
      },
  
      editAuthor: async (root, args) => {
        const existAuthor = await Author.findOne({name: args.name})
      if(!existAuthor) return null
      else{
        existAuthor.born = args.setBornTo
        try{
        existAuthor.save()
        }catch(error){
          throw new GraphQLError('Saving number failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name, error
            }
          })
        }
        return existAuthor
      }
      },
  
      addAuthor: async(root, args) => {
  const newAuthor = new Author({...args, id: uuid()})
if(args.name.length < 4) {
  throw new GraphQLError('invalid argument length', {
    extensions: {
      code:'BAD_USER_INPUT',
      invalidArgs: args.name, error
    }
  })
}
  await newAuthor.save()
  await Author.concat(newAuthor)
  await Author.save()
  return newAuthor
      },
  
      createUser: async(root, args) => {
  const user = new User({
    username: args.username,
    favoriteGenre: args.favoriteGenre,
  })
  try{
  await user.save()
  }catch(error){
    throw new GraphQLError('Creating the user failed', {
      extensions:{
        code:'BAD_USER_INPUT',
        invalidArgs: args.name, error
      }
    })
  }
 return user
      },
      login: async(root, args)=>{
  const user = await User.findOne({username: args.username})
  if(!user || args.password !== 'secret'){
    throw new GraphQLError('wrong credentials', {
      extensions:{
        code:'BAD_USER_INPUT'
      }
    })
  }
  const userForToken ={
    username: user.username,
    id: user._id
  }
  return {value: jwt.sign(userForToken, process.env.SECRET)}
      }
    }
  }
  module.exports = resolvers
