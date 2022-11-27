const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const {v1: uuid} = require('uuid')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addAuthor(
      name: String!
      bookCount: Int!
      born: Int
    ): Author
    addBook(
      title: String!
      author: Author!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      born: Int!
    ): Author
  }
`

const resolvers = {
  Author: {
    bookCount: (root, args) => books.filter(book => book.author === root.name).length
  },
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if(!args.author && !args.genre) {
        return books
      }

      return books.filter(book => args.author ? book.author === args.author : book)
                  .filter(book => args.genre? book.genres.includes(args.genre) : book)
    },
    allAuthors: () => authors,
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() }
      const author = authors.find(a => a.name === args.author)
      if(!author){
        authors = authors.concat({name: args.author, id: uuid()})
      }
      console.log(authors)
      books = books.concat(book)
      return book
    },
    addAuthor:(root, args) => {
      const author= { ...args, id: uuid() }
      authors=authors.concat(author)
      return author
    },
    editAuthor:(root, args) => {
      const author = authors.find(a => a.name === args.name)
      if(!author){
        return null
      }
      const updatedAuth = { ...author, born: args.born}
      authors = authors.map(a=> a.name === args.name ? updatedAuth : a)
      return updatedAuth
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
