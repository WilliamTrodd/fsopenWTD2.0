import { gql } from "@apollo/client"

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
}
`

export const ADD_BOOK=gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]! ) {
  addBook(title: $title, 
          author: $author, 
          published: $published, 
          genres: $genres
    ) {
    title
    author {
      name
      id
      bookCount
      born
    }
    published
    genres
    id
  }
}
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