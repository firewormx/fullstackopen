import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true
    })
    setNewNote('')
  }
  // let value
  // let sthForInput
  return (
    <div className='formDiv'>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          data-testid = 'newnote'
          value={newNote}
          onChange={handleChange}
          placeholder='write note content here'
          id = 'note-input'
        />
        {/* <input
          value={value}
          onChange={sthForInput}
        /> */}
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm
