import { useState, useEffect } from 'react'
import axios from 'axios'

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

const Persons = ({ persons }) => {
  return (
    <div>
    { persons.map((p) => {
    return <p key={p.id}>{p.name} {p.number}</p>
  }) }
  </div>)
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [personsShown, setPersonsShown] = useState(persons)


  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        
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
    const isDup = persons.reduce((d, p) => d || p.name == newName, false)

    if (isDup) {
      alert(`${newName} is already added to phonebook`)
    } else {      
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
    }
  }
  const handleSearch = (event) => {
    setSearch(event.target.value)

    setPersonsShown(event.target.value == '' ? persons : persons.filter( (person) => {
      return person.name.toUpperCase().includes(event.target.value.toUpperCase())
    }))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        onChange={handleSearch}
        value={search} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber} />
        
      <h2>Numbers</h2>
      <Persons persons={search.length ? personsShown : persons}/>
    </div>
  )
}

export default App