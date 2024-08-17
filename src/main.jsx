import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './redux/store'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
