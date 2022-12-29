const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken');
const { PubSub } = require('graphql-subscriptions');
const Author = require('./models/author');
const User = require('./models/user');
const Book = require('./models/book');

const pubsub = new PubSub()

const JWT_SECRET = process.env.JWT_SECRET

const resolvers = {
 /* Author: {
    bookCount: async (root, args) => {
      const foundBooks = await Book.find({author: root.id})
      return foundBooks ? foundBooks.length : 0
    }
  },*/
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if(args.author) {
        const author = Author.find({name: args.author})
        return Book.find({author: author.id}).populate('author')
      } else if(args.genre) {
        return Book.find({genres: args.genre}).populate('author')
      }
      return Book.find({}).populate('author')
    },
    allAuthors: async () => {

      return(Author.find({}))
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    genreBooks: async (root, args) => {
      if(!(!args.genre || args.genre==="")){
        return Book.find({genres: args.genre}).populate('author')
      }
      return Book.find({}).populate('author')

    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let foundAuthor = await Author.findOne({name:args.author})
      const currentUser = context.currentUser
      if(!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      if(!foundAuthor){
        foundAuthor = new Author({name: args.author, born:null, bookCount: 1})
        try{
          console.log(foundAuthor)
          await foundAuthor.save()
        } catch(e) {
          throw new UserInputError(e.message, {
            invalidArgs: args,
          })
        }
      } else{
      foundAuthor.bookCount = foundAuthor.bookCount + 1
      await foundAuthor.save()
    }
    const book = new Book({ ...args, author: foundAuthor })
    try{
      await book.save()
    } catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: args
      })
    }

      pubsub.publish('BOOK_ADDED', {bookAdded: book})

      return book
    },
    addAuthor: async (root, args) => {
      const author= new Author({ ...args })
      try{
        await author.save()
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        })
      }
      return author
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({name: args.name})      
      const currentUser = context.currentUser
      if(!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      if(!author){
        return null
      }
      try{
        author.born = args.born
        await author.save()
      } catch(e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }
     return author
    },
    createUser: async (root, args) => {
      const user = new User({username: args.username, favouriteGenre: args.favouriteGenre})

      return user.save()
      .catch(e => {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })  
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})
      
      if (!user || args.password !=='secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return {value: jwt.sign(userForToken, JWT_SECRET)}
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers