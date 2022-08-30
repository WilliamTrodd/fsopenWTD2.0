import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
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

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
      }
      try{
        const returnedBlog = await blogService.create(blogObject)
        setBlogs(blogs.concat(returnedBlog))
        notifier(`a new blog ${blogTitle} by ${blogAuthor} added`, 'notification')
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
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

  const handleTitleChange = (event) => {
    setBlogTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setBlogAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setBlogUrl(event.target.value)
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

  const blogForm = () => (
    <form onSubmit={addBlog}>
      Blog Title:
      <input
        value={blogTitle}
        onChange={handleTitleChange}
      /><br/>
      Blog Author:
      <input
        value={blogAuthor}
        onChange={handleAuthorChange}
      /><br/>
      Blog Url:
      <input
        value={blogUrl}
        onChange={handleUrlChange}
      />
      <button
        type="submit"  
      >
        create
      </button>
    </form>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notifMessage} styleName={notifType}/>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>{logoutButton()}
          <br/>{blogForm()}<br/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </div>
      }
    </div>
  )
}

export default App
