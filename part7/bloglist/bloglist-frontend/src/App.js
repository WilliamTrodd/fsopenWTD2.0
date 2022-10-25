import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
//import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'
import UserList, { User } from './components/Users'
import blogService from './services/blogs'
import { login } from './reducers/userReducer'
import { Routes, Route, useMatch } from 'react-router-dom'
import { Grid } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  console.log(user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
      blogService.setToken(user.token)
    }
  },[])


  // Matchers for Routing - check for ids of users and blogs
  const match = useMatch('/users/:id')
  const checkedUser = match
    ? users.find(u => u.id === match.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const matchedBlog = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null

  return (
    <div>

      <Notification />

      {user === null
        ? <LoginForm />
        :<>
          <Grid
            sx={{ flexGrow: 1 }}
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12}>
              <Navbar user={user} />
            </Grid>
            <Routes>
              <Route path="/newblog" element={<BlogForm />} />
              <Route path="/blogs" element={<BlogList blogs={blogs} username={user.username}/>} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:id" element={<User user={checkedUser}/> } />
              <Route path="/blogs/:id" element={<Blog blog={matchedBlog} username={user.username}/>} />
            </Routes>
          </Grid>
        </>
      }
    </div>
  )
}

export default App
