import ClassComponentLifecycle from './components/ClassComponentLifecycle'
import './App.css'
import FunctionalComponentLifecycle from './components/FunctionalComponentLifecycle'
import FunctionalComponentExample from './components/FunctionalComponentExample'
import ListUsersComponent from './components/ListUsersComponent'
import FormUser from './components/FormUser'
import { listUser } from './users'
import { useState } from 'react'

function App() {

  const [users, setUser] = useState(listUser);

  const removeUser = (obj) => {
        //console.log("Remove User ", obj.id);
        //let arr = [...users];
        // let arr = Object.assign([], users)
        // const index = arr.indexOf(obj)
        // arr.splice(index, 1)
        // setUser(arr)

        //let arr = arr.filter(u => u.id != obj.id)
        // setUser(arr.filter(u => u.id != obj.id))

        setUser(prev => prev.filter(u => u.id != obj.id))

    }

    const addUser = (obj) => {
      // console.log(obj);
      setUser([...users, obj])
    }

  return (
    <>
      {/* <ClassComponentLifecycle /> */}
      {/* <FunctionalComponentLifecycle /> */}
      {/* <FunctionalComponentExample /> */}
      <FormUser addUser={addUser} />
      <ListUsersComponent users={users} removeUser={removeUser}/>
    </>
  )

}

export default App
