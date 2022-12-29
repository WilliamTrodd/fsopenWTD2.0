import { useState } from 'react';
import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import Authors from "./components/Authors";
import Books from "./components/Books";
import BookForm from "./components/BookForm";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import NavBar from "./components/NavBar";
import { ALL_AUTHORS, ALL_BOOKS, ME, BOOK_ADDED, GENRE_BOOKS } from "./queries";

export const updateCache = (cache, query, addedBook) => {
  console.log(cache)
  console.log(query)
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ genreBooks }) => {

    return {
      genreBooks: uniqByName(genreBooks.concat(addedBook))
      
    }
  })
}

const App = () => {
  const [currentView, setCurrentView] = useState('Books')
  
  const [genre, setGenre] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('library-user-token') ? localStorage.getItem('library-user-token') : null)
  const [error, setError] = useState(null)


  const authorRes = useQuery(ALL_AUTHORS)
  const bookRes = useQuery(ALL_BOOKS)
  const genreRes = useQuery(GENRE_BOOKS, {
    variables: {genre: genre}
  })
  const userRes = useQuery(ME)

  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCache(client.cache, {query: GENRE_BOOKS, variables: {genre: null}}, addedBook)

    }
  })

  if(authorRes.loading || bookRes.loading || userRes.loading || genreRes.loading) {
    return (<div className="lds-ring"><div></div><div></div><div></div><div></div></div>)
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

  const genres = [...new Set(bookRes.data.allBooks.reduce((g, b) => {
    return (g.concat(b.genres))
  }, []))];

  return (
    <div className="flex flex-col ">
      <Notify errorMessage={error} setErrorMessage={setError} />
      <NavBar token={token} setCurrentView={setCurrentView} allBooks={allBooks} recommended={recommended} logout={logout}/>
      {currentView==="Authors" ? <Authors authors={authorRes.data.allAuthors}/> : null}
      {currentView==="Books" ? <Books books={genreRes.data.genreBooks} setGenre={setGenre} selectedGenre={genre} genres={genres}/> : null} 
      {currentView==="AddBook" ? <BookForm setError={notify}/> : null}
      {currentView==="Login" ? <LoginForm setToken={setToken} setError={notify} setCurrentView={setCurrentView}/> : null}
      {currentView==="Recommended" ? <Books books={genreRes.data.genreBooks} selectedGenre={genre} setGenre={null} /> : null}
    </div>
  );
}

export default App;
