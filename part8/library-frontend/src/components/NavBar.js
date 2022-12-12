const NavBar = (props) => (
  <div className="flex flex-row p-6 bg-gradient-to-tr from-slate-50 to-slate-200 ">
    <button onClick={() => props.setCurrentView('Authors')} className="flex border border-slate-200 rounded-md mx-4 p-2 hover:bg-slate-300 active:ring-2 active:ring-slate-100 shadow-sm">Authors</button>
    <button onClick={() => props.allBooks()} className="flex border border-slate-200 rounded-md mx-4 p-2 hover:bg-slate-300 active:ring-2 active:ring-slate-100 shadow-sm">Books</button>
    {props.token ? <button onClick={() => props.setCurrentView('AddBook')} className="flex border border-slate-200 rounded-md mx-4 p-2 hover:bg-slate-300 active:ring-2 active:ring-slate-100 shadow-sm">Add Book</button> : null}
    
    {props.token ? <button onClick={() => props.recommended()} className="flex border border-slate-200 rounded-md mx-4 p-2 hover:bg-slate-300 active:ring-2 active:ring-slate-100 shadow-sm">Recommended</button> : null}
    
    {props.token 
      ? <button onClick={() => props.logout()} className="flex border border-slate-200 rounded-md mx-4 p-2 hover:bg-slate-300 active:ring-2 active:ring-slate-100 shadow-sm">Logout</button>
      : <button onClick={() => props.setCurrentView('Login')} className="flex border border-slate-200 rounded-md mx-4 p-2 hover:bg-slate-300 active:ring-2 active:ring-slate-100 shadow-sm">Login</button>
    }
  </div>
)

export default NavBar;