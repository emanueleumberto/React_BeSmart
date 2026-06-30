import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import FormLogin from './pages/FormLogin'
import RoutePrivate from './guards/RoutePrivate'
import DashboardPage from './pages/DashboardPage'
import NotAuthPage from './pages/NotAuthPage'
import RouteAuth from './guards/RouteAuth'
import AdminPage from './pages/AdminPage'

function App() {

  return (
    <>
      <Routes>

        {/* Rotte pubbliche accessibili da tutti */}
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<FormLogin />} />
        <Route path='/not-auth' element={<NotAuthPage />} />

        {/* Rotte private accessibili dopo login */}
        <Route element={<RoutePrivate />}>
          <Route path='/dashboard' element={<DashboardPage />} />

          <Route element={<RouteAuth ruoliConsentiti={['admin' , 'moderatore']} />}>
            <Route path='/admin' element={<AdminPage />} />
          </Route>

        </Route>
        
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
