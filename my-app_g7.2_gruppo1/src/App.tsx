
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import NonTrovato from './pages/NonTrovato'
import NonAutorizzato from './pages/NonAutorizzato'
import FormLogin from './pages/FormLogin'
import Dashboard from './pages/Dashboard'
import RoutePrivate from './guards/RoutePrivate'
import Profile from './pages/Profile'
import RouteRole from './guards/RouteRole'
import AdminPage from './pages/AdminPage'

function App() {


  return (
    <>
      <Routes>
        {/* Rotte pubbliche accessibili da tutti*/}
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<FormLogin />} />
        <Route path='/non-autorizzato' element={<NonAutorizzato />} />

        {/* Rotte private accessibili dopo login*/}
        <Route element={<RoutePrivate />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />

          <Route element={<RouteRole ruoliConsentiti={['admin', 'moderatore']} />} >
            <Route path='/admin' element={<AdminPage />} />
          </Route>
          
        </Route>

        <Route path='*' element={<NonTrovato />} />
      </Routes>
    </>
  )
}

export default App
