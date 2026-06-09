import { useEffect, useState } from "react";


export default function FormUser({addUser}) {

    let obj = {id: 0, name: '', lastname: '', phone: '', email:''}
    // const [name, setName] = useState('')
    // const handleName = (e) => {setName(e.target.value)}

    const [user, setUser] = useState({})

    const handleName = (e) => { setUser({...user, name: e.target.value}) }
    const handleLastname = (e) => { setUser({...user, lastname: e.target.value}) }

    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value);
        setUser({...user, [e.target.name]: e.target.value})
        console.log(user);
    }

    const saveUser = () => {
        addUser(user)
    }

    

    return (
        <>
        <div>
            <h1>Add User</h1>
            <input type='text' name='name' placeholder='Insersici nome' onChange={handleChange} />
            <input type='text' name='lastname' placeholder='Inserisci cognome' onChange={handleChange} />
            <input type='text' name='phone' placeholder='Inserisci telefono' onChange={handleChange} />
            <input type="email" name='email' placeholder='Inserisci email' onChange={handleChange} />
            <button type='button' onClick={saveUser}>Add User</button>
        </div>
        </>
    )
}
