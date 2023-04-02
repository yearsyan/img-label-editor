import React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App'
import 'antd/dist/reset.css'

const container = document.getElementById('app')!
const root = ReactDOM.createRoot(container)
root.render(<App />)
