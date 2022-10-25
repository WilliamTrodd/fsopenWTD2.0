import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notifReducer'
import { login } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'



const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setNotification(`${username} successfully logged in`, 'notification', 10))
      dispatch(login(user))
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(setNotification('incorrect username or password','error', 10))
    }
  }

  return(
    <form onSubmit={handleLogin} className="form" >
      <div>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          onChange={({ target }) => setUsername(target.value)}
          type="text"
          value={username}
          name="Username"
          id="username"
        />
      </div>
      <div>
        <TextField
          margin="normal"
          fullWidth
          type="password"
          label="Password"
          value={password}
          name="Password"
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button type="submit" id="login-button" variant="contained">login</Button>
    </form>
  )
}

export default LoginForm