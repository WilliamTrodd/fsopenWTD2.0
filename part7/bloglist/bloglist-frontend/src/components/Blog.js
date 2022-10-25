import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteBlog, addLike, newComment } from '../reducers/blogReducer'
import { Avatar, Box, Card, CardHeader, CardContent, Typography, InputBase, List, ListItem, Divider , Grid, IconButton, Paper } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LinkIcon from '@mui/icons-material/Link'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const BlogCard = ({ blog, username }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const deleteHandler = (id) => {
    dispatch(deleteBlog(id))
    navigate('/blogs')
  }

  const urlHandler = () => {
    location.href = blog.url
  }

  return(
    <Grid item xs={8}>
      <Card
        sx={{
          maxWidth:'100%'
        }}
      >
        <CardHeader
          title={blog.title}
          subheader={blog.author}
          action={
            <IconButton onClick={() => urlHandler()}>
              <LinkIcon />
            </IconButton>
          }
          avatar = {<Avatar alt={blog.user.username} onClick={() => navigate(`/users/${blog.user.id}`)} src="/static/images/avatar/2.jpg"/>}

        />
        <Divider />
        <CardContent>
          <Box sx={{ width: '100%',
            alignContent: 'center',
            display:'flex',
            alignItems:'center'
          }}>
            <Typography variant="h6" color="GrayText.secondary">
              {blog.likes} likes
            </Typography>
            <IconButton aria-label="" onClick={() => dispatch(addLike(blog))} sx={{ alignItems:'right' }}>
              <FavoriteIcon />
            </IconButton>
            <Box>
              {blog.user.username === username ? <IconButton onClick={() => deleteHandler(blog.id)}><DeleteOutlineIcon/></IconButton> : <br/>}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )}

const CommentList = ({ comments }) => (
  <Grid item xs={7}
    sx={{
    }}
  >
    <Typography variant="h5" color="initial">Comments</Typography>

    <List
      sx={{
        width: '75%',
        bgcolor: 'background.paper',
        justifyContent: 'center',
        margin: 'auto'
      }}
    >
      {comments.map((c,i) => (<div key={i}><ListItem key={i}><Typography variant="body2">{c}</Typography></ListItem><Divider /></div>))}
    </List>
  </Grid>
)

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()

  const commentHandler = (event) => {
    event.preventDefault()
    const commentBox = event.target.comment
    const comment = commentBox.value
    dispatch(newComment(blog, comment))
    commentBox.value=''
  }

  return (
    <Grid item xs={7} pt={10}>
      <Paper
        sx={{
          width: '100%',
          alignContent: 'center',
          display:'flex',
          alignItems:'center'
        }}
        component="form"
        onSubmit={commentHandler}
      >
        <InputBase
          sx={{
            ml:1, flex:1
          }}
          placeholder="Comment"
          id="comment"
          label="Comment"
        />
        <IconButton type="submit" sx={{ fontSize: 'large', height: '100%' }}>
          <AddCircleOutlineRoundedIcon />
        </IconButton>
      </Paper>
    </Grid>
  )
}



const Blog = ({ blog, username }) => {

  const blogView = () => {
    return (
      <>
        <BlogCard blog={blog} username={username} />
        <CommentForm blog={blog} />
        <CommentList comments={blog.comments} />
      </>
    )}

  if(!blog){
    return null
  }
  return (
    blogView()
  )}

export default Blog