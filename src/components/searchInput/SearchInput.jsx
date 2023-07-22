import { TextField, InputAdornment, Chip } from '@mui/material'
import { makeStyles } from '@mui/styles'
import SearchIcon from '@mui/icons-material/Search'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchTerm, setSearchHistory } from '../../store'
import './style.css'

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

  const handleSearchTermChange = event => {
    dispatch(setSearchTerm(event.target.value))
  }

  const handleSearchSubmit = event => {
    event.preventDefault()
    if (searchTerm.trim() === '') {
      return
    }
    if (!searchHistory.includes(searchTerm)) {
      dispatch(setSearchHistory(prevSearchHistory => [...prevSearchHistory.slice(-9), searchTerm]))
    }
    setSearchTerm('')
  }

  const handleChipDelete = chipToDelete => () => {
    dispatch(
      setSearchHistory(prevSearchHistory => prevSearchHistory.filter(chip => chip !== chipToDelete))
    )
  }

  return (
    <div>
      <form className={classes.root} noValidate onSubmit={handleSearchSubmit}>
        <TextField
          id='search-input'
          label='Buscar'
          type='search'
          value={searchTerm}
          onChange={handleSearchTermChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </form>
      <div className={classes.root}>
        {searchHistory.map(searchTag => (
          <Chip key={searchTag} label={searchTag} onDelete={handleChipDelete(searchTag)} />
        ))}
      </div>
    </div>
  )
}

export default SearchInput
