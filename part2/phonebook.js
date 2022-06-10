import { useState, useEffect } from 'react'
import axios from 'axios'
import phoneService from './services/phonebook'
import phonebook from './services/phonebook'

const Filter = ({ onChange, value }) => {
  return <div>filter shown with <input onChange={onChange} value={value} /></div>
}

const PersonForm = ({ addPerson, handleNameChange, handleNumberChange, newName, newNumber}) => {
  return (<form onSubmit={addPerson}>
    <div>
      name: <input onChange={handleNameChange} value={newName} />
    </div>
    <div>
      number: <input onChange={handleNumberChange} value={newNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>)
}

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
    { persons.map((p) => {
    return <p key={p.id}>
      {p.name} {p.number} <button 
        onClick={() => deletePerson(p.id)}>delete</button>
      </p>
  }) }
  </div>)
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}
const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [personsShown, setPersonsShown] = useState(persons)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    phoneService
      .getAll()
      .then(data => {
        setPersons(data)  
      })
  }, [])
  

  // Event handlers
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const addPerson = (event) => {
    event.preventDefault()

    // check for duplicate persons
    const dup = persons.find(p => p.name === newName)
    
    if (dup) {
      const confirm_ = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      
      if (confirm_) {
        const updated = { ...dup, number: newNumber }
        phoneService.update(dup.id, updated).then(returnedPerson => {
          setPersons(persons.map(p => p.id === dup.id ? returnedPerson : p))
          // notification
          setMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 3000);
        }).catch(error => {
          // error
          setErrorMessage(`Information of ${updated.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
          setPersons(persons.filte(p => p.id != updated.id))
        })      
      }
      
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }  
      phoneService.create(personObject)
      .then( returnedPerson => {
        // notification
        setMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 3000);

        // list change
        setPersons(persons.concat(returnedPerson))
      })
    }
  }

  // delete person
  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const confirm = window.confirm(`Delete ${person.name} ?`)
    
    if (confirm) {
      phoneService.deletePhone(id)
      .then(res => {
        setPersons(persons.filter(p => p.id !== id))})
      .catch(error => {
        const removedPerson = persons.find(p => p.id === id)
        // error
        setErrorMessage(`Information of ${removedPerson.name} has already been removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setPersons(persons.filter(p => p.id != removedPerson.id))
      })
    }
  }
    

  // search
  const handleSearch = (event) => {
    setSearch(event.target.value)

    setPersonsShown(event.target.value == '' ? persons : persons.filter( (person) => {
      return person.name.toUpperCase().includes(event.target.value.toUpperCase())
    }))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Error message={errorMessage} />
      <Notification message={message} />
      <Filter 
        onChange={handleSearch}
        value={search} />

      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber} />
        
      <h2>Numbers</h2>
      <Persons persons={search.length ? personsShown : persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App