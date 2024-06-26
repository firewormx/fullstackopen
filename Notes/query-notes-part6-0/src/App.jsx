import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getNotes, createNote, updateNote} from "./requests"

const App = () => {
  const queryClient = useQueryClient()

  const newNoteMutation = useMutation({
  mutationFn: createNote,
  onSuccess: (newNote) => {
    // queryClient.invalidateQueries({queryKey: ['notes']})
    const notes = queryClient.getQueryData({queryKey: ['notes']}) // synchronous fuc, get an existing query's cached data.
    queryClient.setQueryData(['notes'], notes.concat(newNote)) // syc fuc, update a query's cached data.
}
})
const updateNoteMutation = useMutation({
  mutationFn: updateNote,
  onSuccess: (updatedNote) => {
    queryClient.invalidateQueries({queryKey: ['notes']})
    const notes = queryClient.getQueryData({queryKey: ['notes']})
    queryClient.setQueryData(['notes'], notes.map(note => note.id !== updatedNote.id ? note :updatedNote))
  }
})
 
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    console.log(content)
    newNoteMutation.mutate({content, important: true})
  }

  const toggleImportance = (note) => {
    console.log('toggle importance of', note.id)
    updateNoteMutation.mutate({...note, important: !note.important})
  }

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    refetchOnWindowFocus : false
  })
  console.log(JSON.parse(JSON.stringify(result)))
  
  if(result.isLoading){
    return <div>loading data...</div>
  }
  const notes = result.data

  return(
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content} 
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      )}
    </div>
  )
}



export default App