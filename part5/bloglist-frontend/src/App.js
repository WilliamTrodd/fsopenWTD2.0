import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notifMessage, setNotifMessage] = useState(null)
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
    } catch (error) {
      notifier('blog not added', 'error')
    }
  }

  const deleteBlog = async (blogObject) => {
    try{
      blogService.remove(blogObject.id)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
    } catch (exception) {
      notifier(`Cannot remove blog ${blogObject.title}`, 'error')
    }
  }

  const addLike = async (id, blogToUpdate) => {
    try{
      await blogService.update(id, blogToUpdate)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : { ...blog, likes: blogToUpdate.likes }))
    } catch(exception) {
      notifier(`Cannot update blog ${blogToUpdate.title}`, 'error')
    }
  }

  const handleLogout = () => {
    try {
      setUser(null)
      window.localStorage.removeItem('loggedBlogappUser')
      notifier('Logged out successfully', 'notification')
    } catch (error) {
      notifier('Couldn\'t log out', 'error')
    }
  }

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
        <LoginForm notifier={notifier} setUser={setUser} /> :
        <div>
          <p>{user.name} logged in</p>{logoutButton()}
          <Togglable buttonLabel = 'create new blog' ref={blogFormRef}>
            <br/><BlogForm createBlog={createBlog}/><br/>
          </Togglable>
          {blogs.sort((a,b) => b.likes-a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} username={user.username}/>
          )}
        </div>
      }
    </div>
  )
}

export default App
