import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, ME } from "./queries";
import Authors from "./components/Authors";
import Books from "./components/Books";
import BookForm from "./components/BookForm";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import NavBar from "./components/NavBar";

const App = () => {
  const [currentView, setCurrentView] = useState('Authors')
  
  const [genre, setGenre] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('library-user-token') ? localStorage.getItem('library-user-token') : null)
  const [error, setError] = useState(null)

  const authorRes = useQuery(ALL_AUTHORS)
  const bookRes = useQuery(ALL_BOOKS)
  const genreRes = useQuery(ALL_BOOKS, {
    variables: {genre: genre}
  })
  const userRes = useQuery(ME)

  if(authorRes.loading || bookRes.loading || userRes.loading || genreRes.loading) {
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
    console.log(genre)
  }

  const genres = [...new Set(bookRes.data.allBooks.reduce((g, b) => {
    return (g.concat(b.genres))
  }, []))];

  console.log(genres)

  return (
    <div className="flex flex-col ">
      <Notify errorMessage={error} setErrorMessage={setError} />
      <NavBar token={token} setCurrentView={setCurrentView} allBooks={allBooks} recommended={recommended} logout={logout}/>
      {currentView==="Authors" ? <Authors authors={authorRes.data.allAuthors}/> : null}
      {currentView==="Books" ? <Books books={genreRes.data.allBooks} setGenre={setGenre} selectedGenre={genre} genres={genres}/> : null} 
      {currentView==="AddBook" ? <BookForm setError={notify}/> : null}
      {currentView==="Login" ? <LoginForm setToken={setToken} setError={notify} setCurrentView={setCurrentView}/> : null}
      {currentView==="Recommended" ? <Books books={genreRes.data.allBooks} selectedGenre={genre} setGenre={null} /> : null}
    </div>
  );
}

export default App;
