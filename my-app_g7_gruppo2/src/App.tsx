
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import LayoutPrincipale from './layouts/LayoutPrincipale'
import HomePage from './pages/HomePage'
import LayoutDashboard from './layouts/LayoutDashboard'
import DashboardPage from './pages/DashboardPage'
import ListaProdotti from './pages/ListaProdotti'
import DettaglioProdotti from './pages/DettaglioProdotti'
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
            <Route index element={<ListaProdotti />} />
            <Route path=':id' element={<DettaglioProdotti />} />
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
