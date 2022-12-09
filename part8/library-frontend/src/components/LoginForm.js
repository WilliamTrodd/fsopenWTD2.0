import {useEffect, useState} from "react";
import {useMutation} from '@apollo/client';
import {LOGIN} from "../queries"

import FormEntry from "./FormEntry";

const LoginForm = ({setError, setToken, setCurrentView}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      localStorage.setItem('library-user-token', token)
      setCurrentView('Authors')
    }
  }, [result.data]) //eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: {username, password}})
  }

  return (
    <div>
      <form onSubmit={submit}>
        <FormEntry value={username} placeholder="Username" stateHandler={setUsername} />
        <FormEntry value={password} placeholder="Password" stateHandler={setPassword} type="password" />
        <button type="submit" className="">Login</button>
      </form>
    </div>
  )
}

export default LoginForm