import { useState } from 'react'

const Person = ({name, number}) =>{
  return <div>{name} {number}</div>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: `040-123456`}
  ]) 
  const [newName, setNewName] = useState('');
  const [showName, setShowName] = useState(true);
  const [newNumber, setNewNumber] = useState(``);

 const handleSubmit = (event) =>{
  event.preventDefault();
const newNameObject ={
  name: newName,
  number: newNumber
}

const existingPerson = persons.find(person => person.name === newName);
existingPerson ? alert(`${newName} is already added to phonebook`)
  :setPersons(persons.concat(newNameObject));

setNewName("");
setNewNumber("");
 }

 const handleInputChange = (event)=>{
  console.log(event.target.value);
  setNewName(event.target.value);
}

const handleNumberChange = (event) =>{
 console.log(event.target.value);
 setNewNumber(event.target.value);
}

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit} id="newName">
        <div>
          name: <input value={newName} onChange={handleInputChange}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit"  onClick={()=>setShowName(!showName)}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
<ul>
  {persons.map((person, index) => <Person name={person.name} number={person.number} key={index}/>)}
</ul>
    </div>
  )
}

export default App