import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ApolloClient, ApolloProvider, InMemoryCache, gql, createHttpLink } from '@apollo/client'
import {setContext} from '@apollo/client/link/context'

const authLink = setContext((previousContext, {headers}) => {//request.headers(the GraphQL request being executed)
const token = localStorage.getItem('phonenumbers-user-token')
return {
  headers:{
    ...headers,
    authorization: token ? `Bearer ${token}` : null
  }
}
})

const httpLink = createHttpLink({
  uri:'http://localhost:4000'
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')).render(
<ApolloProvider client={client}>
<App />
</ApolloProvider>)
