import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Alert } from "react-bootstrap"

export default function RoutePrivate() {

    const {utente, caricamento} = useAuth()
    const location = useLocation()

    if(caricamento) return (
        <Alert variant='light'>Verifica autenticazione in corso....</Alert>
    )

    if(!utente) {
        return <Navigate to="/login" state={{da : location.pathname}} replace />
    }

    return <Outlet />
  
}
