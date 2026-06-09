import { useState } from 'react'
import './App.css'
import ClassComponentLifecycle from './components/ClassComponentLifecycle'
import FormUser from './components/FormUser'
import FuncionalComponentExample from './components/FuncionalComponentExample'
import UserlistComponent from './components/UserlistComponent'
import { listUsers } from "./users"

function App() {

  const [users, setUsers] = useState(listUsers)

  const removeUser = (obj) => {
        console.log("Remove user: ", obj.id);
        // const index = users.indexOf(obj)
        // users.splice(index, 1)
        // let arr = users.filter(u => u.id != obj.id)
        // console.log(arr);
        // setUsers(arr)

        setUsers(prev => prev.filter(u => u.id != obj.id))
    }

    const addUser = (obj) => {
        // let obj = {id: 7, name: 'Franco', lastname: 'Blue', phone: '98765', email:'f.blue@example.com'}
        // users.push(obj) // Sconsigliato!!!
        // let arr = [...users]
        // arr.push(obj)
        // setUsers(arr)

        setUsers([...users, obj])
    }

  return (
    <>
      <FormUser addUser={addUser} />
      <UserlistComponent users={users} removeUser={removeUser} />
      {/* <ClassComponentLifecycle /> */}
      {/* <FuncionalComponentExample />*/}
    </> 
  )

}

export default App
