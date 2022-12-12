import {useState} from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import EditNumber from './components/EditNumber'
import LoginForm from './components/LoginForm'
import Notify from "./components/Notify"
import { ALL_PERSONS, PERSON_ADDED } from "./queries"

export const updateCache = (cache, query, addedPerson) => {
  // helper used to elimate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson)),
    }
  })
}


const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()


  useSubscription(PERSON_ADDED, {
    onData: ({ data }) => {
      const addedPerson = data.data.personAdded
      notify(`${addedPerson.name} added`)
      updateCache(client.cache, {query: ALL_PERSONS }, addedPerson)
    },
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (result.loading) {
    return <div className="flex w-full">loading...</div>
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
        <Notify errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
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

export default App;
