import { useState } from 'react'
import PropTypes from 'prop-types'
import loginService from '../services/login'
import blogService from '../services/blogs'


const LoginForm = ({ setUser, notifier }) => {
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
      notifier(`${username} successfully logged in`, 'notification')
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      notifier('incorrect username or password','error')
    }
  }

  return(
    <form onSubmit={handleLogin}>
      <div>
      username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
      password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  notifier: PropTypes.func.isRequired
}

export default LoginForm