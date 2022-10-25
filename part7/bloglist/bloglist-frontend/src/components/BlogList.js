import { Link } from 'react-router-dom'
import { TableContainer, Grid, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

const BlogList = ({ blogs }) => {
  const sortedBlogs = [...blogs].sort((a,b) => b.likes-a.likes)
  return(
    <Grid item xs={8} sx={{ overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight:440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow >
              <TableCell>Blog Title</TableCell>
              <TableCell>Likes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedBlogs.map(blog =>
              <TableRow hover key={blog.id}>
                <TableCell><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></TableCell>
                <TableCell>{blog.likes}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export default BlogList