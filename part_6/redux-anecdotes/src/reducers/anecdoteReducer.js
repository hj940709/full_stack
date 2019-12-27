import AnecdoteService from '../services/AnecdoteService'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
anecdotesAtStart.map(asObject)
const initialState = [] 

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  let newState
  switch(action.type){
    case 'VOTE':
      const id = action.data.id
      const toChange = state.find(n => n.id === id)
      const changed = {...toChange, votes: toChange.votes + 1}
      newState = state.map(anecdote => anecdote.id !==id ? anecdote : changed)
      newState.sort((a, b) => b.votes - a.votes)
      return newState
    case 'CREATE_ANECDOTE':
      const newObject = {...action.data, id: getId()}
      newState = state.concat(newObject)
      newState.sort((a, b) => b.votes - a.votes)
      return newState
    case 'INIT_ANECDOTE':
      return action.data
    default:
      return state
  }
}

export const initialAnecdote = () => {
  return async dispatch => {
    const data = await AnecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const data = await AnecdoteService.create(content)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data
    })
  }
}

export const vote = data => {
  return async dispatch => {
    await AnecdoteService.put(data)
    dispatch({
      type: 'VOTE',
      data: {id: data.id}
    })
  }
}

export default reducer