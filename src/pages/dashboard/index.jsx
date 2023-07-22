import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setToken } from '../../store'
import { api } from '../../api'

export default function Dashboard() {
  const [meals, setMeals] = useState([])
  const dispatch = useDispatch()

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
    <button
      onClick={() => {
        dispatch(setToken(''))
      }}>
      Logout
    </button>
  )
}
