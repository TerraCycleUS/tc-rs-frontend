import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import App from './App'
import { LocaleProvider } from './context/locale'
import theme from './utils/theme'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { UserDataProvider } from './context/user'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <LocaleProvider>
        <UserDataProvider>
          <App />
        </UserDataProvider>
      </LocaleProvider>
    </ThemeProvider>
  </BrowserRouter>,
)
