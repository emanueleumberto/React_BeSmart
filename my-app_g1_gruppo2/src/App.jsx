import { useState } from 'react'
import './App.css'
import ClassComponent from './components/ClassComponent'
import FunctionalComponent from './components/FunctionalComponent'
import { listUser } from './users'
import UsersComponent from './components/UsersComponent'

function App() {

  const [users, setUsers] = useState(listUser)
  // console.log(users);

  const removeUser = (obj) =>  {
        console.log('Remove User ', obj.id);
    }


  return (
    <>
      <h1>Hello World!</h1>
      <h2>Sotto titolo</h2>

      <ClassComponent titolo="Sono un componente di tipo Classe" autore="Mario Rossi" />
      <FunctionalComponent titolo="Sono un componente di tipo Funzione" autore="Mario Rossi" />
    
      <UsersComponent utenti={users} remove={removeUser} />
    </>
  )
}

export default App
