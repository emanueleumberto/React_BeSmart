
import { Button, Form } from "react-bootstrap"
import NavbarComponent from "../components/NavbarComponent"
import React, { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useLocation, useNavigate } from "react-router-dom"

export default function FormLogin() {

    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')

    const { login, utente } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const destinazione = (location.state as {da?: string})?.da ?? '/' 

    useEffect(() => {
        if(utente) navigate(destinazione, {replace: true})
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
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>
  )
}
