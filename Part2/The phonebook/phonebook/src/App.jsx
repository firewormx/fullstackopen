import { useState, useEffect} from 'react'
import axios from "axios";

const Person = ({name, number}) =>{
  return <div>{name} {number}</div>
}

const Filter = ({value, onChange}) =>{
  return (<>
  <div>filter shown with
        <input value={value} onChange={onChange}/>
         </div>
         </>)
}

const AddNewInfo = ({onSubmit, nameValue, onNameChange, numberValue,
onNumberChange, onClick}) =>{
  return (<>
      <form onSubmit={onSubmit} id="newName">
        <h2>Add a new</h2>
        <div>
          name: <input value={nameValue} onChange={onNameChange}/>
        </div>
        <div>number: <input value={numberValue} onChange={onNumberChange}/></div>
        <div>
          <button type="submit"  onClick={()=>onClick}>add</button>
        </div>
      </form>
      </>)
}

const App = () => {

  useEffect(()=>{
 axios.get("http://localhost:30021/persons")
.then(response => {
  setPersons(response.data);
  })
},[]);

  const [persons, setPersons] = useState([ ]) 
  const [newName, setNewName] = useState('');
  const [showName, setShowName] = useState(true);
  const [newNumber, setNewNumber] = useState(``);
  const [search, setSearch] = useState(``);

 const handleSubmit = (event) =>{
  event.preventDefault();
const newNameObject ={
  name: newName,
  number: newNumber,
}

const existingPerson = persons.find(person => person.name === newName);
existingPerson ? alert(`${newName} is already added to phonebook`)
  :setPersons(persons.concat(newNameObject));

setNewName("");
setNewNumber("");
 }

 const handleNameChange = (event)=>{
  console.log(event.target.value);
  setNewName(event.target.value);
}


const handleNumberChange = (event) =>{
 console.log(event.target.value);
 setNewNumber(event.target.value);
}

const handleSearchChange = (event) =>{
  const currentSearch = event.target.value;
  setSearch(currentSearch);
}

const filterToShow = (search === "") 
? persons
: persons.filter(person=> person.name.toLowerCase().includes(search.toLowerCase()));


const show_names =() => filterToShow.map((person, index) =>
  <Person name={person.name} number={person.number} key={index}/>);

  return (
    <div>
      <h2>Phonebook</h2>
     <Filter  value={search} onChange ={handleSearchChange}/>
     <AddNewInfo onSubmit={handleSubmit} nameValue={newName}
     onNameChange={handleNameChange} numberValue={newNumber}
     onNumberChange={handleNumberChange} onClick={()=>setShowName(!showName)}/>
      <h2>Numbers</h2>
<div>
{show_names()}
</div> 

    </div>
  )
}

export default App