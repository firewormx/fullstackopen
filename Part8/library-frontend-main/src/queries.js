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
const BOOK_DETAILS = gql`
fragment BookDetails on Book {
    title 
    published
    id
    genres
    author{
        name
    }
}`

export const ALL_BOOKS = gql`
query allBooks($author:String, $genre:String){
    allBooks(author:$author, genre: $genre){
  ...BookDetails
    }
}
${BOOK_DETAILS}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
    addBook(title: $title,
            author: $author,
            published: $published,
            genres: $genres,
           ){
      ...BookDetails
    }
}
${BOOK_DETAILS}
`
// export const ADD_AUTHOR = gql`
// mutation addAuthor($name:String!, $born:Int, $bookCount: Int){
//     addAuthor(name: $name,
//              born: $born
//              bookCount: $bookCount){
//                 name
//                 born
//                 bookCount
//              }
// }
// `
export const EDIT_AUTHOR = gql`
mutation editAuthor( $name: String!, $setBornTo: Int){
    editAuthor(name: $name,
              setBornTo: $setBornTo){
                name 
                born
              }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!){
    login(username: $username, password: $password){
        value
    }
}
`

export const GET_USER= gql`
query{
    me{
        username,
        favoriteGenre
    }
}
` 

export const BOOK_ADDED = gql`
subscription{
    bookAdded {
 ...BookDetails
    }
}
${BOOK_DETAILS}
`
