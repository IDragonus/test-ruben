import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/login'
import Dashboard from './../pages/dashboard'
import { useSelector } from 'react-redux'

export const router = () => {
  const PrivateRoute = () => {
    const login = useSelector(state => state.auth.token)
    return login ? <Dashboard /> : <Login />
  }

  return createBrowserRouter([
    {
      path: '/',
      element: PrivateRoute()
    },
    {
      path: '/dashboard',
      element: PrivateRoute()
    },
    {
      path: '*',
      element: PrivateRoute()
    }
  ])
}
