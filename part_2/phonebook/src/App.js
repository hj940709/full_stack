import React, { useState, useEffect } from 'react'
import Persons from './person'
import PersonForm from './person_form'
import Filter from './filter'
import PersonService from './person_service'
import Notification from './notifiaction'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage] = useState('')
  const [ isError, setIsError] = useState(false)
  

  useEffect(() => {
    console.log('effect')
    PersonService.getAll()
    .then(data => setPersons(data))
    .catch(error=>{
      setMessage('Unable to fetch data')
      setIsError(true)
      setTimeout(() => {
        setMessage(null)
        setIsError(false)
      }, 5000)
    })
  }, [])
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={isError}/>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add new person</h2>
      <PersonForm persons={persons}  setPersons={setPersons} setMessage={setMessage} setIsError={setIsError}/>
      <h2>Numbers</h2>
      <Persons persons={persons.filter(person => person.name.includes(filter))} 
      setPersons={setPersons} setMessage={setMessage} setIsError={setIsError}/>
    </div>
  )
}

export default App