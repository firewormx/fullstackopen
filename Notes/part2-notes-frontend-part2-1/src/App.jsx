import Note from './components/Note'
import { useState, useEffect } from 'react';
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(()=>{
    // console.log("effect");
   noteService.getAll()
   .then(initialNotes =>{
    setNotes(initialNotes)
   })
  }, [])

console.log(`render`, notes.length, `notes`);

  const addNotes =(event) =>{
    event.preventDefault();

 const noteObject ={
  content: newNote,
  important: Math.random() > 0.5,
 }

 noteService
 .create(noteObject)
 .then(returnedNote => {
   setNotes(notes.concat(returnedNote));
   setNewNote("")
 });
  }
  
  const toggleImportanceOf= (id) =>{
    console.log(`importance of ${id} nedds to be toggled`);

  const note = notes.find(n => n.id === id);
  const changedNote = { ...note, important: !note.important };

  noteService.update(id, changedNote)
  .then(returnedNote => {
    setNotes(notes.map(note => note.id !== id ? note : changedNote));

  }).catch(error =>{
    setErrorMessage(`Note "${note.content}" was already removed from server`);

    setTimeout(()=>{
    setErrorMessage(null);
    }, 5000);
  })
  }
  const handleNoteChange = (event) =>{
    console.log(event.target.value);
    setNewNote(event.target.value);
    }

    const notesToShow = showAll ? notes : notes.filter(note=> note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note=>
          <Note key={note.id} note={note} 
          toggleImportance={()=>toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNotes} id="newnote">
      <input value={newNote} 
      onChange={handleNoteChange}
      name="newnote"/>
      <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App