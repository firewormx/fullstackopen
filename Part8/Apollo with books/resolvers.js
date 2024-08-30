const {v1: uuid} = require('uuid')
const {GraphQLError} = require('graphql')
const jwt = require('jsonwebtoken')
const {PubSub} = require('graphql-subscriptions')
const pubsub = new PubSub()
const Author = require('./models/Author');
const Book = require('./models/Book')
const User = require('./models/User')

const resolvers = {
    Query: {
      bookCount: async() =>  await Book.collection.countDocuments(),
      authorCount: async() =>  await Author.collection.countDocuments(),
      allBooks: async(root, args) => {
      const foundAuthor =  await Author.findOne({name: args.author})
      if(args.genre && args.author){
        return await Book.find({ author: foundAuthor.id, genres:{$in: [args.genre]} }).populate('author')
         }else if (args.author){
          return await Book.find({author: foundAuthor.id}).populate('author')
        }else if (args.genre){
      return await Book.find({genres: {$in: [args.genre]}}).populate('author')
        }else{
            return await Book.find({}).populate('author')
          }
      },
    allAuthors: async() =>  {
      const authors = await Author.find({}).populate('books')
      const bookCountAuthors = authors.map(author => {
        return {
          name: author.name,
          born: author.born,
          bookCount: author.books.length,
          id: author._id,
          books: author.books
        }
      })
      return bookCountAuthors
    },
    me: (root, args, context)=> context.currentUser
   },
   Book: {
    author: async(root) => await Author.findById(root.author).populate('books')
  },
  //  Author: {
  //   bookCount: async(root) => {
  //       const foundAuthor = await Author.findOne({name: root.name})
  //       const foundBooks = await Book.find({author: foundAuthor.id})
  //       return foundBooks.length
  //   }
  // },
    Mutation: {
      addBook:async(root, args, context) => {
        const currentUser= context.currentUser
   
     if(!currentUser){
      throw new GraphQLError('not authenticated', {
        extensions:{
          code:'BAD_USER_INPUT'
        }
      })
     }
     let author = await Author.findOne({name: args.author})
     if(!author){
        try{
        author = new Author({name: args.author})
        await author.save()
      }catch(error){
      throw new GraphQLError('Creating new author failed', {
        extensions: {
          code: "BAD_USER_INPUT",
          invalidArgs: args.author, error
        }
      })
      }
     }
     const book = new Book({
      author,
      title: args.title,
      published: args.published,
       genres: args.genres
      })
   try{
      await book.save()
     }catch(error){
      throw new GraphQLError('Adding book failed', {
        extensions:{
          code: 'BAD_USER_INPUT',
          invalidaArgs: args.author, error
        }
      })
    }
    
    pubsub.publish('BOOK_ADDED', {bookAdded: book})

        const foundAuthor = await Author.findOne({name: args.author}) 
        foundAuthor.books = foundAuthor.books.concat(book.id)
        await foundAuthor.save()
    return book
    },
  
      editAuthor: async (root, args, {currentUser}) => {
     if(!currentUser){
    throw new GraphQLError('not authenticated', {
      extensions: {
        code: 'BAD_USER_INPUT'
      }
    })
     }
     const existAuthor = await Author.findOne({name: args.name})
      if(!existAuthor){
       return null
      }
        existAuthor.born = args.setBornTo
        try{
        await existAuthor.save()
        }catch(error){
          throw new GraphQLError('Editing birth year failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name, error
            }
          })
        }
        return existAuthor
      },
  
//       addAuthor: async(root, args) => {
//   const exsitingAuthor = await Author.findOne({name: args.name})
//   if(exsitingAuthor){
//     throw new GraphQLError('exsiting author', {
//       extensions:{
//         code:'BAD_USER_INPUT'
//       }
//     })
//   }
//   const newAuthor = new Author({...args, id: uuid()})
// if(args.name.length < 4) {
//   throw new GraphQLError('invalid argument length', {
//     extensions: {
//       code:'BAD_USER_INPUT',
//       invalidArgs: args.name, error
//     }
//   })
// }
// try{
//   await newAuthor.save()
//   // await Author.concat(newAuthor)
//   // await Author.save()
// }catch(error){
// console.log(error)
// }
 
//   return newAuthor
//       },
  
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
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      }
    }
  }
  module.exports = resolvers
