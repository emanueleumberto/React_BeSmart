import React, { useState } from 'react' // Da React 17+ non serve più importare React per utilizzare JSX
import './App.css'
import ClassComponent from './components/ClassComponent'
import FunctionalComponent from './components/FunctionalComponent'
import { listUsers } from './users'
import UsersComponent from './components/UsersComponent'

function App() {

  const [users, setUsers] = useState(listUsers)

  return (
    <>
      <h1>Prima pagina React</h1> 
      <h2>Sono un sottotitolo</h2>

      <ClassComponent titolo="Sono un Componente di tipo Classe" autore="Mario Rossi"/>
      <FunctionalComponent titolo="Sono un Componente di tipo Funzione" autore="Mario Rossi" />

      <UsersComponent users={users} />
      
    </>
  )
}

export default App
