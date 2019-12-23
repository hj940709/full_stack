import React, { useState, useEffect } from 'react'
import Persons from './person'
import PersonForm from './person_form'
import Filter from './filter'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ filter, setFilter ] = useState('')
  

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add new person</h2>
      <PersonForm persons={persons}  setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons.filter(person => person.name.includes(filter))} />
    </div>
  )
}

export default App