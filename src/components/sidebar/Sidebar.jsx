import { useState, useEffect } from 'react'
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import PropTypes from 'prop-types'
import { api } from '../../api'

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 0,
    flexShrink: 0
  },
  drawerPaper: {
    width: 240
  },
  toolbar: theme.mixins.toolbar,
  hideButton: {
    marginLeft: 'auto'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    margin: '0'
  }
}))

export const Sidebar = ({ toggleOpen, isOpen, getMealsByCategory }) => {
  const [categories, setCategories] = useState([])
  const classes = useStyles()

  const getCategories = async () => {
    await api
      .get('/json/v1/1/list.php?c=list')
      .then(res => {
        setCategories(res.data.meals)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <Drawer
      className={classes.drawer}
      variant='persistent'
      anchor='left'
      open={isOpen}
      classes={{
        paper: classes.drawerPaper
      }}>
      <div className={classes.toolbar}>
        <IconButton onClick={toggleOpen} className={classes.hideButton}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <List>
        <p className={classes.title}>Categories</p>
        {categories.map((category, index) => {
          return (
            <ListItem
              button
              key={index}
              onClick={() => {
                getMealsByCategory(category.strCategory)
              }}>
              <ListItemText primary={category.strCategory} />
            </ListItem>
          )
        })}
      </List>
    </Drawer>
  )
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  getMealsByCategory: PropTypes.func.isRequired
}
