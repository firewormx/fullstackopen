import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('');
  const [showName, setShowName] = useState(true);

 const handleSubmit = (event) =>{
  event.preventDefault();
const newNameObject ={
  name: newName
}
setPersons(persons.concat(newNameObject));
setNewName("");
 }

 const handleInputChange = (event)=>{
  console.log(event.target.value);
setNewName(event.target.value);
 }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit} id="newName">
        <div>
          name: <input value={newName} onChange={handleInputChange}/>
        </div>
        <div>
          <button type="submit" onClick={()=>setShowName(!showName)}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
<ul>
  {persons.map((person,index) => <li key={index}>{person.name}</li>)}
</ul>
    </div>
  )
}

export default App