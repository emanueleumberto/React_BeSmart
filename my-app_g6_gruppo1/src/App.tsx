import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Prodotti from './pages/Prodotti'
import NonTrovato from './pages/NonTrovato'
import DettaglioProdotto from './pages/DettaglioProdotto'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/prodotti' element={<Prodotti />} />
        <Route path='/prodotti/:id' element={<DettaglioProdotto />} />
        <Route path='*' element={<NonTrovato />} />
      </Routes>
    </>
  )
}

export default App
