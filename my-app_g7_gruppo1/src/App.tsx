import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import LayoutPrincipale from './layouts/LayoutPrincipale'
import ListaProdottiPage from './pages/ListaProdottiPage'
import LayoutDashboard from './layouts/LayoutDashboard'
import DashboardPage from './pages/DashboardPage'
import DettaglioProdottoPage from './pages/DettaglioProdottoPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {

  return (
    <>
      <Routes>
        {/* Route padre -> ageisce da wrapper per tutte le rotte figlie */}
        <Route path='/' element={<LayoutPrincipale />}>
          <Route index element={<HomePage />} />

          {/* Route con Secondo livello di nidificazione */}
          <Route path='/dashboard' element={<LayoutDashboard />}>
            <Route index element={<DashboardPage />} />
          </Route>

          {/* Route con parametri dinamici di secondo livello */}
          <Route path='/prodotti'>
            <Route index element={<ListaProdottiPage />} />
            <Route path=':id' element={<DettaglioProdottoPage />} />
          </Route>

          {/* Redirect -> rimanda alla pagina home -> '/' */}
          <Route path='/home' element={<Navigate to="/" replace />} />
        
          <Route path='*' element={<NotFoundPage />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
