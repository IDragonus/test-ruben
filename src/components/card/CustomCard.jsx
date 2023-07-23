import { useState } from 'react'
import { setLikes, setStarts } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Rating from '@mui/material/Rating'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import Backdrop from '@mui/material/Backdrop'
import './styles.css'

const useStyles = makeStyles(() => ({
  textReducer: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}))

export const CustomCard = ({ meal }) => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const classes = useStyles()
  const likes = useSelector(state => state.meals.likes)
  const stars = useSelector(state => state.meals.stars)

  const handleClose = () => {
    setOpen(false)
  }

  function findObjectByIdLikes(id) {
    return likes.find(item => item.id === id)
  }

  function isIdInArrayLikes(id) {
    return likes.some(item => item.id === id)
  }

  const setLikeToStore = id => {
    if (isIdInArrayLikes(id)) {
      const updateLikes = likes.map(item => {
        if (item.id === id) {
          return { ...item, likes: !item.likes }
        }
        return item
      })
      dispatch(setLikes(updateLikes))
    } else {
      dispatch(setLikes([...likes, { id: id, likes: true }]))
    }
  }

  function findObjectByIdStars(id) {
    return stars.find(item => item.id === id)
  }

  function isIdInArrayStars(id) {
    return stars.some(item => item.id === id)
  }

  const setStarsToStore = (id, value) => {
    if (isIdInArrayStars(id)) {
      const updateStars = stars.map(item => {
        if (item.id === id) {
          return { ...item, stars: value }
        }
        return item
      })
      dispatch(setStarts(updateStars))
    } else {
      dispatch(setStarts([...stars, { id: id, stars: value }]))
    }
  }

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          title={meal.strMeal}
          titleTypographyProps={{ className: classes.textReducer }}
        />
        <CardMedia
          component='img'
          height='194'
          image={meal.strMealThumb}
          alt={meal.strMeal}
          onClick={() => {
            setOpen(true)
          }}
        />
        <CardActions disableSpacing>
          <IconButton
            aria-label='add to favorites'
            onClick={() => {
              setLikeToStore(meal.idMeal)
            }}>
            <FavoriteIcon style={findObjectByIdLikes(meal.idMeal)?.likes ? { color: 'red' } : {}} />
          </IconButton>
          <Rating
            name='simple-controlled'
            value={
              findObjectByIdStars(meal.idMeal)?.stars ? findObjectByIdStars(meal.idMeal).stars : 0
            }
            onChange={(_, newValue) => {
              setStarsToStore(meal.idMeal, newValue)
            }}
          />
        </CardActions>
      </Card>
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}>
        <img src={meal.strMealThumb} />
      </Backdrop>
    </>
  )
}

CustomCard.propTypes = {
  meal: PropTypes.any.isRequired
}
