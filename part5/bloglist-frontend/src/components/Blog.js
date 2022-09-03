import { useState } from 'react'

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)

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

  const blogView = () => {
    if (visible) {
      return (
        <div>
          {blog.title} {blog.author} <button onClick={toggleVisible}>hide</button>
          {blog.url} <br/>
          likes: {blog.likes} <button>like</button> <br/>
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