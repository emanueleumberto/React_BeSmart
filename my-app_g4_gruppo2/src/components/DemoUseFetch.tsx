import useFetch from "../hooks/useFetch"

interface User {
    id: number,
    name: string,
    username: string,
    email: string
}

export default function DemoUseFetch() {

    const {dati, caricamento, error} = useFetch<User[]>('https://jsonplaceholder.typicode.com/users')

    if (caricamento) return <p>Caricamento....</p>
    if (error) return <p>Errore - {error}</p>

    return (
        <div>
            <ul>
                {dati?.map(ele => <li>{ele.name} Username: {ele.username} email: {ele.email}</li>)}
            </ul>
        </div>
    )
}
