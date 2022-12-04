import {useState} from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import EditNumber from './components/EditNumber'
import LoginForm from './components/LoginForm'
import { ALL_PERSONS } from "./queries"


const App = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [token, setToken] = useState(null)
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()


  if (result.loading) {
    return <div className="flex w-full">loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return(
    <>
    <button onClick={logout} className="flex mx-auto rounded-lg p-2 bg-blue-400">Logout</button>  
    <Notify errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    <div className="flex flex-row justify-around items-start my-10">
      <Persons persons={result.data.allPersons} />
      <PersonForm setError = {notify}/>
      <EditNumber setError = {notify}/>
    </div>
    </>
  )

}

const Notify = ({errorMessage, setErrorMessage}) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div className="flex w-full h-full fixed bg-slate-100 bg-opacity-70">
      <div className="flex
                      flex-row
                      p-6 
                      w-96
                      mx-auto
                      my-auto
                      rounded-xl 
                      shadow-lg
                      space-x-2
                      items-center
                      bg-white 
                      z-50" >
        <div className="flex w-4/5 text-red-400">{errorMessage}</div>
        <button className="flex w-1/5 p-2 rounded-xl bg-slate-200 text-center justify-center" onClick={() => {setErrorMessage(null)}}>OK</button>
      </div>
    </div>
  )
}

export default App;
