import FormEntry from "./FormEntry";
import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_PERSON } from '../queries'

const PhoneForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const [ changeNumber, result ] = useMutation(EDIT_PERSON)

  const submit = (event) => {
    event.preventDefault()

    changeNumber({ variables: {name, phone}})

    setName('')
    setPhone('')
  }

  useEffect(() => {
    if (result.data && result.data.editNumber === null){
      setError('Person not found')
    }
  }, [result.data]) //eslint-disable-line

  return (
    <div className="flex flex-col
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
      <div className="text-2xl flex" >Change Number</div>
      <form onSubmit={submit}>
        <FormEntry value={name} placeholder="Name" stateHandler={setName} />
        <FormEntry value={phone} placeholder="Phone" stateHandler={setPhone} />
        <button type='submit' className="flex mx-auto rounded-lg p-2 bg-blue-400">Save</button>
      </form>

    </div>
  )
}

export default PhoneForm