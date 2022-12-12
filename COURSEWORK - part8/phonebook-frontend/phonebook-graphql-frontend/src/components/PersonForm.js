import { useState } from 'react'
import { useMutation } from '@apollo/client'
import FormEntry from "./FormEntry"
import { ALL_PERSONS, CREATE_PERSON } from "../queries"
import { updateCache } from '../App'

const PersonForm = ({setError}) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const [createPerson] = useMutation(CREATE_PERSON, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
    update: (cache, response) => {
      updateCache(cache, {query: ALL_PERSONS}, response.data.addPerson)
    },
  })

  const submit = (event) => {
    event.preventDefault()

    createPerson({ 
      variables: {
        name, 
        phone: phone.length > 0 ? phone : undefined, 
        street, city} })

    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  return(
    <div className="flex 
                    flex-col
                    p-6
                    h-fit
                    items-center
                    shadow-lg
                    border
                    mx-auto
                    rounded-lg
                    border-slate-200
                    bg-slate-50
    ">


      <div className="text-2xl flex" >Add a Contact</div>
      <form onSubmit={submit}>
        <div>
          <FormEntry value={name} placeholder={"Name"} stateHandler={setName} />
          <FormEntry value={phone} placeholder={"Phone"} stateHandler={setPhone} />
          <FormEntry value={street} placeholder={"Street"} stateHandler={setStreet} />
          <FormEntry value={city} placeholder={"City"} stateHandler={setCity} />
          <button type="submit" className="flex mx-auto rounded-lg p-2 bg-blue-400">Add Contact</button>  
        </div>
      </form>
    </div>
  )

} 

export default PersonForm