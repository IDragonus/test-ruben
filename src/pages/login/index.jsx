import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { setRememberMe, setToken, setUser } from './../../store'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Input } from '../../components/custom/Input'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const defaultTheme = createTheme()

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const RubenUser = {
    user: 'test',
    password: 'test'
  }

  const dispatch = useDispatch()
  const rememberMe = useSelector(state => state.auth.rememberMe)
  const user = useSelector(state => state.auth.user)

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: rememberMe ? user : '',
      password: ''
    }
  })

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleSubmitLogin = data => {
    if (RubenUser.user === data.email && RubenUser.password === data.password) {
      rememberMe && dispatch(setRememberMe(true))
      dispatch(setUser(data.email))
      dispatch(setToken('token'))
      navigate('/dashboard')
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit(data => handleSubmitLogin(data))}
            noValidate
            sx={{ mt: 1 }}>
            <Input
              control={control}
              name='email'
              type='text'
              margin='normal'
              required
              fullWidth
              label={'Email'}
              autoComplete='email'
              autoFocus
              rules={{
                required: 'El email es requerido.'
              }}
              errors={errors}
            />
            <Input
              control={control}
              name='password'
              type={showPassword ? 'text' : 'password'}
              margin='normal'
              required
              fullWidth
              label={'Password'}
              autoComplete='current-password'
              autoFocus
              rules={{
                required: 'La constraseña es requerida.'
              }}
              errors={errors}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value='remember'
                  color='primary'
                  onChange={() => {
                    dispatch(setRememberMe(!rememberMe))
                  }}
                  checked={rememberMe}
                />
              }
              label='Remember me'
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
