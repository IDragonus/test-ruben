import { useEffect, useState, useRef } from 'react'
import { api } from '../../api'
import { Navbar } from '../../components/navbar/Navbar'
import { makeStyles } from '@mui/styles'
import { useLocation } from 'react-router-dom'
import { Sidebar } from './../../components/sidebar/Sidebar'
import { CustomCard } from '../../components/card/CustomCard'
import { useSelector, useDispatch } from 'react-redux'
import { setMeals } from '../../store'

import Pagination from '@mui/material/Pagination'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: 0,
    [theme.breakpoints.up('md')]: {
      marginLeft: props => props.sidebarWidth
    },
    height: '100vh',
    display: 'flex',
    flexFlow: 'column'
  },
  toolbar: theme.mixins.toolbar,
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))',
    gap: '1rem',
    width: '80%',
    margin: 'auto'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

export default function Dashboard() {
  const meals = useSelector(state => state.meals.meals)
  const sidebarRef = useRef(null)
  const sidebarWidth = sidebarRef.current ? sidebarRef.current.clientWidth : 0
  const classes = useStyles({ sidebarWidth })
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [page, setPage] = useState(1)
  const pageSize = 5
  const totalCards = meals.length
  const pageCount = Math.ceil(totalCards / pageSize)
  const dispatch = useDispatch()

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const cardsToDisplay = meals.slice((page - 1) * pageSize, page * pageSize)

  const getMealsByCategory = async category => {
    await api
      .get(`/json/v1/1/filter.php?c=${category}`)
      .then(res => {
        dispatch(setMeals(res.data.meals))
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const getMeals = async () => {
    await api
      .get('/json/v1/1/filter.php?a=Canadian')
      .then(res => {
        dispatch(setMeals(res.data.meals))
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getMeals()
  }, [])

  return (
    <div className={classes.root}>
      <Navbar toggleOpen={toggleOpen} />
      <Sidebar isOpen={isOpen} toggleOpen={toggleOpen} getMealsByCategory={getMealsByCategory} />
      <main className={classes.content}>
        <div className={classes.toolbar}></div>
        <div className={classes.grid}>
          {cardsToDisplay.map((meal, index) => {
            return <CustomCard key={index} meal={meal} />
          })}
        </div>
        <Pagination
          className={classes.pagination}
          count={pageCount}
          page={page}
          onChange={handlePageChange}
        />
      </main>
    </div>
  )
}
