
const handleNameChange =(event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
}

const handleNumberChange =(event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
}

const PersonForm = ({newName,newNumber,handleNameChange,handleNumberChange,addPerson}) => {
    return (
        <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
            />
        </div>

        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
            />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm