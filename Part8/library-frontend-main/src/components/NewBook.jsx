import { useState} from 'react'
import {useMutation} from '@apollo/client'
import { ALL_BOOKS, ALL_AUTHORS, ADD_BOOK } from '../queries'
import { updateCache } from '../App'

const NewBook = ({setError}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook]= useMutation(ADD_BOOK, {
    refetchQueries:[{query:ALL_AUTHORS},{query: ALL_BOOKS}], 
    onError: (error) => {
      const messages = error.graphQLErrors.map(error => error.message).join('\n')
      setError(messages)
    },
    update: (cache, response) => {
      updateCache(cache, {query: ALL_BOOKS}, response.data.addBook)
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    console.log('add book...')
  await addBook({variables: {title, author, published, genres}})
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook