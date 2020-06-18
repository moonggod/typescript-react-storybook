import 'reflect-metadata' // required by class-validator family
import React from 'react'
import './App.css'
import { AppRouter } from './routers/AppRouter'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import gfashionThemeMemo from './styles/gfashionThemeMemo'

function App() {
  return (
    <ThemeProvider theme={gfashionThemeMemo()}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  )
}

export default App
