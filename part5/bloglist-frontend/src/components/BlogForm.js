import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleTitleChange = (event) => {
    setBlogTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setBlogAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setBlogUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })

    setBlogAuthor('')
    setBlogTitle('')
    setBlogUrl('')
  }

  return (
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
}

export default BlogForm