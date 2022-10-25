import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { Container } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Container >
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </Container>
)