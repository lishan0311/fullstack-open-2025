import { useState,useEffect } from 'react'
import personService from './services/persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'

const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const personToShow = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  )

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name === newName)

    if ( existingPerson ) {
      const ok = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (!ok) return

      const changePerson = { ...existingPerson, number:newNumber}

      personService
        .update(existingPerson.id, changePerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== existingPerson.id ? p: returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Change ${returnedPerson.name} number`)
          setTimeout(() => {
          setMessage(null)
        }, 5000)
        })
        .catch(message => {
          setMessage(`Information of ${existingPerson.name} has already been removed from server`)
          setTimeout(() => {
          setMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== existingPerson.id))
        })
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const deletePerson = (id,name) => {
    const ok = window.confirm(`Delete ${name} ?`)
    if (!ok) return

    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter newFilter={newFilter} handleFilterChange={(event)=>setNewFilter(event.target.value)} />

      <h2>add a new</h2>
      <PersonForm 
        newName={newName}
        handleNameChange={(event)=>setNewName(event.target.value)}
        newNumber={newNumber}
        handleNumberChange={(event)=>setNewNumber(event.target.value)}
        addPerson={addPerson}
        />

      <h2>Numbers</h2>
      <Persons personToShow={personToShow} deletePerson={deletePerson} />

    </div>
  )
}

export default App