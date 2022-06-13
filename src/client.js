import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { render } from 'react-dom'
import App from './App'

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

render(app, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
