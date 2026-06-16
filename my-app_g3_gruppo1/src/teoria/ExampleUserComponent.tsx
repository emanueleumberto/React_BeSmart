import { useEffect, useState } from "react"
import { Alert, Button, Container, ListGroup, Spinner } from "react-bootstrap";

type User = {
    id: number,
    name: string,
    username: string,
    email: string,
    phone?: string,
    website?: string
  }

type UserReturn = {
    users: User[]
    loading: boolean
    error: string | null
    removeUser: (id: number) => void
}

export default function useUser(): UserReturn {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=> {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then((data: User[]) => { // Annotazione sul dato ricevuto
                setTimeout(() => {
                    setUsers(data)
                    setLoading(false)
                }, 2000)
            })
            .catch((err: Error) => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    const removeUser = (id: number): void => {
        setUsers(prev => prev.filter(u => u.id !== id))
    }

  return (
    <Container>
        {loading && <Spinner animation="border" />}
        {error && <Alert variant='danger'>{error}</Alert>}
        <ListGroup>
            {users.map(ele => <ListGroup.Item>
                {ele.name} 
                <Button variant="dark" onClick={() => removeUser(ele.id)}>X</Button>
            </ListGroup.Item>)}
        </ListGroup> 
    </Container>
  )

    // return {users, loading, error, removeUser}
}

// Utilizzo del componente ExampleUserComponent 

function ExampleApp() {

    const {users, loading, error, removeUser} = useUser()
 
      return (
    <Container>
        {loading && <Spinner animation="border" />}
        {error && <Alert variant='danger'>{error}</Alert>}
        <ListGroup>
            {users.map(ele => <ListGroup.Item>
                {ele.name} 
                <Button variant="dark" onClick={() => removeUser(ele.id)}>X</Button>
            </ListGroup.Item>)}
        </ListGroup> 
    </Container>
  )
}
