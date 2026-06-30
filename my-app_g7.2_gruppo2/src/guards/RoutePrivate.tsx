import { useAuth } from "../context/AuthContext"
import { Alert } from "react-bootstrap"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export default function RoutePrivate() {

    const { utente, caricamento } = useAuth()
    const location = useLocation()

    if(caricamento) return (
        <Alert variant='secondary'>Verifica autenicazione in corso...</Alert>
    )

    if(!utente)  {
        return <Navigate to="/login" state={{da: location.pathname}} replace />
    }

  return <Outlet />
}
