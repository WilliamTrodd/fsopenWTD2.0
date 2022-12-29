import { gql } from "@apollo/client"

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author{
      name
      id
      bookCount
      born
    }
    published
    id
    genres
  }
`


export const ALL_AUTHORS=gql`
query {
  allAuthors {
    name
    bookCount
    born
    id
  }
}
`

export const ALL_BOOKS=gql`
query ($author: String, $genre: String){
  allBooks(author: $author, genre: $genre) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const GENRE_BOOKS=gql`
query ($genre: String) {
  genreBooks(genre: $genre){
    ...BookDetails
  }
}
${BOOK_DETAILS}
`


export const ADD_BOOK=gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]! ) {
  addBook(title: $title, 
          author: $author, 
          published: $published, 
          genres: $genres
    ) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const EDIT_AUTHOR=gql`
mutation editAuthor($name: String!, $born: Int! ) {
  editAuthor(
    name: $name,
    born: $born
  ) {
    name
    bookCount
    born
    id
  }
}
`
  
export const LOGIN=gql`
mutation login($username: String!, $password: String! ) {
  login(username: $username, password: $password) {
    value
  }
}
`

export const ME=gql`
query {
  me {
    username
    favouriteGenre
  }
}
`

export const BOOK_ADDED=gql`
  subscription {
    bookAdded {
    ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`