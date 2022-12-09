import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ME } from "./queries"
import Authors from "./components/Authors"
import Books from "./components/Books"
import BookForm from "./components/BookForm"
import LoginForm from "./components/LoginForm"
import Notify from "./components/Notify"


const App = () => {
  const [currentView, setCurrentView] = useState('Authors')
  
  const [genre, setGenre] = useState(null)
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)

  const authorRes = useQuery(ALL_AUTHORS)
  const bookRes = useQuery(ALL_BOOKS, {
    variables: {genre: genre}
  })
  console.log(bookRes)
  console.log(authorRes)
  const userRes = useQuery(ME)

  if(authorRes.loading || bookRes.loading || userRes.loading) {
    return <div className="flex w-full">loading...</div>
  }

  const notify = (message) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    notify("Logged out.")
  }

  const allBooks = () => {
    setGenre('')
    setCurrentView('Books')
  }

  const recommended = () => {
    setGenre(userRes.data.me.favouriteGenre)
    setCurrentView('Recommended')
  }


  return (
    <div className="flex flex-col ">
      <Notify errorMessage={error} setErrorMessage={setError} />
      <div className="flex flex-row p-6 bg-gradient-to-tr from-slate-50 to-slate-200 ">
        <button onClick={() => setCurrentView('Authors')} className="flex border border-slate-200 rounded-md mx-4 p-2 hover:bg-slate-300 active:ring-2 active:ring-slate-100 shadow-sm">Authors</button>
        <button onClick={() => allBooks()} className="flex border border-slate-200 rounded-md mx-4 p-2 hover:bg-slate-300 active:ring-2 active:ring-slate-100 shadow-sm">Books</button>
        {token ? <button onClick={() => setCurrentView('AddBook')} className="flex border border-slate-200 rounded-md mx-4 p-2 hover:bg-slate-300 active:ring-2 active:ring-slate-100 shadow-sm">Add Book</button> : null}
        
        {token ? <button onClick={() => recommended()} className="flex border border-slate-200 rounded-md mx-4 p-2 hover:bg-slate-300 active:ring-2 active:ring-slate-100 shadow-sm">Recommended</button> : null}
        
        {token 
          ? <button onClick={() => logout()} className="flex border border-slate-200 rounded-md mx-4 p-2 hover:bg-slate-300 active:ring-2 active:ring-slate-100 shadow-sm">Logout</button>
          : <button onClick={() => setCurrentView('Login')} className="flex border border-slate-200 rounded-md mx-4 p-2 hover:bg-slate-300 active:ring-2 active:ring-slate-100 shadow-sm">Login</button>
        }
      </div>
      {currentView==="Authors" ? <Authors authors={authorRes.data.allAuthors}/> : null}
      {currentView==="Books" ? <Books books={bookRes.data.allBooks} setGenre={setGenre} genre={genre}/> : null} 
      {currentView==="AddBook" ? <BookForm setError={notify}/> : null}
      {currentView==="Login" ? <LoginForm setToken={setToken} setError={notify} setCurrentView={setCurrentView}/> : null}
      {currentView==="Recommended" ? <Books books={bookRes.data.allBooks} genre={genre}/> : null}
    </div>
  );
}

export default App;
