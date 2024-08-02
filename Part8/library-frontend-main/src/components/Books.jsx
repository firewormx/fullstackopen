import { ALL_BOOKS } from "../queries"
import {useQuery} from '@apollo/client'
import { useState } from "react"

const Books = () => {
const result =  useQuery(ALL_BOOKS)
const books = result.data.allBooks 
const genres = books.map(book => book.genres).flat()
const [genre, setGenre] = useState("all genres")
const [booksToShow, setBooksToShow] = useState(books)
const noneDuplicatedGenres = [... new Set(genres)]

const changeGenre = (oneGenre) => {
  setGenre(oneGenre)
  const filteredBook = books.filter(book => book.genres.includes(oneGenre))
  setBooksToShow(filteredBook)
}

const resetGenre = () => {
  setGenre("all genres")
  setBooksToShow(books)
}

if(result.loading) return <div>loading...</div>

  return (
    <div>
      <h2>books</h2>
      <p>in genre <strong>{genre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

<button onClick={()=>resetGenre()}>all genres</button>
{noneDuplicatedGenres.map((oneGenre, index)=>(
<button key={index} onClick={()=> changeGenre(oneGenre)}>{oneGenre}</button>
))}
    </div>
  )
}

export default Books
