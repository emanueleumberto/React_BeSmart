
export default function UsersComponent({utenti, remove}) {

    // console.log(utenti);

    
    return (
        <div>
            <h1>User List {utenti.length}</h1>
            <ul>
                {utenti.map(u => <li>{u.name} {u.lastname} <button onClick={() => remove(u)}>Remove</button></li>)}
            </ul>
        </div>
    )
}
