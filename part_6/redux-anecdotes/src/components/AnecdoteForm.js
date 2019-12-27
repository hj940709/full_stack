import React from 'react'
import { connect } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {createNotification, removeNotification, setNotification} from '../reducers/notificationReducer'
import AncedoteService from '../services/AnecdoteService'

const AnecdoteForm = ({createAnecdote, setNotification}) => {

    const submitHandler = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        createAnecdote(content)
        setNotification(content, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={submitHandler}>
                <div><input name='anecdote' /></div>
                <button type='submit' >create</button>
            </form>
        </div>
    )

}
const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdote,
        filter: state.filter,
        notification: state.notification
    }
}
const mapDispatchToProps = {
    createAnecdote,
    setNotification
}
const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm