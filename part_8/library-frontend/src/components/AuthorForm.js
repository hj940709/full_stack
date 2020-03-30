import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../query'



const AuthorForm = ({authors}) => {
  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      //setError(error.graphQLErrors[0].message)
      console.log(error.graphQLErrors[0].message)
    }
  })
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
      <h3>Set birthyear</h3>
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


export default AuthorForm