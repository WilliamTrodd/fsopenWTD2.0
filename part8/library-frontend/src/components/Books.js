const Books = ({books}) => (
  <div className="">
    <div className="text-2xl p-4 text-center">Books</div>
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
          <td>{b.author}</td>
          <td>{b.published}</td>
        </tr>
        )}
    </tbody>
  </table>
  </div>
)

export default Books