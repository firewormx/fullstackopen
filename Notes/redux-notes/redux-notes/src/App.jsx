import {createNote, toggleImportanceOf} from './reducers/noteReducer'
import {useSelector, useDispatch} from 'react-redux'

// store.dispatch({
//   type: 'NEW_NOTE',
//   payload: {
//     content: 'the app state is in redux store',
//     important: true,
//     id: 1
//   }
// })

// store.dispatch({
//   type: 'NEW_NOTE',
//   payload: {
//     content: 'state changes are made with actions',
//     important: false,
//     id: 2
//   }
// })

// store.dispatch({
//   type: 'TOGGLE_IMPORTANCE',
//   payload: {
//     id: 2
// }
// })


const App = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state)//the fnc either searches for or selects data from the Redux store.
  const importantNotes = useSelector(state => state.filter(note => note.important))

  const addNote = (event) => {
   event.preventDefault()
   const content = event.target.note.value
   event.target.note.value = ''
   dispatch(createNote(content))
  }
  const toggleImportance = (id) =>{
 dispatch(toggleImportanceOf(id))
  }

  return(
    <div>
      <form onSubmit={addNote}>
        <input name= 'note'/>
        <button type='submit'>add</button>
      </form>
      <ul>
        {notes.map(note=>
          <li
           key= {note.id}
           onClick={() => toggleImportance(note.id)}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
        </ul>
    </div>
  )
}

export default App