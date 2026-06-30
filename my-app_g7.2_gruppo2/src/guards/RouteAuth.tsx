import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

interface PropsRouteRole {
    ruoliConsentiti: string[],
    redirectAt?: string
}

export default function RouteAuth({ruoliConsentiti, redirectAt = '/not-auth'}: PropsRouteRole) {
  
    const {utente} = useAuth()

    const haPermesso = utente && ruoliConsentiti.includes(utente.ruolo)

    return haPermesso ? <Outlet /> : <Navigate to={redirectAt} replace />
}
