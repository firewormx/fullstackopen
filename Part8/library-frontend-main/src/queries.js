import {gql} from '@apollo/client'

export const ALL_AUTHORS = gql`
query{
    allAuthors{
    name
    id
    born
    bookCount
}
}
`

export const ALL_BOOKS =gql`
query($author:String, $genre:String){
    allBooks(author:$author, genre: $genre){
        title
        published
        id 
        genres
        author
    }
}`

export const ADD_BOOK = gql`
mutation addBook($title: String, $author: String, $published: Int!, $genres: [String]!){
    addBook(title: $title,
            author: $author,
            published: $published,
            genres: $genres){
      title
      author
      published
      genres
    }

}`