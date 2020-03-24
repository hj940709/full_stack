import React from 'react'
import {
    useHistory
  } from 'react-router-dom'
import {useField} from './hooks'

const CreateNew = (props) => {
    //const [content, setContent] = useState('')
    //const [author, setAuthor] = useState('')
    //const [info, setInfo] = useState('')
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    const history = useHistory()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      const anecdote = {
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      }
      props.addNew(anecdote)
      props.setNotification(`A new anecdote ${content.value} created!`)
      setTimeout(()=>props.setNotification(null), 10000)
      history.push('/')
    }

    const handleReset = (e) => {
      e.preventDefault()
      content.reset()
      author.reset()
      info.reset()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content.bind} />
          </div>
          <div>
            author
            <input {...author.bind} />
          </div>
          <div>
            url for more info
            <input {...info.bind} />
          </div>
          <button>create</button>
          <button onClick={handleReset}>reset</button>
        </form>
      </div>
    )
  
  }

  export default CreateNew