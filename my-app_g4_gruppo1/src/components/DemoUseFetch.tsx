import { useFetch } from "../hooks/useFetch"

interface User {
    id: number;
    name: string;
    username: string; 
    email: string
}

export default function DemoUseFetch() {

    const {dati, caricamento, errore} = useFetch<User[]>("https://jsonplaceholder.typicode.com/users")

    if (caricamento) return <p>Caricamento...</p>
    if (errore) return <p>Errore!!!</p>
    return (
        <div>
            <ul>
                {dati?.map(user => <li>{user.name} Username: {user.username} Email: {user.email}</li>)}
            </ul>
        </div>
    )
}
