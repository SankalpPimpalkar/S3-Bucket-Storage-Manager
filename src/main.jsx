import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CredentialsProvider from './context/CredentialsProvider.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CredentialsProvider>
      <App />
    </CredentialsProvider>
  </BrowserRouter>
)
