const Books = ({books, genre, setGenre}) => {

  //const genres = books.reduce()
  
  const getGenre = (event) => {
    var value = event.target.value;
    setGenre(value);
  }

  const Selector = ({values, changeHandler, selected}) => {
    console.log(selected)
    return(
      <select onChange={changeHandler} defaultValue={selected}>
        <option key={"allBooks"} value="">All Books</option>
        {values.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    )
  }

  return (
  <div className="">
    <div className="text-2xl p-4 text-center">
      {setGenre ? <Selector values={["Sci-Fi", "Fantasy", "Spy"]} changeHandler={getGenre} selected={genre} /> : <h1>{genre}</h1>}
    </div>
  <table className="table-fixed w-3/5 mx-auto">
    <thead className="bg-slate-200">
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Published</th>
      </tr>
    </thead>
    <tbody>
      {books.map(b => 
        <tr key={b.id} className="text-center hover:bg-slate-100">
          <td className="text-left">{b.title}</td>
          <td>{b.author.name}</td>
          <td>{b.published}</td>
        </tr>
        )}
    </tbody>
  </table>
  </div>
)}

export default Books