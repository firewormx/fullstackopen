import { useState, useEffect} from 'react'
import { ADD_BOOK } from '../queries'
import {useMutation} from '@apollo/client'
import { ALL_BOOKS, ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const NewBook = ({setError}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBooks]= useMutation(ADD_BOOK, {
    refetchQueries:[{query: ALL_BOOKS}],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
    update: (cache, response) => {
   cache.updateQuery({query: ALL_BOOKS}, ({allBooks})=> {
return {
  allBooks: allBooks.concat(response.data.addBooks)
}
   })
    }
  })
  const [editAuthor] = useMutation(EDIT_AUTHOR,{
refetchQueries: [{query: ALL_AUTHORS}],
onError: (error)=>{
  const messages = error.graphQLErrors.map(e => e.message).join('\n')
  console.log(messages)
  setError(messages)
  },
//   update: (cache, response) => {
//    cache.updateQuery({query: ALL_AUTHORS}, ({allAuthors}) => {
// return {
//   allAuthors: allAuthors.concat(response.data.editAuthor)
// }
//    })
//   }
  })

  const submit = async (event) => {
    event.preventDefault()
    let name = author
   await addBooks({variables: {title, author, published, genres}})
   await editAuthor({variables: {name}})
    console.log('add book...')

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