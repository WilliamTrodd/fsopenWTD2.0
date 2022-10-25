import { configureStore } from '@reduxjs/toolkit'

import blogService from './services/blogs'
import userService from './services/users'
import blogReducer, { setBlogs } from './reducers/blogReducer'
import notifReducer from './reducers/notifReducer'
import userReducer from './reducers/userReducer'
import usersReducer, { setUsers } from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notif: notifReducer,
    user: userReducer,
    users: usersReducer,
  }
})

blogService.getAll().then(blogs =>
  store.dispatch(setBlogs(blogs))
)

userService.getAll().then(users =>
  store.dispatch(setUsers(users))
)

export default store
