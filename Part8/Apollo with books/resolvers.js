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
        try{
      const foundAuthor =  await Author.findOne({name: args.author})
      if (args.author){
          return await Book.find({author: foundAuthor.id}).populate('author')
        }else if (args.genre){
      return await Book.find({genres: {$in: [args.genre]}}).populate('author')
        }else if(args.genre && args.author){
         return await Book.find({ author: foundAuthor.id, genres:{$in: [args.genre]} }).populate('author')
          }else{
            return await Book.find({}).populate('author')
          }
        }catch(error){
          console.log(error)
        }
      },
    allAuthors: async() =>  Author.find({}).populate('books'),
    me: (root, args, context)=> context.currentUser
   },
   Author: {
    bookCount: async(root) => {
        const foundAuthor = await Author.findOne({name: root.name})
        const foundBooks = await Book.find({author: foundAuthor.id})
        return foundBooks.length
    }
  },
    Mutation: {
      addBook:async(root, args, context) => {
     const currentUser= context.currentUser
     const existAuthor = await Author.findOne({name: args.author})

     if(!currentUser){
      throw new GraphQLError('not authenticated', {
        extensions:{
          code:'BAD_USER_INPUT'
        }
      })
     }
     if(!existAuthor){
      try{
        const newAuthor = new Author({name: args.author})
        await  newAuthor.save()
        const newBook = new Book({...args, author: newAuthor.id})
        await newBook.save()
        newAuthor.books = newAuthor.books.concat(newBook.id)
        await newAuthor.save()
        return newBook
      }catch(error){
      throw new GraphQLError('creating new author failed', {
        extensions: {
          code: "BAD_USER_INPUT",
          invalidArgs: args.author, error
        }
      })
      }
     }
     const newBook = new Book({...args, author: existAuthor.id})
     try{
     await newBook.save()
    existAuthor.books = existAuthor.books.concat(newBook.id)
    await existAuthor.save()
     }catch(error){
      throw new GraphQLError('Adding book failed', {
        extensions:{
          code: 'BAD_USER_INPUT',
          invalidaArgs: args, error
        }
      })
     }
     return newBook
      },
  
      editAuthor: async (root, args, {currentUser}) => {
        const existAuthor = await Author.findOne({name: args.name})
     if(!currentUser){
    throw new GraphQLError('not authenticated', {
      extensions: {
        code: 'BAD_USER_INPUT'
      }
    })
     }
      if(!existAuthor) return null
      else{
        existAuthor.born = args.setBornTo
        try{
        await existAuthor.save()
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
  const exsitingAuthor = await Author.findOne({name: args.name})
  if(exsitingAuthor){
    throw new GraphQLError('exsiting author', {
      extensions:{
        code:'BAD_USER_INPUT'
      }
    })
  }
  const newAuthor = new Author({...args, id: uuid()})
if(args.name.length < 4) {
  throw new GraphQLError('invalid argument length', {
    extensions: {
      code:'BAD_USER_INPUT',
      invalidArgs: args.name, error
    }
  })
}
try{
  await newAuthor.save()
  await Author.concat(newAuthor)
  await Author.save()
}catch(error){
console.log(error)
}
 
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
