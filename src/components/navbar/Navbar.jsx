import { useState } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@mui/material'
import { makeStyles } from '@mui/styles'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { setToken } from '../../store'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import SearchInput from '../searchInput/SearchInput'
import './styles.css'

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  }
}))

export const Navbar = ({ toggleOpen }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(setToken(''))
    navigate('/')
  }

  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={toggleOpen}
          edge='start'
          className={classes.menuButton}>
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' noWrap className={classes.title}>
          Meals
        </Typography>
        <SearchInput />
        <IconButton color='inherit' onClick={handleMenuOpen}>
          <AccountCircleIcon className={classes.avatar} />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

Navbar.propTypes = {
  toggleOpen: PropTypes.func.isRequired
}
