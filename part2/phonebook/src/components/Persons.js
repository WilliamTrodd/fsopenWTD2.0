import react from 'react'

const Persons = ({persons, filterValue, removeContact}) => {

    const filtered = persons.filter((person) => (person.name.toLowerCase().includes(filterValue.toLowerCase())))

    return <>
    {filtered.map(person => (<div key={person.id}>{person.name} {person.number} <button onClick={() => removeContact(person.id, person.name)}>Delete</button></div>))}
    </>
}
export default Persons