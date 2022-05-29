import {useState,useEffect} from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')


  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const updateContact = (person) => {
    const changedPerson = { ...person, number: newNumber}
    personsService
    .update(person.id, changedPerson)
    .then(returnedPerson => {
      setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
      setNewName('')
      setNewNumber('')
    })
    .catch(error => {
      alert('This person no longer exists.')
    })
  }

  const addNew = (event) => {
    event.preventDefault()
    const contactDetail = { name: newName, 
                            number: newNumber, 
                          }

    if (persons.map(person => person.name).includes(newName)){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(n => n.name === newName)
        updateContact(person)
        }
    }
    else{
        personsService
          .create(contactDetail)
          .then(returnedContact => {
            setPersons(persons.concat(returnedContact))
            setNewName('')
            setNewNumber('')
          })
        setPersons(persons.concat(contactDetail))
        setNewName('')
        setNewNumber('')
      }
  }

  
  const removeContact = (id, personName) => {
    if (window.confirm(`Do you want to delete ${personName} from the phonebook?`)){
      personsService
      .remove(id)
      .then(responsePersons => {
        setPersons(persons.filter(n => n.id != id))
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm 
        addNew={addNew} 
        newName={newName} 
        newNumber={newNumber}
        handleNameChange={handleNameChange} 
        handleNumChange={handleNumChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filterValue={filterValue} removeContact={removeContact}/>
    </div>
  )
}

export default App
