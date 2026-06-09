import { useState } from "react"


export default function FormUser({addUser}) {

    const obj = {id:1, name: '', lastname: '', phone: '', email: ''}

    // const [name, setName] = useState('');
    // const [lastname, setLastname] = useState('');
    const [user, setUser] = useState({});

    // const handleName = (e) => {
    //     //console.log(e.target.value);
    //     setName(e.target.value)
    // }

    // const handleLastname = (e) => {
    //     //console.log(e.target.value);
    //     setLastname(e.target.value)
    // }

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
        //console.log(user);
    }

    const handleSubmit = () => {
        //console.log(user);
        addUser(user)
    }


  return (
    <div>
        <h1>Add User</h1>
        <input type='text' placeholder='Inserisci un nome' name="name" onChange={handleChange}/>
        <input type='text' placeholder='Inserisci un cognome' name="lastname" onChange={handleChange} />
        <input type='text' placeholder='Inserisci un telefono' name="phone" onChange={handleChange} />
        <input type='text' placeholder='Inserisci una email' name="email" onChange={handleChange} />
        <button type='button' onClick={handleSubmit}>Add User</button>
    </div>
  )
}
