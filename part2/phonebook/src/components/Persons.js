const Persons = ({persons, filterValue, removeContact}) => {

    const filtered = persons.filter((person) => (person.name.toLowerCase().includes(filterValue.toLowerCase())))
    
    return <>
        {filtered.map(person => (<li key={person.id}> {person.name} {person.number}<button onClick={() => removeContact(person.id, person.name)}>Delete</button></li>))}
    </>

}
export default Persons