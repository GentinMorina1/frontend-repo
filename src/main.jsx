import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { Provider } from 'react-redux';
import Edit from './pages/Edit.jsx'
import { store } from './redux/store.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}> {/* Wrap your App component with the Provider */}

    <App />  </Provider>,


)
