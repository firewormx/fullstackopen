import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, split } from '@apollo/client'
import {setContext} from '@apollo/client/link/context'

import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

// setContext func returns an obj to set the new context of a request,the 2nd argument is  GraphQL req being excutes.
//request.headers(the GraphQL request being executed)
const authLink = setContext((previousContext, {headers}) => {
const token = localStorage.getItem('phonenumbers-user-token')
return {// return an obj or promise
  headers:{
    ...headers,
    authorization: token ? `Bearer ${token}` : null
  }
}
})

const httpLink = createHttpLink({
  uri:'http://localhost:4000'
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000'
  }),
);

//split func: use one of two differentt Links, accoring to the result of a boolean c/k
// the 1st param is a func that's called for each operation to execute
const splitLink = split( 
  ({query}) => {
  const definition = getMainDefinition(query)
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  )
  },
  wsLink, // the link to use if the func returns a 'truthy' value
  authLink.concat(httpLink), // ...falsy value
)

//provide the link chain to Apollo Client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

ReactDOM.createRoot(document.getElementById('root')).render(
<ApolloProvider client={client}>
<App />
</ApolloProvider>)
