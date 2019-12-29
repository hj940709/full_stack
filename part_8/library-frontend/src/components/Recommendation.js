import React, {useState, useEffect} from 'react'
import { gql } from 'apollo-boost'
import { useApolloClient } from '@apollo/react-hooks'


const ME = gql`
{
  me  {
    id
    username
    favoriteGenre
  }
}
`
const ALL_BOOKS = gql`
query findBooksByGenre( $genre: String){

  allBooks(genre: $genre)  {
    id
    title
    published
    genres
  }
  

}`

const Recommendations = (props) => {
  const client = useApolloClient(ME)
  const [books, setBooks] = useState([])
  const [user, setUser] = useState(null)
  const init = async () => {
    const result = await client.query({
      query: ME,
      variables: { },
      fetchPolicy: 'no-cache'
    })
    
    const {data} = await client.query({
      query: ALL_BOOKS,
      variables: { genre: result.data.me.favoriteGenre},
      fetchPolicy: 'no-cache'
    })
    setUser(result.data.me)
    setBooks(data.allBooks)
  }
  useEffect(()=>{
    init()
    
  }, [props.subUpdated])
  
  if (!props.show) {
    return null
  }

  
  

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <strong>{user.favoriteGenre}</strong>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books
          .map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      
    </div>
  )
}

export default Recommendations