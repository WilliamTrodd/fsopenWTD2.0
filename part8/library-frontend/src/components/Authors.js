import AuthorForm from "./AuthorForm"
import { useState } from "react"

const Authors = ({authors}) => {
  const [selectedAuth, setSelectedAuth] = useState(null)
    return (
      <div className="">
        <div className="text-2xl p-4 text-center">Authors</div>
      <table className="table-fixed w-3/5 mx-auto">
        <thead className="bg-slate-200">
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books Published</th>
          </tr>
        </thead>
        <tbody>
          {authors.map(a => 
            <tr key={a.id} onClick={() => setSelectedAuth(a.name)} className="text-center hover:bg-slate-100">
              <td className="text-left">{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
            )}
        </tbody>
      </table>

      <AuthorForm selectedAuth={selectedAuth} />

      </div>
    )
      }

export default Authors