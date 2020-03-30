import React, {useState, useEffect} from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../query'

const Books = (props) => {
  const [getBooks, result] = useLazyQuery(ALL_BOOKS, {fetchPolicy: "no-cache" })
  const [books, setBooks] = useState([])
  const [filter, setFilter] = useState([])
  const setGenreFilter = async (genre) =>{
    await getBooks({variables: { genre }})
  }

  useEffect(()=>{
    if(result.data){
      setBooks(result.data.allBooks)
      const current_genres = Array.from(new Set(result.data.allBooks.map(book=>book.genres).flat()))
      if(current_genres.length > filter.length)
        setFilter(current_genres)
    }
    if(!books.length) setGenreFilter()
  }, [result.data, props.subUpdated])

  if (!props.show) {
    return null
  }
  
  if (result.loading)  {
    return <div>loading...</div>
  }
  else {
    
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
            {books.map(a =>
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
  
}

export default Books