import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import AdbIcon from '@mui/icons-material/Adb'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Navbar = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return(
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md:'flex' }, mr:1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/blogs"
            sx={{
              mr:2,
              display: { xs:'none', md:'flex' },
              color: 'inherit',
              textDecoration: 'none'
            }}>
              BLOGS
          </Typography>
          <Box sx={{ flexGrow:1, display:{ xs:'flex', md:'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem
                key='users'
                sx={{ my: 2,  display: 'block' }}
                component={Link}
                to="/users"
              >
              Users
              </MenuItem>
              <MenuItem
                key='newBlog'
                sx={{ my: 2,  display: 'block' }}
                component={Link}
                to="/newBlog"
              >
              Add Blog
              </MenuItem>
              <MenuItem
                key='logout'
                sx={{ my: 2, display: 'block' }}
                onClick={() => {localStorage.removeItem('loggedBlogappUser')
                  dispatch(logout())
                  navigate('/')
                }
                }
              >
              Logout
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BLOGS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key='users'
              sx={{ my: 2, color: 'white', display: 'block' }}
              component={Link}
              to="/users"
            >
              Users
            </Button>
            <Button
              key='newBlog'
              sx={{ my: 2, color: 'white', display: 'block' }}
              component={Link}
              to="/newBlog"
            >
              Add Blog
            </Button>
            <Button
              key='logout'
              sx={{ my: 2, color: 'white', display: 'block' }}
              onClick={() => {localStorage.removeItem('loggedBlogappUser')
                dispatch(logout())
                navigate('/')
              }
              }
            >
              Logout
            </Button>



          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt={user.username} src="/static/images/avatar/2.jpg" />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            </Menu>


          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )

}

export default Navbar