import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ApolloClient, HttpLink, InMemoryCache, gql, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000'
  })
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