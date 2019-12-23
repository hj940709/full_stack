import React from 'react'
import PersonService from './person_service'

const Persons = (props) => {
    return (
        <div>
            {props.persons.map(person => 
            <Person key={person.id} person={person} 
            afterRemove={()=>props.setPersons(props.persons.filter(x => x.id !== person.id))} 
            setMessage={props.setMessage} setIsError={props.setIsError} />) }
        </div>
    )
}

const Person = (props) => {
    const removePerson = (person, updateState, setMessage, setIsError) => {
        if (window.confirm(`Do you really want to remove ${person.name}?`)) { 
            PersonService.remove(person.id)
            .then(data=>{
                updateState()
                setMessage(`Removed ${person.name} `)
                setIsError(false)
                setTimeout(() => {
                    setMessage(null)
                    setIsError(false)
                }, 5000)
            })
            .catch(error=> {
                setMessage(`Information of ${person.name} has already been removed from server`)
                setIsError(true)
                setTimeout(() => {
                    setMessage(null)
                    setIsError(false)
                }, 5000)
            })
            
        }
    }
    
    return (
        <p>
            {props.person.name} {props.person.number}   
            <button onClick={()=>removePerson(props.person, props.afterRemove, props.setMessage, props.setIsError)}>Delete</button>
        </p>
    )
}

export default Persons