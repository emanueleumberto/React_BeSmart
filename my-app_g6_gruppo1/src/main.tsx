import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* BrowserRouter avvolge tutta l'app e la mette in ascolto del cambiamento del url */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
