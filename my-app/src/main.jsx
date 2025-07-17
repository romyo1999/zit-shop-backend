import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import '@fortawesome/fontawesome-svg-core/styles.css';
import { FavoritProvider } from './providers/FavoritProvider.jsx'
import { UserProvider } from './providers/UserProvider.jsx'
import { CartProvider } from './providers/CartProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
          <FavoritProvider>
            <CartProvider>
            <App />
            </CartProvider>
        </FavoritProvider>
    </UserProvider>

  </React.StrictMode>,
)
