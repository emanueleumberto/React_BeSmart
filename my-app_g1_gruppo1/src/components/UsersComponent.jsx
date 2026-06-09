import React from 'react'

export default function UsersComponent({users}) {

    const removeUser = (obj) => {
        console.log('Remove User ', obj.id)
    }


  return (
    <div>
        <h1>User List {users.length}</h1>
        <ul>
            {users.map((u, i) => (
                <li key={u.id}>{u.name} {u.lastname} <button onClick={() => removeUser(u)}>Remove</button></li>
            ))}
        </ul>
    </div>
  )
}
