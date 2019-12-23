import React, { useState } from 'react'
import PersonService from './person_service'

const PersonForm = (props) => {
    const { persons, setPersons, setMessage, setIsError } = props
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const submitPerson = (event) => {
        event.preventDefault()
        console.log('submit: '+ newName)
        const filtered = persons.filter(person => person.name === newName)
        if(filtered.length){
          const person = filtered[0]
          if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
            PersonService.update(person.id, {name: newName, number: newNumber})
            .then(data => {
              person.number = newNumber
              setPersons(persons.filter(person => person.name !== newName).concat(person))
              setMessage('Updated ' + newName)
              setTimeout(() => {
                setMessage(null)
                setIsError(false)
              }, 5000)
            })
            .catch(error => {
              setMessage(error)
              setIsError(true)
              setTimeout(() => {
                setMessage(null)
                setIsError(false)
              }, 5000)
            })
          }
        }
        else{
          PersonService.create({name: newName, number:newNumber})
          .then(data=>{
            setPersons(persons.concat(data))
            setMessage('Added ' + newName)
            setIsError(false)
            setTimeout(() => {
              setMessage(null)
              setIsError(false)
            }, 5000)
          })
          .catch(error => {
            setMessage(error)
            setIsError(true)
            setTimeout(() => {
              setMessage(null)
              setIsError(false)
            }, 5000)
          })
        }
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