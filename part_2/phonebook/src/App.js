import React, { useState } from 'react'
import Persons from './person'
import PersonForm from './person_form'
import Filter from './filter'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ filter, setFilter ] = useState('')
  

 
  
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