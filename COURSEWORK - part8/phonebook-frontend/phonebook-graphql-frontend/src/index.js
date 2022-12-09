import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'

import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('phonenumbers-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const httpLink = new HttpLink({uri: 'http://localhost:4000'})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

/*
client.query({ query })
  .then((response) => {
    console.log(response.data)
  })
*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App className="flex" />
  </ApolloProvider>
)