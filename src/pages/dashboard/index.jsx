import { useEffect, useState, useRef } from 'react'
import { api } from '../../api'
import { Navbar } from '../../components/navbar/Navbar'
import { makeStyles } from '@mui/styles'
import { useLocation } from 'react-router-dom'
import { Sidebar } from './../../components/sidebar/Sidebar'
import { CustomCard } from '../../components/card/CustomCard'

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
    }
  },
  toolbar: theme.mixins.toolbar,
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))',
    gap: '1rem',
    width: '80%',
    margin: 'auto'
  }
}))

export default function Dashboard() {
  const sidebarRef = useRef(null)
  const sidebarWidth = sidebarRef.current ? sidebarRef.current.clientWidth : 0
  const classes = useStyles({ sidebarWidth })
  const location = useLocation()
  const [meals, setMeals] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const getMealsByCategory = async category => {
    await api
      .get(`/json/v1/1/filter.php?c=${category}`)
      .then(res => {
        setMeals(res.data.meals)
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
        setMeals(res.data.meals)
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
      {/* <Sidebar isOpen={isOpen} toggleOpen={toggleOpen} /> */}
      <main className={classes.content}>
        <div className={classes.toolbar}></div>
        <div className={classes.grid}>
          {meals.map((meal, index) => {
            return <CustomCard key={index} meal={meal} />
          })}
        </div>
      </main>
    </div>
  )
}
