import react from 'react'

const Persons = ({persons, filterValue}) => {

    const filtered = persons.filter((person) => (person.name.toLowerCase().includes(filterValue.toLowerCase())))

    return <>
    {filtered.map(person => (<div key={person.id}>{person.name} {person.number}</div>))}
    </>
}
export default Persons