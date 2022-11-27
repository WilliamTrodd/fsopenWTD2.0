import { useEffect, useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import FormEntry from "./FormEntry"
import { useMutation } from "@apollo/client"

const AuthorForm = ({selectedAuth}) => {
  const [author, setAuthor] = useState('')
  const [bornYear, setBornYear] = useState('')

  const [updateAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  useEffect(() => {
    if(selectedAuth){
      setAuthor(selectedAuth)
    } else {
      setAuthor('')
    }
  }, [selectedAuth])

  const submit = (event) => {
    event.preventDefault()

    const name = author
    const born = parseInt(bornYear)

    //const bornYear = parseInt(born)
    updateAuthor({variables:{name, born}})
    selectedAuth=''

    setAuthor('')
    setBornYear('')
  }

  useEffect(() => {
    if (result.data === null){
      console.log('Author not found')
    }
  }, [result.data])


  if(author!=='') {
    return (
      <div className="flex flex-col items-center my-4">
      <form onSubmit={submit}>
        <div className="flex flex-row items-center justify-between">
        Change the year for: {author} <button type="button" className="border border-slate-200 p-2 rounded-md justify-center" onClick={() => setAuthor('')}>Clear</button>
        </div>
        <div className="flex flex-col items-center justify-between">
        <FormEntry className="flex" value={bornYear} placeholder="Born" stateHandler={setBornYear} />
        <button type="submit" className="flex w-2/12 border border-slate-200 p-2 rounded-md justify-center">Save</button>
        </div>
      </form>
    </div>
    )
  } else {
    return(
      <div className="flex flex-col items-center text-xl my-4">
        Click a name in the list to change the year
      </div>
    )
  }
  
}

export default AuthorForm