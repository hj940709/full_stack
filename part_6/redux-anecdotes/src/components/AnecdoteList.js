import React from 'react'
import { connect } from 'react-redux'
import {vote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteList = props => {
    const {anecdotes, vote, setNotification} = props
    const click = (anecdote) => {
        vote(anecdote)
        setNotification(`you voted '${anecdote.content}'`, 5000)
    }
    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => click(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )

}

const anecdotesToShow = (state) => state.anecdote.filter(anecdote => anecdote.content.includes(state.filter))

const mapStateToProps = (state) => {
    return {
        anecdotes: anecdotesToShow(state),
        filter: state.filter,
        notification: state.notification
    }
}
const mapDispatchToProps = {
    vote,
    setNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList