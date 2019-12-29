import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { ALL_AUTHORS } from './Authors'

const UPDATE_AUTHOR = gql`
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

const AuthorForm = ({authors, updateAuthor}) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState(0)

  const submit = async (e) => {
    e.preventDefault()
    await updateAuthor({
      variables: { name, born }
    })
  }

  return (
    <form onSubmit={submit}>
      <label>name</label>
      <select value={name} onChange={({ target }) => setName(target.value)}>
        {authors.map(author => <option key={author.name} value={author.name}>{author.name}</option>)}
      </select>
      <br/><br/>
      <label>born</label>
      <input type='number' value={born}
          onChange={({ target }) => setBorn(Number(target.value))}/><br/><br/>
      <button type='submit'>update author</button>
    </form>
  )
}

const AuthorView = ({authors}) => {
  return (
    <div>
      <h3>Set birthyear</h3>
      <Mutation mutation={UPDATE_AUTHOR} refetchQueries={[{ query: ALL_AUTHORS}]}>
        {
          (updateAuthor) => 
            <AuthorForm authors={authors} updateAuthor={updateAuthor} />
          
        }
      </Mutation>
    </div>
  )
}

export default AuthorView