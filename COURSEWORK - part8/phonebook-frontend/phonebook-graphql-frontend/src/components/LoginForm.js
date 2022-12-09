import { useEffect, useState } from "react"
import { useMutation } from '@apollo/client'
import {LOGIN} from '../queries'
import FormEntry from "./FormEntry"

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('phonenumbers-user-token', token)
    }
  },[result.data]) //eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: {username, password}})
  }

  return(
    <div className="flex 
                    flex-col
                    p-6
                    my-4
                    h-fit
                    w-fit
                    items-center
                    shadow-lg
                    border
                    mx-auto
                    rounded-lg
                    border-slate-200
                    bg-slate-50
    ">
      <form onSubmit={submit}>
        <FormEntry value={username} placeholder="Username" stateHandler={setUsername} />
        <FormEntry type="password" value={password} placeholder="Password" stateHandler={setPassword} />
        <button type="submit" className="flex mx-auto rounded-lg p-2 bg-blue-400">Login</button>  
      </form>
    </div>
  )
}

export default LoginForm