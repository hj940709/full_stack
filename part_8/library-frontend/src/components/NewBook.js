import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { ALL_BOOKS } from './Books'
import { ALL_AUTHORS } from './Authors'

const ADD_BOOK = gql`
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
const BookForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState(0)
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const submit = async (e) => {
    e.preventDefault()

    console.log('add book...')
    await props.addBook({
      variables: { title, author, published, genres }
    })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')

    props.setPage('books')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <form onSubmit={submit}>
      <div>
        title
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          value={author}
          onChange={({ target }) => setAuhtor(target.value)}
        />
      </div>
      <div>
        published
        <input
          type='number'
          value={published}
          onChange={({ target }) => setPublished(Number(target.value))}
        />
      </div>
      <div>
        <input
          value={genre}
          onChange={({ target }) => setGenre(target.value)}
        />
        <button onClick={addGenre} type="button">add genre</button>
      </div>
      <div>
        genres: {genres.join(' ')}
      </div>
      <button type='submit'>create book</button>
    </form>
  )
}


const NewBook = (props) => {
  if (!props.show) {
    return null
  }

  return (
    <Mutation mutation={ADD_BOOK} refetchQueries={[{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]}>
      {
        (addBook) => 
          <BookForm addBook={addBook} setPage={props.setPage} />
      }
    </Mutation>
  )
}

export default NewBook