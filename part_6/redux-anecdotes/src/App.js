import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/filter'
import {initialAnecdote} from './reducers/anecdoteReducer'


const App = ({initialAnecdote}) => {
  useEffect(()=>{
    initialAnecdote()
  }, [])
  return (
    <div>
      <Notification />
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteForm /> <br/>
      <AnecdoteList />
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = {
  initialAnecdote,
}
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp