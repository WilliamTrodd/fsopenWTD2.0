import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from "./queries"
import Authors from "./components/Authors"
import Books from "./components/Books"
import BookForm from "./components/BookForm"


const App = () => {
  const [currentView, setCurrentView] = useState('Authors')

  const authorRes = useQuery(ALL_AUTHORS)
  const bookRes = useQuery(ALL_BOOKS)

  if(authorRes.loading) {
    return <div className="flex w-full">loading...</div>
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <button onClick={() => setCurrentView('Authors')} className="border border-slate-200 rounded-md mx-4 p-2 hover:bg-slate-300 active:ring-2 active:ring-slate-100 shadow-sm">Authors</button>
        <button onClick={() => setCurrentView('Books')} className="border border-slate-200 rounded-md mx-4 p-2 hover:bg-slate-300 active:ring-2 active:ring-slate-100 shadow-sm">Books</button>
        <button onClick={() => setCurrentView('AddBook')} className="border border-slate-200 rounded-md mx-4 p-2 hover:bg-slate-300 active:ring-2 active:ring-slate-100 shadow-sm">Add Book</button>
      </div>
      {currentView==="Authors" ? <Authors authors={authorRes.data.allAuthors}/> : null}
      {currentView==="Books" ? <Books books={bookRes.data.allBooks}/> : null} 
      {currentView==="AddBook" ? <BookForm /> : null}
    </div>
  );
}

export default App;
