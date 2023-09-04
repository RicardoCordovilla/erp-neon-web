import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { HashRouter } from 'react-router-dom/dist'
import { SnackbarProvider } from 'notistack';



const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#36f475'
    },
    secondary: {
      main: '#3f51b5'
    },
    background: {
      default: '#fafafa',
      paper: '#fafafa',
    },
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </SnackbarProvider>
    </HashRouter>
  </React.StrictMode>,
)
