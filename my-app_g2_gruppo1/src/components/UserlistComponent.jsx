import { useState } from "react"
import { listUsers } from "../users"
import ListItemComponent from "./ListItemComponent";


export default function UserlistComponent({users, removeUser}) {

    return (
        <>
            <h1>User List</h1>
            {/* <button onClick={addUser}>Add User</button> */}
            <ul>
                {users.map((u,i) => <ListItemComponent key={u.id} obj={u} remove={removeUser}/>)}
            </ul>
        </>
        
    )
}





