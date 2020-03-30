
import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
{
  allAuthors  {
    id
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query findBooksByGenre( $genre: String){

  allBooks(genre: $genre)  {
    id
    title
    published
    genres
    author
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
  addBook(
    title: $title
    author: $author
    published: $published
    genres: $genres
  ) {
    id
    title
    author
    published
    genres
  }
}
`

export const UPDATE_AUTHOR = gql`
mutation updateAuthor($name: String!, $born: Int!) {
  editAuthor(
    name: $name
    setBornTo: $born
  ) {
    id
    name
    born
  }
}

`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password)  {
    value
  }
}
`

export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    id
    title
    published
    genres
  }
}
`