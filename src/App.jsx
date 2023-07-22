import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './utils/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router()} />
    </ThemeProvider>
  )
}

export default App
