import { useState } from 'react'

const Blog = ({blog, addLike}) => {
  const [visible, setVisible] = useState(false)
  const [blogObject, setBlogObject] = useState(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft:2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const toggleVisible = () => {
    setVisible(!visible)
  }

  const likeHandler =  () => {
    const updated = {...blog, likes: blog.likes+1}
    addLike(blog.id, updated)
    setBlogObject(updated)
  }

  const blogView = () => {
    if (visible) {
      return (
        <div>
          {blog.title} {blog.author} <button onClick={toggleVisible}>hide</button> <br/>
          {blog.url} <br/>
          likes: {blogObject.likes} <button onClick={() => likeHandler()}>like</button> <br/>
          {blog.user.name}
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