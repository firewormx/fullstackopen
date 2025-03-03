import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, split}from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import {getMainDefinition} from '@apollo/client/utilities'


const authLink = setContext((previousContext, {headers}) =>{
const token = localStorage.getItem('addbooks-user-token')
return {
  headers: {
    ...headers,
    authorization: token ? `Bearer ${token}` : null
  }
}
})

const httpLink = createHttpLink({
  uri:'/graphql',
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/graphql`,
  })
)


const splitLink = split(
  ({query}) => {
 const definition = getMainDefinition(query)
 return (
  definition.kind === 'OperationDefinition' &&
  definition.operation === 'subscription'
 )
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})


ReactDOM.createRoot(document.getElementById("root")).render(
<ApolloProvider client={client}>
<App />
</ApolloProvider>)

