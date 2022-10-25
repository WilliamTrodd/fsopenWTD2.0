import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogList from './BlogList'
import { setUsers } from '../reducers/usersReducer'
import usersService from '../services/users'
import { Grid, TableContainer,Table,TableHead,TableRow,TableCell,TableBody, Typography } from '@mui/material'

export const User = ({ user }) => {
  const loggedUser = useSelector(state => state.user)
  const dispatch = useDispatch(usersService.getAll())
  const blogs = useSelector(state => state.blogs.filter(blog => blog.user.id === user.id))
  dispatch(setUsers)
  if(!user){
    return null
  }

  return (
    <>
      <Grid item xs={8}>
        <Typography variant="h5">{user.username}</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h6">Added blogs</Typography>
      </Grid>
      <BlogList blogs={blogs} user={loggedUser}/>
    </>
  )

}

const UserList = () => {
  const users = useSelector(state => state.users)

  return(
    <Grid item xs={8}>
      <Typography variant="h5">Users</Typography>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user =>
              (<TableRow key={user.id}>
                <TableCell><Link to={`/users/${user.id}`}>{user.username}</Link></TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>)
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export default UserList