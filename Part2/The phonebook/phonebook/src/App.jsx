import { useState, useEffect} from 'react'
import personService from "./service/person";

const Person = ({name, number, deleteEffect}) =>{
  return (<>
  <div>{name} {number}
  <button onClick={deleteEffect}>delete</button>
  </div>
  </> )
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

const Notifications = ({message}) =>{
  const notificationStyle ={
    color: "green",
    border:"6px solid green",
    fontSize: 16,
    padding: 5
  }
  const notificationStyle2 ={
    color:"red",
    border: "6px solid red",
    fontSize: 16,
    background: "lightgrey",
    padding: 5
  }
if( message=== null){
  return null;
}
return (message.length > 40 ?(
  <div style={notificationStyle2}>
 {message}
  </div>
):
<div style={notificationStyle}>
{message}
 </div>
)
}

const App = () => {

  const [persons, setPersons] = useState([ ]) 
  const [newName, setNewName] = useState('');
  const [showName, setShowName] = useState(true);
  const [newNumber, setNewNumber] = useState(``);
  const [search, setSearch] = useState(``);
  const [notifications, setNotifications] = useState(`Add ${newName}`);


  useEffect(()=>{
    personService.getAll()
    .then(data => {
      setPersons(data);
      }).catch(error => console.log(error));
    },[]);

const handleSubmit = (event) =>{
  event.preventDefault();

const newNameObject ={
  name: newName,
  number: newNumber,
}

// const note = notes.find(n => n.id === id);
//   const changedNote = { ...note, important: !note.important };

//   noteService.update(id, changedNote)
//   .then(returnedNote => {
//     setNotes(notes.map(note => note.id !== id ? note : returnedNote));

//   }).catch(error =>{
//     setErrorMessage(`Note "${note.content}" was already removed from server`);

//     setTimeout(()=>{
//     setErrorMessage(null);
//     }, 5000);
//   })
//   }

const existingPerson = persons.find(person => person.name === newName);

if (existingPerson){
const person = persons.find(per=> per.name === newName);
const changedPerson ={...person, number:newNumber};

  alert(`${newName} is already added to phonebook, replace the old number with a new one?`);

    personService.update(person.id, changedPerson)
    .then(returnedPerson => {
      console.log(returnedPerson);
      
    setPersons(persons.map(per =>per.id !== person.id ? per : returnedPerson));
    setNotifications(`Information of ${newName} has already been changed successful from server`);
    setTimeout(()=>{
      setNotifications(null);
    }, 2000)
    })
    .catch(error => {
      console.log(error);
  setTimeout(()=>{
    setNotifications(null);
  }, 2000)
    //  setPersons(persons.filter(per => per.id !== person.id));
    }
      );
  
}else{
  personService.create(newNameObject)
  .then(data=>{
    console.log(data);
    setPersons(persons.concat(data));
    setNotifications(`Added ${data.name} ${data.number}`);
    setTimeout(()=>{
     setNotifications(null)
    },2000)
  }).catch(error => {
    console.error(error);
    console.log(error.response.data.error);
    setNotifications(error.response.data.error);
    setTimeout(()=>{
    setNotifications(null)
    }, 5000)
  });
}
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


const show_names =() => filterToShow.map((person, index) =>{

  const handleDeleteButton =() => {
    const removeid = window.confirm(`Delete ${person.name}?`);
    if(removeid){
    personService.clear(person.id)
    .then(()=> {
          setPersons(persons.filter(pers => pers.id !== person.id ));
        })
        .catch(error => console.log(error));
         }
        return ;
      }

return <Person name={person.name} number={person.number} key={index} 
deleteEffect={handleDeleteButton} />
})



  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications message={notifications}/>
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