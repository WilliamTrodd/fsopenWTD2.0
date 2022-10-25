import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notifReducer'
import { useNavigate } from 'react-router-dom'
import { Box, Grid, TextField, Button } from '@mui/material'

const BlogForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addBlog = (event) => {
    event.preventDefault()
    const blogTitle = event.target.blogtitle.value
    const blogAuthor = event.target.blogauthor.value
    const blogUrl = event.target.blogurl.value
    dispatch(createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }))
    navigate('/blogs')
    dispatch(setNotification(`Blog: ${blogTitle} by ${blogAuthor} added`, 'notification' ,10))

  }

  return (
    <Grid item xs={8} justify={'center'}>
      <br/>
      <form onSubmit={addBlog}>
        <TextField
          label="Blog Title"
          fullWidth
          margin="normal"
          type="text"
          id="blogtitle"
          name="blogtitle"
          placeholder="Title"/>
        <TextField
          label="Blog Author"
          fullWidth
          margin="normal"
          type="text"
          id="blogauthor"
          name="blogauthor"
          placeholder="Author"/>
        <TextField
          label="Blog Url"
          fullWidth
          margin="normal"
          type="text"
          id="blogurl"
          name="blogurl"
          placeholder="URL"/>
        <Box textAlign="center">
          <Button type="submit" id="blog-submit" sx={{ fontSize: 'large', height: '100%' }}>
          Submit
          </Button>
        </Box>

      </form>
      <br/>
    </Grid>
  )
}

export default BlogForm