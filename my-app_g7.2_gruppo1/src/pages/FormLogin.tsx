import { Alert, Button, Form } from "react-bootstrap"
import NavbarComponent from "../components/NavbarComponent"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react"

export default function FormLogin() {

    const navigate = useNavigate()
    const location = useLocation()
    const {login, utente, caricamento, errore} = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const destinazione = (location.state as {da?: string})?.da ?? '/dashboard'

    // Dopo il redirect a /login la cocation.state può contenere la pagina originale richiesta dall'utente.
    // Dopo il login lo reindiriziamo a quella pagina o altrimenti alla pagina Home
    useEffect(() => {
        if(utente) navigate(destinazione, {replace:true})
    }, [utente, navigate, destinazione])

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await login(email, password)
        setEmail('')
        setPassword('')
    }


  return (
    <div>
        <NavbarComponent />
        <h1>FormLogin</h1>

        {/* Mostrare da dove arriva l'utente prima di fare il login */}
        {destinazione !== '/dashboard' && (
            <Alert variant='secondary'>Pagina richiesta: {destinazione}. Accedi prima di continuare</Alert>
        )}

        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            {errore && <Alert variant='danger'> {errore}</Alert>}
            <Button 
                variant="primary" 
                type="submit"
                disabled={caricamento}>
                {caricamento ? 'Accesso...' : 'Login'}
            </Button>
        </Form>
    </div>
  )
}
