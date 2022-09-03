import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notifMessage, setNotifMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notifType, setNotifType] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const notifier = (message, type) => {
    setNotifMessage(message)
    setNotifType(type)
    setTimeout(() => {
      setNotifMessage(null)
      setNotifType(null)
    }, 5000)
  }
  const blogFormRef = useRef()

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try{
        const returnedBlog = await blogService.create(blogObject)
        setBlogs(blogs.concat(returnedBlog))
        notifier(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'notification')
    } catch {
        notifier('blog not added', 'error')
      }
  }


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
    } catch {
      notifier('incorrect username or password','error')
    }
  }

  const handleLogout = () => {
    try {
      setUser(null)
      window.localStorage.removeItem('loggedBlogappUser')
      notifier('Logged out successfully', 'notification')
    } catch {
      notifier('Couldn\'t log out', 'error')
    }
  }

  const loginForm = () => (
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

  const logoutButton = () => (
    <button onClick= {() => handleLogout()}>
      logout
    </button>
  )



  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notifMessage} styleName={notifType}/>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>{logoutButton()}
          <Togglable buttonLabel = 'create new blog' ref={blogFormRef}>
            <br/><BlogForm createBlog={createBlog}/><br/>
          </Togglable>
        {blogs.sort((a,b) => b.likes-a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} like/>
        )}
        </div>
      }
    </div>
  )
}

export default App
