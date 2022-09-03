import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft:2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBlog = async (blog) => {
    setLikes(likes+1)
    const updated = {...blog, user: blog.user.id, likes: blog.likes+1}
    console.log(updated)
    blogService
      .update(blog.id, updated)
  }
  
  const toggleVisible = () => {
    setVisible(!visible)
  }

  const blogView = () => {
    if (visible) {
      return (
        <div>
          {blog.title} - {blog.author} <button onClick={toggleVisible}>hide</button> <br/>
          {blog.url} <br/>
          likes: {likes} <button onClick={() => {likeBlog(blog)}}>like</button> <br/>
          {blog.user? blog.user.name : ''}
        </div>)
     } else { 
       return(
         <div>
          {blog.title} - {blog.author} <button onClick={toggleVisible}>view</button> 
        </div>)
      }
  }
  
  return (
    <div style ={blogStyle}>
      <div>
        {blogView()}
      </div>  
    </div>
)}

export default Blog