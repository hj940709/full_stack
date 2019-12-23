import React, { useState } from 'react'

const PersonForm = (props) => {
    const { persons, setPersons } = props
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const submitPerson = (event) => {
        event.preventDefault()
        console.log('submit: '+ newName)
        if(persons.filter(person => person.name === newName).length)
          alert(`${newName} is already added to phonebook`)
        else
          setPersons(persons.concat({name: newName, number:newNumber}))
        setNewName('')
        setNewNumber('')
      }
    
      const changeName = (event) => {
        //console.log(event.target.value)
        setNewName(event.target.value)
      }
      const changeNumber = (event) => {
        //console.log(event.target.value)
        setNewNumber(event.target.value)
      }
    return (
        <form onSubmit={submitPerson}>
            <div>
                name: <input value={newName} onChange={changeName}/>
                <br />
                number: <input value={newNumber} onChange={changeNumber}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}


export default PersonForm