import {useState,useEffect} from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)
  const [notifType, setNotifType] = useState(null)


  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const resetNotif = () => {
    setTimeout(() => {
      setNotifMessage(null)
      setNotifType(null)
    },5000)
  }

  const updateContact = (person) => {
    const changedPerson = { ...person, number: newNumber}
    personsService
    .update(person.id, changedPerson)
    .then(returnedPerson => {
      setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
      setNewName('')
      setNewNumber('')
      setNotifMessage(`${changedPerson.name} has been updated`)
      setNotifType('notification')
      resetNotif()
    })
    .catch(error => {
      setNotifMessage(`${changedPerson.name} has already been removed from the server`)
      setNotifType('error')
      resetNotif()
    })
  }

  const addNew = (event) => {
    event.preventDefault()
    const contactDetail = { name: newName, 
                            number: newNumber
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
            setNotifMessage(`${contactDetail.name} was added`)
            setNotifType('notification')
            resetNotif()
          })
          .catch(error => {
            setNotifMessage(`${error.response.data.error}`)
            setNotifType('error')
            resetNotif()
          })
        setNewName('')
        setNewNumber('')
      }
  }

  
  const removeContact = (id, personName) => {
    if (window.confirm(`Do you want to delete ${personName} from the phonebook?`)){
      personsService
      .remove(id)
      .then(responsePersons => {
        setPersons(persons.filter(n => n.id !== id))
        setNotifMessage(`${personName} has been deleted`)
        setNotifType('notification')
        resetNotif()
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
    <>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} styleName={notifType} />
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
    </>
  )
}

export default App
