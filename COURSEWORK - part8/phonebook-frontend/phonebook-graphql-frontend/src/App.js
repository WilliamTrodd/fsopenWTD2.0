import {useState} from 'react'
import { useQuery } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import EditNumber from './components/EditNumber'
import { ALL_PERSONS } from "./queries"


const App = () => {
  const [errorMessage, setErrorMessage] = useState('')
  
  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div className="flex w-full">loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return(
    <>
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
