import React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './store'
import { Provider } from 'react-redux'
import './index.css'

const container = document.getElementById('app')!
const root = ReactDOM.createRoot(container)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
