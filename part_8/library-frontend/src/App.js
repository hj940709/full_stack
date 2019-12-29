import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendation from './components/Recommendation'
import { useSubscription } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      id
      title
      published
      genres
    }
  }
`


const LoginMenu = ({token, setPage, setToken}) => {
  if(token){
    return (
      <span>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendation')}>recommendation</button>
        <button onClick={() => {
          localStorage.clear()
          setPage('authors')
          setToken(null)
          }}>logout</button>
      </span>
    )
  }
  else return ( <button onClick={() => setPage('login')}>login</button>)
}


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [subUpdated, setSubUpdated] = useState(0)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      alert(`${subscriptionData.data.bookAdded.title} added!`)
      setSubUpdated(!subUpdated)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <LoginMenu setPage={setPage} setToken={setToken} token={token}/>
       
      </div>

      <Authors
        show={page === 'authors'} subUpdated={subUpdated}
      />

      <Books
        show={page === 'books'} subUpdated={subUpdated}
      />
      
      <NewBook
        show={page === 'add' && token} setPage={setPage}
      />

      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage}/>

      <Recommendation show={page === 'recommendation'} subUpdated={subUpdated}/>
    </div>
  )
}

export default App