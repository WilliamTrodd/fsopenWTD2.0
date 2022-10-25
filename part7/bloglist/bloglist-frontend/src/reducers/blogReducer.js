import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notifReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      const blogs = [...action.payload]
      return blogs
    },
    removeBlog(state, action) {
      const filteredBlogs = [...state].filter(blog => blog.id !== action.payload)
      return filteredBlogs
    },
    likeBlog(state, action){
      const newBlogs = [...state].map(blog => blog.id !== action.payload.id ? blog : { ...blog, likes: action.payload.likes }).sort((a,b) => b.likes-a.likes)
      return newBlogs
    },
    addComment(state, action){
      const newBlogs = [...state].map(blog => blog.id !== action.payload.id ? blog : { ...blog, comments: action.payload.comments })
      return newBlogs
    }
  }
})

export const { appendBlog, setBlogs, removeBlog, likeBlog, addComment } = blogSlice.actions

export const createBlog = blogObj => {
  return async dispatch => {
    try{
      const newBlog = await blogService.create(blogObj)
      dispatch(appendBlog(newBlog))
    } catch(e) {
      dispatch(setNotification('Blog not added', 'error', 10))
    }
  }
}

export const deleteBlog = blogId => {
  return async dispatch => {
    try{
      await blogService.remove(blogId)
      dispatch(removeBlog(blogId))
    } catch(exception) {
      dispatch(setNotification(`Cannot remove blog with ${blogId}`, 'error',10))
    }
  }
}

export const addLike = blog => {
  const updated = { ...blog, likes: blog.likes+1 }
  console.log('updated:')
  console.log(updated)
  return async dispatch => {
    await blogService.update(blog.id, updated)
    dispatch(likeBlog(updated))
  }
}

export const newComment = (blog, comment)  => {
  const updated = { ...blog, comments: [...blog.comments, comment] }
  return async dispatch => {
    await blogService.update(blog.id, updated)
    dispatch(addComment(updated))
  }
}


export default blogSlice.reducer