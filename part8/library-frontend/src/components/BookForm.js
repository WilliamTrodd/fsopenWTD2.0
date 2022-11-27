import { useState } from "react"
import FormEntry from "./FormEntry"
import { useMutation } from "@apollo/client"
import {ADD_BOOK, ALL_AUTHORS, ALL_BOOKS} from "../queries"

const BookForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [yearPub, setYearPub] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{query: ALL_BOOKS}, {query: ALL_AUTHORS}]
    /*onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }*/
  })

  const addGenre = () => {
    if(genre !== "") {
      setGenres(genres.concat(genre))
    }
    setGenre("")
  }

  const submit = (event) => {
    event.preventDefault()

    const published = parseInt(yearPub)
    createBook({variables: {title, author, published, genres}})
    
    setTitle('')
    setAuthor('')
    setYearPub('')
    setGenre('')
    setGenres([])

  }

  return(
    <div className="flex flex-col items-center">
      <form onSubmit={submit}>
        <FormEntry value={title} placeholder="Title" stateHandler={setTitle}/>
        <FormEntry value={author} placeholder="Author" stateHandler={setAuthor}/>
        <FormEntry value={yearPub} placeholder="Published" stateHandler={setYearPub}/>
        <FormEntry value={genre} placeholder="Add Genre" stateHandler={setGenre}/>
        <button type="button" className="border border-slate-200 rounded-md mx-4 p-2 hover:bg-slate-300 active:ring-2 active:ring-slate-100 shadow-sm" onClick={() => addGenre()}>Add Genre</button><br/>
        Genres: {genres.map((genre, i) => <div key={i}>{genre}</div>)}
        <button type="submit" className="border border-slate-200 rounded-md mx-4 p-2 hover:border-slate-100 shadow-sm">Create Book</button>
      </form>
    </div>
  )
}

export default BookForm