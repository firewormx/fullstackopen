import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {ApolloClient, ApolloProvider, InMemoryCache, gql}from '@apollo/client'


const client = new ApolloClient({
  uri:'http://localhost:4000',
  cache: new InMemoryCache()
})
const query = gql`
query {
  allBooks(author:String, genre: String){
    author
    genres
    id
    published
    title
  }

  allAuthors{
    name
    id
    born
    bookCount
  }
}`

client.query({query})
.then(response => console.log(response.data))

ReactDOM.createRoot(document.getElementById("root")).render(
<ApolloProvider client={client}>
<App />
</ApolloProvider>)

