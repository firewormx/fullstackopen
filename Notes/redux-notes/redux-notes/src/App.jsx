import { useEffect } from 'react'
import Notes from './components/Notes'
import NewNote from './components/NewNote'
import VisibilityFilter from './components/VisibilityFilter'

import {useDispatch} from 'react-redux'
import noteService from './services/notes'
import {setNotes} from './reducers/noteReducer'

const App = () =>{
  const dispatch = useDispatch()

useEffect(() => {
  noteService.getAll().then(notes => {
    dispatch(setNotes(notes))
})
  }, [dispatch])

  return( 
  <div>
   <NewNote />
   <VisibilityFilter />
     <Notes />
     </div>
  )
}

export default App