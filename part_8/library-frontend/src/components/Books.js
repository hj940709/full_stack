import React, {useState, useEffect} from 'react'
import { gql } from 'apollo-boost'
import { useApolloClient } from '@apollo/react-hooks'


export const ALL_BOOKS = gql`
query findBooksByGenre( $genre: String){

  allBooks(genre: $genre)  {
    id
    title
    published
    genres
  }
  

}`

const Books = (props) => {
  const client = useApolloClient(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [filter, setFilter] = useState([])
  const setGenreFilter = async (genre) =>{
    const {data} = await client.query({
      query: ALL_BOOKS,
      variables: { genre },
      fetchPolicy: 'no-cache'
    })
    setBooks(data.allBooks)
  }
  const init = async () => {
    const {data} = await client.query({
      query: ALL_BOOKS,
      variables: { },
      fetchPolicy: 'no-cache'
    })
    setBooks(data.allBooks)
    setFilter(Array.from(new Set(data.allBooks.map(book=>book.genres).flat())))
  }
  useEffect(()=>{
    init()
    
  }, [props.subUpdated])
  
  if (!props.show) {
    return null
  }

  
  

  return (
    <div>
      <h2>books</h2>
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

      {filter.map(genreFilter=>
        <button key={genreFilter} onClick={()=>setGenreFilter(genreFilter)}>{genreFilter}</button>)}
      <button onClick={()=>setGenreFilter()}>all</button>
      
    </div>
  )
}

export default Books