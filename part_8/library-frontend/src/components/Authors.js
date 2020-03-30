  
import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../query'
import AuthorForm from './AuthorForm'

const Authors = (props) => {
  const [getAuthors, result] = useLazyQuery(ALL_AUTHORS)
  const [authors, setAuthors] = useState([])

  const init = async () => {
    await getAuthors()
  }
  useEffect(()=>{
    if(result.data){
      setAuthors(result.data.allAuthors)
    }
    if(!authors.length) init()
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
            {authors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
        <AuthorForm authors={authors}/>
      </div>
    )
  }

}
  
export default Authors
