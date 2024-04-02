import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App.jsx'
import './index.css'
import reduxStore from './redux-store/redux_index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </React.StrictMode>,
)
