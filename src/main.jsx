import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './Context/UserProvider.jsx'
import { CaptainProvider } from './Context/CaptainProvider.jsx'
import SocketProvider from './Context/SocketProvider.jsx'

createRoot(document.getElementById('root')).render(
  <SocketProvider>
  <CaptainProvider>
  <UserProvider>
 <BrowserRouter>
    <App />
  </BrowserRouter>
  </UserProvider>
  </CaptainProvider>
  </SocketProvider>,
)
