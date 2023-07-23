import { TextField, InputAdornment, Chip } from '@mui/material'
import { makeStyles } from '@mui/styles'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchTerm, setSearchHistory, setMeals } from '../../store'
import './style.css'
import { useEffect } from 'react'
import { api } from '../../api'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    },
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5)
    }
  }
}))

function SearchInput() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const searchTerm = useSelector(state => state.search.searchTerm)
  const searchHistory = useSelector(state => state.search.searchHistory)
  useEffect(() => {
    console.log(searchHistory)
  }, [searchHistory])

  const handleSearchTermChange = event => {
    dispatch(setSearchTerm(event.target.value))
  }

  const getMealsByName = async name => {
    await api
      .get(`/json/v1/1/search.php?s=${name}`)
      .then(res => {
        if (res.data.meals === null) {
          getMeals()
        } else {
          dispatch(setMeals(res.data.meals))
        }
      })
      .catch(err => {
        console.log(err)
      })
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

  const handleSearchSubmit = event => {
    event.preventDefault()
    if (searchTerm.trim() === '') {
      getMeals()
      return
    }
    if (!searchHistory.includes(searchTerm)) {
      if (searchHistory.length != 10) {
        dispatch(setSearchHistory([...searchHistory, searchTerm]))
      } else if (searchHistory.length === 10) {
        let newHistory = [...searchHistory]
        newHistory.shift()
        newHistory.push(searchTerm)
        dispatch(setSearchHistory(newHistory))
      }
    }
    getMealsByName(searchTerm)
  }

  return (
    <div>
      <form className={classes.root} noValidate onSubmit={handleSearchSubmit}>
        <TextField
          id='search-input'
          type='text'
          value={searchTerm}
          onChange={handleSearchTermChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position='end'
                onClick={() => {
                  getMeals()
                  dispatch(setSearchTerm(''))
                }}>
                <ClearIcon />
              </InputAdornment>
            )
          }}
        />
      </form>
      <div className={classes.root}>
        {searchHistory &&
          searchHistory.map(searchTag => <Chip key={searchTag} label={searchTag} />)}
      </div>
    </div>
  )
}

export default SearchInput
