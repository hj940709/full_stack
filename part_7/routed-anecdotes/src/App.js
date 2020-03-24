import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route, Switch } from 'react-router-dom'
import CreateNew from './CreateNew'
import Menu from './Menu'
import About from './About'
import Footer from './Footer'
import Anecdote from './Anecdote'
import AnecdoteList from './AnecdoteList'


const Notification = props => {
  if(props.notification && props.notification.length)
    return <p>{props.notification}</p>
  else return (<div></div>)
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <Router>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />
      <Switch>
      <Route exact path="/" >
        <AnecdoteList  anecdotes={anecdotes}/>
      </Route>
      <Route exact path="/anecdotes/:id">
        <Anecdote  anecdotes={anecdotes}/>
      </Route>
      <Route path="/create">
        <CreateNew addNew={addNew} setNotification={setNotification}/>
      </Route>
      <Route path="/about">
        <About />
      </Route>
      </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default App;