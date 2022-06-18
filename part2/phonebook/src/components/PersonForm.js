const PersonForm = ({addNew, newName, newNumber, handleNameChange, handleNumChange}) => {

    return(
        <form onSubmit={addNew}>
        <div>
          <div>name: <input value={newName} onChange={handleNameChange}/></div>
          <div>number: <input value={newNumber} onChange={handleNumChange}/></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

    )
}

export default PersonForm