import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Rating from '@mui/material/Rating'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import './styles.css'

const useStyles = makeStyles(() => ({
  textReducer: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}))

export const CustomCard = ({ meal }) => {
  const classes = useStyles()
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={meal.strMeal} titleTypographyProps={{ className: classes.textReducer }} />
      <CardMedia component='img' height='194' image={meal.strMealThumb} alt={meal.strMeal} />
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <Rating
          name='simple-controlled'
          value={1}
          onChange={(_, newValue) => {
            // setValue(newValue)
          }}
        />
      </CardActions>
    </Card>
  )
}

CustomCard.propTypes = {
  meal: PropTypes.any.isRequired
}
