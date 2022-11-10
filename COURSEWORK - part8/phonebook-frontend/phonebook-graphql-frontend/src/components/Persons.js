import { useState } from 'react'
import { useQuery } from '@apollo/client'
import {FIND_PERSON} from '../queries'

const Person = ({ person, onClose }) => {
  return (
    <div className="p-6 
                    w-96
                    mx-auto 
                    rounded-xl 
                    shadow-lg  
                    items-center 
                    justify-center 
                    space-x-2
                    bg-white 
                    my-1
                    ">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="text-2xl flex items-center">{person.name}</div>
          <div className="flex items-center">{person.address.street} {person.address.city}</div>
        </div>
        <div className="flex justify-between">
        <div className="flex items-center">{person.phone}</div>
        <button className="flex rounded-md p-2 bg-slate-200 hover:bg-slate-400" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

const Persons = ({persons}) => {
  const [nameToSearch, setNameToSearch] = useState(null)
  const result = useQuery(FIND_PERSON, {
    variables: {nameToSearch},
    skip: !nameToSearch
  })

  if (nameToSearch && result.data) {
    return(
      <Person
      person={result.data.findPerson}
      onClose={() => setNameToSearch(null)}
      />
    )
  }

  return(
  <div className="flex flex-col mx-auto">
    <div className="flex mx-auto text-2xl">Persons</div>
    {persons.map(p => 
      <div className="
      p-6 
      w-96 
      mx-auto 
      rounded-xl 
      shadow-lg 
      flex
      items-center
      justify-around
      bg-white 
      border-slate-100
      border-2 
      my-1" key={p.id}>
      <svg xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="currentColor" 
            className="w-6 h-6 flex">
        <path strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
      <div className="flex flex-col items-center w-4/5">
        <div className="flex">
          {p.name}</div>
        <button onClick={() => setNameToSearch(p.name)} 
                className="bg-slate-300 
                            rounded-md
                            p-2
                          hover:bg-slate-400 
                            flex
                            ">Show Address</button>

        </div>
      </div>
      )
    }
    </div>
  )
}

export default Persons