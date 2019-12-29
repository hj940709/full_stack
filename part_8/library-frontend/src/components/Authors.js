import React, {useState, useEffect} from 'react'
import { gql } from 'apollo-boost'
import { useApolloClient } from '@apollo/react-hooks'
import AuthorView from './AuthorSetting'

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

const Authors = (props) => {
  const client = useApolloClient(ALL_AUTHORS)
  const [authors, setAuthors] = useState([])

  const init = async () => {
    const {data} = await client.query({
      query: ALL_AUTHORS,
      variables: { },
      fetchPolicy: 'no-cache'
    })
    setAuthors(data.allAuthors)
  }

  useEffect(()=>{
    init()
    
  }, [props.subUpdated])

  if (!props.show) {
    return null
  }
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {
          authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <AuthorView authors={authors}/>
    </div>
    
  )
}

export default Authors